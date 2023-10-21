
const express = require('express')
const router  = require('./src/router/router')
const { errorHandlerApi } = require('./src/app/error/error.handler')
const app     = express()

app.use(express.json())

app.use('/', (req, res, next) => {
    return res.status(200).json({message: "Maintenance Service"})
})
app.use('/api', router)

app.use(errorHandlerApi)
app.listen(4500, () => {
    console.log('server run in http://localhost:4500')
})
