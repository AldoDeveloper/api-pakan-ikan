
const express = require('express')
const router  = express.Router()

const { appFirestore } = require('../config/firebase.config')
const { login, register } = require('../app/service/service.app')
const bodyParser = require('body-parser')
const { errorHandlerApi }  = require('../app/error/error.handler')
const { v4 }     = require('uuid')
const { protectedAuthJwt } = require('../app/middleware/auth.login')
const { authRouter } = require('./auth')
const { routeApp } = require('./route-pakan')

router.use(errorHandlerApi)

router.get('/test', (req, res, next) => {
   return res.json({name: "aldo ratmawan"})
});

router.post('/login', bodyParser.json(), async (req, res, next) => {
   try {
      const tokenJwt = await login(appFirestore, req.body)
      return res.status(201).json(tokenJwt)
   } catch (err) {
      next(err)
   }
})

router.post('/register', bodyParser.json(), async (req, res, next) => {
   try {
      const registerUser = await register(appFirestore, req.body)
      if (registerUser) {
         return res.status(201).json({
            message: "create success",
            code: 201,
            data: {
               ...req.body
            }
         })
      }
   } catch (err) {
      next(err)
   }
})

router.use('/protected', bodyParser.json(), protectedAuthJwt, authRouter)
router.use('/pkn', bodyParser.json(), routeApp)

module.exports = router;