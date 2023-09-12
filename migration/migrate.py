import requests


def mutation():
    body = """
        mutation {
  item: addItem(input: [
    { name: "item1" , shop: "shop1" price: 500}
    { name: "item2" , shop: "shop1" price: 500}
    { name: "item3" , shop: "shop1" price: 500}
    { name: "item4" , shop: "shop1" price: 500}
    { name: "item5" , shop: "shop1" price: 500}
    { name: "item6" , shop: "shop1" price: 500}
    { name: "item7" , shop: "shop1" price: 500}
    { name: "item8" , shop: "shop1" price: 500}
  ]) { numUids }
}
        """
    body2 = """
          mutation {
            item: addUser(input: [
              { name: "user1" }
              { name: "user2" }
              { name: "user3" }
            ]) { numUids }
          }
        """

    res = requests.post("http://localhost:8080/graphql", json={
        'query' : body
    })

    print(res.status_code)
    print(res.content)

    res = requests.post("http://localhost:8080/graphql", json={
        'query' : body2
    })

    print(res.status_code)
    print(res.content)

mutation()