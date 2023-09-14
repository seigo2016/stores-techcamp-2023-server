import requests


def mutation():
    bodies = []
    bodies.append("""
        mutation {
  item: addItem(input: [
    { xid: "sample1" name:"キリッとBLACK ブラックコーヒー（無糖）235ml" price: 248 preview: "https://sarutahiko.jp/cdn/shop/products/641d07a182919f421274c08f555cbb0e.jpg?v=1677639512" }
    { xid: "sample2" name:"職人のカフェラテ（甘くない）235ml" price: 270 preview: "https://sarutahiko.jp/cdn/shop/products/ee80406ce792f4332098e3c960873e24.jpg?v=1677639185" }
    { xid: "sample3" name: "無糖/リキッドアイスコーヒー(瓶) 600ml" price: 972 preview: "https://sarutahiko.jp/cdn/shop/files/ada02dffe8beee60fdb185acef5cf00f.jpg?v=1694488768&width=1206" }
    { xid: "sample4" name: "無糖/リキッドアイスコーヒー（大吉ブレンド）" price: 980 preview: "https://sarutahiko.jp/cdn/shop/files/72cfd54c8b5c9252e1465ea5fbc33b47.jpg?v=1682392413&width=1206" }
    { xid: "sample5" name: "オキーニョ" price: 825 preview: "https://sarutahiko.jp/cdn/shop/products/4257d69fd793772bb43abed4514a2a17.jpg?v=1677575294&width=1206" }
    { xid: "sample6" name: "バゲット" price: 308 preview: "https://sarutahiko.jp/cdn/shop/products/b2cd87424f8277e58f12a77ec166ba4a.jpg?v=1677575483&width=1206" }
    { xid: "sample7" name: "コールドブリュー珈琲ゼリー" price: 388 preview: "https://sarutahiko.jp/cdn/shop/files/bdab1acaa21dadc45ef5aae445dbe662.jpg?v=1686909393&width=1206" }
    { xid: "sample8" name: "アーモンドフロランタン" price: 578 preview: "https://sarutahiko.jp/cdn/shop/products/6b837e5fd7869813909c2b4c8c3cd02f.jpg?v=1677462786&width=1206" }     
  ]) { numUids }
}
        """)
    bodies.append("""
          mutation {
            item: addUser(input: [
              { xid: "user1" name: "user1" }
              { xid: "user2" name: "user2" }
              { xid: "user3" name: "user3" }
            ]) { numUids }
          }
        """)
    
    bodies.append("""
      mutation {
        item: updateUser(input: {
        filter: { xid: { eq: "user1" } }
        set: { boughtItems: [
          { xid: "sample1" }
          { xid: "sample2" }
          { xid: "sample3" }
        ] }
      }) { numUids }}
    """)

        
    bodies.append("""
      mutation {
        item: updateUser(input: {
        filter: { xid: { eq: "user2" } }
        set: { boughtItems: [
          { xid: "sample1" }
          { xid: "sample3" }
          { xid: "sample6" }
        ] }
      }) { numUids }}
    """)

    bodies.append("""
      mutation {
        item: updateUser(input: {
        filter: { xid: { eq: "user3" } }
        set: { boughtItems: [
          { xid: "sample1" }
          { xid: "sample2" }
          { xid: "sample3" }
          { xid: "sample4" }
        ] }
      }) { numUids }}
    """)

    bodies.append("""
      mutation {
        item: updateItem(input: {
        filter: { xid: { eq: "sample1" } }
        set: { users: [
          { xid: "user1"}
          { xid: "user2" }
          { xid: "user3" }
        ] }
      }) { numUids }}
    """)

    bodies.append("""
      mutation {
        item: updateItem(input: {
        filter: { xid: { eq: "sample2" } }
        set: { users: [
          { xid: "user1"}
          { xid: "user3" }
        ] }
      }) { numUids }}
    """)
  
    bodies.append("""
      mutation {
        item: updateItem(input: {
        filter: { xid: { eq: "sample3" } }
        set: { users: [
          { xid: "user1" }
          { xid: "user2" }
          { xid: "user3" }
        ] }
      }) { numUids }}
    """)

    bodies.append("""
      mutation {
        item: updateItem(input: {
        filter: { xid: { eq: "sample4" } }
        set: { users: [
          { xid: "user3" }
        ] }
      }) { numUids }}
    """)

    bodies.append("""
      mutation {
        item: updateItem(input: {
        filter: { xid: { eq: "sample6" } }
        set: { users: [
          { xid: "user2" }
        ] }
      }) { numUids }}
    """)

    for b in bodies:
      res = requests.post("http://localhost:8080/graphql", json={
          'query' : b
      })

    print(res.status_code)
    print(res.content)

mutation()