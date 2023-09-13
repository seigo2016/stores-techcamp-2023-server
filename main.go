package main

import (
	"fmt"
	"net/http"
	"pos/db"

	"github.com/labstack/echo/v4"
)

type Server struct{}

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

func (h Server) GetUsers(ctx echo.Context, userId string) error {
	return ctx.JSON(http.StatusOK, User{})
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

	// i1, err := getItem("item1")
	// i2, err := getItem("item2")
	// u1, err := getUser("user1")
	// if err != nil {
	// 	fmt.Println(err)
	// }

	// buy(i1.Name, u1.Name)
	// buy(i2.Name, u1.Name)

	// var items []db.Item
	// items = append(items, i1, i2)
	// postOrder(items, u1)

	// getOrders("0x101")

	RegisterHandlers(e, s)
	e.Logger.Fatal(e.Start(":10081"))
}
