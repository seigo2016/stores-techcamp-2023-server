import requests


def mutation():
    body = """
        mutation {
  item: addItem(input: [
    { xid: "sample1" name:"キリッとBLACK ブラックコーヒー（無糖）235ml" price:248 preview:"https://sarutahiko.jp/cdn/shop/products/641d07a182919f421274c08f555cbb0e.jpg?v=1677639512"}
    { xid: "sample2" name:"職人のカフェラテ（甘くない）235ml" price:270 preivew:"https://sarutahiko.jp/cdn/shop/products/ee80406ce792f4332098e3c960873e24.jpg?v=1677639185"}
    { xid: "item1" name: "item1"  price: 500}
    { xid: "item2" name: "item2"  price: 500}
    { xid: "item3" name: "item3"  price: 500}
    { xid: "item4" name: "item4"  price: 500}
    { xid: "item5" name: "item5"  price: 500}
  ]) { numUids }
}
        """
    body2 = """
          mutation {
            item: addUser(input: [
              { xid: "user1" name: "user1" }
              { xid: "user2" name: "user2" }
              { xid: "user3" name: "user3" }
            ]) { numUids }
          }
        """
    
    body3 = """
      mutation {
        item: updateUser(input: {
        filter: { xid: { eq: "user1" } }
        set: { boughtItems: [
          { xid: "item1" }
          { xid: "item2" }
          { xid: "item3" }
          { xid: "item5" }
        ] }
      }) { numUids }}
    """

        
    body4 = """
      mutation {
        item: updateUser(input: {
        filter: { xid: { eq: "user2" } }
        set: { boughtItems: [
          { xid: "item1" }
          { xid: "item3" }
        ] }
      }) { numUids }}
    """

    body5 = """
      mutation {
        item: updateUser(input: {
        filter: { xid: { eq: "user3" } }
        set: { boughtItems: [
          { xid: "item1" }
          { xid: "item2" }
          { xid: "item3" }
          { xid: "item4" }
        ] }
      }) { numUids }}
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

    res = requests.post("http://localhost:8080/graphql", json={
        'query' : body3
    })

    print(res.status_code)
    print(res.content)
    
    res = requests.post("http://localhost:8080/graphql", json={
        'query' : body4
    })

    print(res.status_code)
    print(res.content)

    res = requests.post("http://localhost:8080/graphql", json={
        'query' : body5
    })

    print(res.status_code)
    print(res.content)

mutation()