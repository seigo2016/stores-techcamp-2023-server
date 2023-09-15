package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"github.com/seigo2016/pos/db"
	"reflect"
	"time"

	"github.com/dgraph-io/dgo/v2"
	"github.com/dgraph-io/dgo/v2/protos/api"
	"google.golang.org/grpc"
)

func getDiff(a, b []db.Item) []db.Item {
	mb := make(map[string]struct{}, len(b))

	for _, x := range b {
		mb[x.Uid] = struct{}{}
	}

	var diff []db.Item
	for _, x := range a {
		if _, found := mb[x.Uid]; !found {
			diff = append(diff, x)
		}
	}
	return diff
}

func unique(sample []db.User) []db.User {
	var unique []db.User
uloop:
	for _, v := range sample {
		for i, u := range unique {
			if v.Name == u.Name {
				unique[i] = v
				continue uloop
			}
		}
		unique = append(unique, v)
	}
	return unique
}

func removeUser(s []db.User, deleteTarget db.User) []db.User {
	result := []db.User{}
	for i, v := range s {
		if v.Name == deleteTarget.Name {
			result = append(s[:i], s[min(i+1, len(s)-1):]...)
			return result
		}
	}
	return result
}

func recommend(uid string) ([]db.Item, error) {
	dc, cancel := getDgraphClient()
	defer cancel()

	ctx := context.Background()

	orgUser, _ := getUser(uid)

	q1 := fmt.Sprintf(`
	{
		node(func: uid("%s")) {
		  uid
		  expand(_all_) {
			uid
			expand(_all_){expand(_all_)}
		  }
		}
	  }
	`, uid)

	res, err := dc.NewTxn().Query(ctx, q1)
	if err != nil {
		fmt.Println(err)
	}
	var decodeu struct {
		Node []db.User `json:"node,omitempty"`
	}
	if err := json.Unmarshal(res.GetJson(), &decodeu); err != nil {
		return []db.Item{}, err
	}
	orgItems := decodeu.Node[0].BoughtItems
	var users []db.User

	for _, i := range orgItems {
		users = append(users, i.Users...)
	}
	users = removeUser(unique(users), orgUser)
	simCnt := -1
	var recI []db.Item
	for _, u := range users {
		u, _ = getUserByName(u.Name)
		eq := getDiff(u.BoughtItems, orgItems)
		cnt := len(eq)
		if simCnt < cnt {
			simCnt = cnt
			recI = eq
		}
	}
	fmt.Println(recI)
	return recI, nil

}

func getAllItems() ([]db.Item, error) {
	dc, cancel := getDgraphClient()
	defer cancel()

	ctx := context.Background()

	res, err := dc.NewTxn().Query(ctx, `
	{
		node(func: has(Item.name)) {
		  uid
		  expand(_all_) {
			uid
			expand(_all_)
		  }
		}	
	  }
	`)
	if err != nil {
		fmt.Println(err)
	}
	var decodei struct {
		Node []db.Item `json:"node,omitempty"`
	}
	if err := json.Unmarshal(res.GetJson(), &decodei); err != nil {
		fmt.Println(err)
		return []db.Item{}, err
	}

	item := decodei.Node

	return item, nil
}

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
	user := decodeu.Node[0]

	return user, nil
}

func getUserByName(userName string) (db.User, error) {
	dc, cancel := getDgraphClient()
	defer cancel()

	ctx := context.Background()

	q1 := fmt.Sprintf(`{
		node(func: eq(User.name, "%s")) {
		  uid
		  expand(_all_) {
			uid
			expand(_all_)
		  }
		}	
	  }`, userName)

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

	item := decodei.Node[0]

	return item, nil
}

func postOrder(items []db.Item, user db.User) db.Order {
	dc, cancel := getDgraphClient()
	defer cancel()

	ctx := context.Background()
	now := time.Now()
	no := db.Order{
		Uid:         "_:",
		BoughtItems: items,
		CreatedAt:   now.Format("2006-01-02T15:04:05"),
		DType:       []string{"Order"},
	}
	mu := &api.Mutation{
		CommitNow: true,
	}

	pb, err := json.Marshal(no)
	if err != nil {
		log.Fatal(err)
	}

	mu.SetJson = pb
	_, err = dc.NewTxn().Mutate(ctx, mu)
	if err != nil {
		log.Fatal(err)
	}
	if reflect.DeepEqual(user, db.User{}) {
		fmt.Println("no user")
		return no
	}
	newOrders := append(user.Orders, no)
	newItems := append(user.BoughtItems, items...)
	nu := db.User{
		Uid:         user.Uid,
		Name:        user.Name,
		BoughtItems: newItems,
		Orders:      newOrders,
	}

	mu = &api.Mutation{
		CommitNow: true,
	}

	pb, err = json.Marshal(nu)
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
		Uid:         un.Uid,
		Name:        un.Name,
		BoughtItems: im,
		DType:       un.DType,
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
