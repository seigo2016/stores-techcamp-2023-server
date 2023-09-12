package main

import (
	"fmt"
	"net/http"
	"pos/db"

	"github.com/labstack/echo/v4"
)

type Server struct{}

func (h Server) GetItems(ctx echo.Context, itemId string) error {
	return ctx.JSON(http.StatusOK, Item{})
}

func main() {
	// e := echo.New()
	// s := Server{}

	i1, err := getItem("item1")
	i2, err := getItem("item2")
	u1, err := getUser("user1")
	if err != nil {
		fmt.Println(err)
	}

	buy(i1.Name, u1.Name)
	buy(i2.Name, u1.Name)

	var items []db.Item
	items = append(items, i1, i2)
	postOrder(items, u1)

	// RegisterHandlers(e, s)
	// e.Logger.Fatal(e.Start(":10080"))
}
