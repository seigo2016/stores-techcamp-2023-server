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

func getUser(userName string) (db.User, error) {
	dc, cancel := getDgraphClient()
	defer cancel()

	ctx := context.Background()

	q1 := fmt.Sprintf(`
	{
		node(func: eq(User.name, "%s")) {
		  uid
		  expand(_all_) {
			uid
			expand(_all_)
		  }
		}	
	  }
	`, userName)

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

func getItem(itemName string) (db.Item, error) {
	dc, cancel := getDgraphClient()
	defer cancel()

	ctx := context.Background()

	q2 := fmt.Sprintf(`
	{	node(func: eq(Item.name, "%s")) {
		uid
		expand(_all_) {
		  uid
		  expand(_all_)
		}
	  }
	}`, itemName)
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
		User:       user,
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
	log.Println(response)

	return no
}

func buy(itemName string, userName string) {
	dc, cancel := getDgraphClient()
	defer cancel()

	ctx := context.Background()

	un, err := getUser(userName)
	if err != nil {
		fmt.Println(err)
	}

	in, err := getItem(itemName)
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

func getOrders()
