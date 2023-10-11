
const express = require('express')
const router  = require('./src/router/router')
const app     = express()

app.use(express.json())
app.use('/api', router)

app.listen(4500, () => {
    console.log('server run in http://localhost:4500')
})