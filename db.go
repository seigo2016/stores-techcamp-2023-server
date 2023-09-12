package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"pos/db"

	"github.com/dgraph-io/dgo/v2"
	"github.com/dgraph-io/dgo/v2/protos/api"
	"google.golang.org/grpc"
)

func getUser(userId string) (db.User, error) {
	dc, cancel := getDgraphClient()
	defer cancel()

	ctx := context.Background()

	q1 := fmt.Sprintf(`
	{
		node(func: uid("%s")) {
		  uid
		  expand(_all_) {
			uid
			expand(_all_)
		  }
		}	
	  }
	`, userId)

	res, err := dc.NewTxn().Query(ctx, q1)
	if err != nil {
		fmt.Println(err)
	}
	var decodeu struct {
		Node []db.User `json:"node,omitempty"`
	}
	if err := json.Unmarshal(res.GetJson(), &decodeu); err != nil {
		fmt.Println(err)
		return db.User{}, err
	}
	fmt.Printf("%+v\n", decodeu.Node)

	user := decodeu.Node[0]

	return user, nil
}

func getItem(itemId string) (db.Item, error) {
	dc, cancel := getDgraphClient()
	defer cancel()

	ctx := context.Background()

	q2 := fmt.Sprintf(`
	{	node(func: uid("%s")) {
		uid
		expand(_all_) {
		  uid
		  expand(_all_)
		}
	  }
	}`, itemId)
	res, err := dc.NewTxn().Query(ctx, q2)
	if err != nil {
		fmt.Println(err)
	}
	var decodei struct {
		Node []db.Item `json:"node,omitempty"`
	}
	if err := json.Unmarshal(res.GetJson(), &decodei); err != nil {
		fmt.Println(err)
		return db.Item{}, err
	}
	fmt.Printf("%+v\n", decodei.Node)

	item := decodei.Node[0]

	return item, nil
}

func postOrder(items []db.Item, user db.User) db.Order {
	dc, cancel := getDgraphClient()
	defer cancel()

	ctx := context.Background()

	no := db.Order{
		Uid:        "_:",
		BoughtItem: items,
		DType:      []string{"Order"},
	}

	mu := &api.Mutation{
		CommitNow: true,
	}

	pb, err := json.Marshal(no)
	if err != nil {
		log.Fatal(err)
	}

	mu.SetJson = pb
	response, err := dc.NewTxn().Mutate(ctx, mu)
	if err != nil {
		log.Fatal(err)
	}
	newOrders := append(user.Orders, no)

	nu := db.User{
		Uid:        user.Uid,
		Name:       user.Name,
		BoughtItem: user.BoughtItem,
		Orders:     newOrders,
	}

	mu = &api.Mutation{
		CommitNow: true,
	}

	pb, err = json.Marshal(nu)
	if err != nil {
		log.Fatal(err)
	}

	mu.SetJson = pb
	response, err = dc.NewTxn().Mutate(ctx, mu)
	if err != nil {
		log.Fatal(err)
	}

	log.Println(response)

	return no
}

func buy(itemId string, userId string) {
	dc, cancel := getDgraphClient()
	defer cancel()

	ctx := context.Background()

	un, err := getUser(userId)
	if err != nil {
		fmt.Println(err)
	}

	in, err := getItem(itemId)
	if err != nil {
		fmt.Println(err)
	}

	var im []db.Item
	im = append(im, in)
	nun := db.User{
		Uid:        un.Uid,
		Name:       un.Name,
		BoughtItem: im,
		DType:      un.DType,
	}

	mu := &api.Mutation{
		CommitNow: true,
	}

	pb, err := json.Marshal(nun)
	if err != nil {
		log.Fatal(err)
	}
	mu.SetJson = pb
	response, err := dc.NewTxn().Mutate(ctx, mu)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(response)
}

func getDgraphClient() (*dgo.Dgraph, db.CancelFunc) {
	conn, err := grpc.Dial("localhost:9080", grpc.WithInsecure())
	if err != nil {
		log.Fatal(err)
	}

	dc := dgo.NewDgraphClient(api.NewDgraphClient(conn))

	return dc, func() {
		if err := conn.Close(); err != nil {
			log.Printf("Error while closing connection:%v", err)
		}
	}
}

func getOrder(uid string) (db.Order, error) {
	dc, cancel := getDgraphClient()
	defer cancel()

	ctx := context.Background()
	fmt.Println(uid)
	q2 := fmt.Sprintf(`
	{	node(func: uid(%s)) {
		uid
		expand(_all_){expand(_all_)}
	  }
	}`, uid)
	res, err := dc.NewTxn().Query(ctx, q2)
	if err != nil {
		fmt.Println(err)
	}
	var decodeo struct {
		Node []db.Order `json:"node,omitempty"`
	}
	fmt.Println(res.GetJson())
	if err := json.Unmarshal(res.GetJson(), &decodeo); err != nil {
		fmt.Println(err)
		return db.Order{}, err
	}
	order := decodeo.Node[0]

	return order, nil
}

func getOrders(userId string) ([]db.Order, error) {
	u, _ := getUser(userId)

	o := u.Orders
	var orders []db.Order
	for _, t := range o {
		o1, _ := getOrder(t.Uid)
		orders = append(orders, o1)
	}
	return orders, nil
}
