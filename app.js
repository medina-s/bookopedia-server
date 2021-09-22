require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

;(async() => {

  app.use(require('./middleware/headers'))

  app.use(express.json())

  const index = require('./controllers/Index')
  app.use("/", index)

  const auth = require('./controllers/Auth')
  app.use("/auth", auth)

  const review = require('./controllers/Review')
  app.use('/review', review)

  const readinglist = require('./controllers/ReadingList')
  app.use('/readinglist', readinglist)

  app.listen(port, () => {
    console.log(`Bookopedia App Listening at http://localhost:${port}`)
  })
})()
