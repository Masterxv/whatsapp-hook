routerAdd("GET", "/hello/:name", (c) => {
  let name = c.pathParam("name")

  return c.json(200, { "message": "Hello hi2" + name })
})


routerAdd("GET", "/", (c) => {
  return c.json(200, { "message": "OK" })
})
