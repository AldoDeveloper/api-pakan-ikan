
const express = require('express')
const router  = require('./src/router/router')
const { errorHandlerApi } = require('./src/app/error/error.handler')
const app     = express()
const cors    = require('cors')


app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
}))

app.use(express.json())

app.use('/api', router)

app.use(errorHandlerApi)
app.listen(4500, () => {
    console.log('server run in http://localhost:4500')
})
