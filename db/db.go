package db

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
	Orders     []Order  `json:"User.orders,omitempty"`
	DType      []string `json:"dgraph.type,omitempty"`
}

type Order struct {
	Uid        string   `json:"uid,omitempty"`
	BoughtItem []Item   `json:"Order.boughtItem,omitempty"`
	DType      []string `json:"dgraph.type,omitempty"`
}
