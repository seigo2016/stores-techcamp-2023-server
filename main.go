package main

import (
	"fmt"
	"net/http"
	"pos/db"

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

func (h Server) GetItems(ctx echo.Context) error {
	items, _ := getAllItems()
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

func (h Server) GetAllUsers(ctx echo.Context) error {
	return ctx.JSON(http.StatusOK, []User{})
}

func (h Server) GetUserById(ctx echo.Context, userId string) error {
	u, _ := getUser(userId)
	return ctx.JSON(http.StatusOK, u)
}

func (h Server) PostOrders(ctx echo.Context) error {
	order := &RequestOrder{}
	ctx.Bind(&order)
	fmt.Println(order)
	var it []db.Item
	for _, i := range *order.Items {
		ni, _ := getItem(*i.Id)
		it = append(it, ni)
	}
	user, _ := getUser(*order.UserId)
	o := postOrder(it, user)
	return ctx.JSON(http.StatusOK, o)
}

func (h Server) GetOrders(ctx echo.Context, userId string) error {
	orders, _ := getOrders(userId)
	var reso []ResponseOrder
	for _, i := range orders {
		var ri []ResponseItem
		for _, i := range i.BoughtItems {
			ri = append(ri, ResponseItem{
				Id:   &i.Uid,
				Name: &i.Name,
			})
		}
		reso = append(reso, ResponseOrder{
			OrderId: &i.Uid,
			Items:   &ri,
			UserId:  &userId,
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
	u1, _ := getUserByName("user1")
	u2, _ := getUserByName("user2")
	u3, _ := getUserByName("user3")
	fmt.Println(u1.Uid)
	fmt.Println(u2.Uid)
	fmt.Println(u3.Uid)
	RegisterHandlers(e, s)
	e.Logger.Fatal(e.Start(":10082"))
}
