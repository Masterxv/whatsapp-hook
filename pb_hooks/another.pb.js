routerAdd("GET", "/hello2/:name", (c) => {
  let name = c.pathParam("name")

  return c.json(200, { "message": "no " + name })
})