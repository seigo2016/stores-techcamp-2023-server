package db

type CancelFunc func()

type Item struct {
	Uid     string   `json:"uid,omitempty"`
	Name    string   `json:"Item.name,omitempty"`
	Price   int      `json:"Item.price,omitempty"`
	Preview string   `json:"Item.preview,omitempty"`
	Users   []User   `json:"Item.users,omitempty"`
	DType   []string `json:"dgraph.type,omitempty"`
}

type User struct {
	Uid         string   `json:"uid,omitempty"`
	Name        string   `json:"User.name,omitempty"`
	BoughtItems []Item   `json:"User.boughtItems,omitempty"`
	Orders      []Order  `json:"User.orders,omitempty"`
	DType       []string `json:"dgraph.type,omitempty"`
}

type Order struct {
	Uid         string   `json:"uid,omitempty"`
	BoughtItems []Item   `json:"Order.boughtItems,omitempty"`
	DType       []string `json:"dgraph.type,omitempty"`
}
