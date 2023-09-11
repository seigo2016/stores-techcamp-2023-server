package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/dgraph-io/dgo/v200"
	"github.com/dgraph-io/dgo/v200/protos/api"
	"google.golang.org/grpc"
)

func buy(itemName string, userName string) {
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
	res, err := dc.NewTxn().QueryRDF(ctx, q1)
	if err != nil {
		fmt.Println(err)
	}
	var decodeu struct {
		Node []User `json:"node,omitempty"`
	}
	if err := json.Unmarshal(res.GetJson(), &decodeu); err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("%+v\n", decodeu.Node)

	un := decodeu.Node[0]

	q2 := fmt.Sprintf(`
	{
		node(func: eq(Item.name, "%s")) {
		  uid
		  expand(_all_) {
			uid
			expand(_all_)
		  }
		}	
	  }
	`, itemName)
	res, err = dc.NewTxn().QueryRDF(ctx, q2)
	if err != nil {
		fmt.Println(err)
	}
	var decodei struct {
		Node []Item `json:"node,omitempty"`
	}
	if err := json.Unmarshal(res.GetJson(), &decodei); err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("%+v\n", decodei.Node)

	in := decodei.Node

	nun := User{
		Uid:        un.Uid,
		Name:       un.Name,
		BoughtItem: in,
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

func main() {
	buy("user1", "item1")
}

func getDgraphClient() (*dgo.Dgraph, CancelFunc) {
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
