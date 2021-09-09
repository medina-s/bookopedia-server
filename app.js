require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

;(async() => {
  app.use(express.json())

  const index = require('./controllers/Index')
  app.use("/", index)

  const auth = require('./controllers/Auth')
  app.use("/auth", auth)

  const post = require('./controllers/Post')
  app.use('/post', post)

  app.listen(port, () => {
    console.log(`Bookopedia App Listening at http://localhost:${port}`)
  })
})()
