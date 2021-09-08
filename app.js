require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

;(async() => {
  app.use(express.json())

  const auth = require('./controllers/Auth')
  app.use("/auth", auth)

  const post = require('./controllers/Post')
  app.use('/post', post)

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})()
