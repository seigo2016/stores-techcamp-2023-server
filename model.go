package main

type CancelFunc func()

type Item struct {
	Uid   string   `json:"uid,omitempty"`
	Name  string   `json:"Item.name,omitempty"`
	Price int      `json:"Item.price,omitempty"`
	Shop  string   `json:"Item.shop,omitempty"`
	DType []string `json:"dgraph.type,omitempty"`
}

type User struct {
	Uid        string   `json:"uid,omitempty"`
	Name       string   `json:"User.name,omitempty"`
	BoughtItem []Item   `json:"User.boughtItem,omitempty"`
	DType      []string `json:"dgraph.type,omitempty"`
}
