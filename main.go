package main

import (
	"fmt"
	"net/http"
	"reflect"

	"github.com/seigo2016/pos-server/db"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Server struct{}

func (h Server) GetUserRecommends(ctx echo.Context, userId string) error {
	items, _ := recommend(userId)
	var it []ResponseItem
	for _, i := range items {
		it = append(it, ResponseItem{
			Id:      &i.Uid,
			Name:    &i.Name,
			Price:   &i.Price,
			Preview: &i.Preview,
		})
	}
	return ctx.JSON(http.StatusOK, it)
}

func covif(i db.Item) ResponseItem {

	return ResponseItem{
		Id:      &i.Uid,
		Name:    &i.Name,
		Price:   &i.Price,
		Preview: &i.Preview,
	}
}

func (h Server) GetItems(ctx echo.Context) error {
	items, _ := getAllItems()
	it := make([]ResponseItem, 0)
	for _, i := range items {
		ni := covif(i)
		it = append(it, ni)
	}
	return ctx.JSON(http.StatusOK, it)
}

func (h Server) GetAllUsers(ctx echo.Context) error {
	return ctx.JSON(http.StatusOK, []User{})
}

func (h Server) GetUserById(ctx echo.Context, userId string) error {
	u, _ := getUser(userId)
	return ctx.JSON(http.StatusOK, u)
}

func (h Server) PostOrders(ctx echo.Context) error {
	order := &RequestOrder{}
	fmt.Println(ctx.Bind(&order))
	var it []db.Item
	for _, i := range *order.Items {
		ni, _ := getItem(*i.Id)
		ni.Quantity = *i.Quantity
		it = append(it, ni)
	}
	fmt.Println(it)
	var user = db.User{}
	fmt.Println(order.UserId)
	if !reflect.DeepEqual(order.UserId, "") {
		user, _ = getUser(*order.UserId)
	}
	fmt.Println(user)
	o := postOrder(it, user)
	return ctx.JSON(http.StatusOK, o)
}

func (h Server) GetOrders(ctx echo.Context, userId string) error {
	orders, _ := getOrders(userId)
	var reso []ResponseOrder

	fmt.Println(orders)
	for _, i := range orders {
		var ri []ResponseItem
		for _, i := range i.BoughtItems {
			ri = append(ri, ResponseItem{
				Id:       &i.Uid,
				Name:     &i.Name,
				Quantity: &i.Quantity,
			})
		}
		reso = append(reso, ResponseOrder{
			CreatedAt: &i.CreatedAt,
			OrderId:   &i.Uid,
			Items:     &ri,
			UserId:    &userId,
		})
	}
	return ctx.JSON(http.StatusOK, reso)
}

func main() {
	e := echo.New()
	s := Server{}
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"*"},
		AllowCredentials: true,
	}))
	u1, _ := getUserByName("Gopher")
	u2, _ := getUserByName("Tux")
	u3, _ := getUserByName("Moby Dock")
	fmt.Println(u1.Uid)
	fmt.Println(u2.Uid)
	fmt.Println(u3.Uid)
	RegisterHandlers(e, s)
	e.Logger.Fatal(e.Start(":80"))
}
