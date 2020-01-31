const express = require('express')
require('./db/mongoose')
const blogRouter = require('./routers/blog')
const userRouter = require('./routers/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(blogRouter)

app.listen(port, () => {
    console.log("connection is up on port " + port)
})




