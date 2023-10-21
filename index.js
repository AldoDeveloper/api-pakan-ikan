
const express = require('express')
const router  = require('./src/router/router')
const { errorHandlerApi } = require('./src/app/error/error.handler')
const app     = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use('/api',(req, res, next) => {
    console.warn(req.url)
    next()
}, router) 

app.use(errorHandlerApi)
app.listen(4500, () => {
    console.log('server run in http://localhost:4500')
})