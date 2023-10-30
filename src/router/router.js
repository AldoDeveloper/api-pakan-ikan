
const express = require('express')
const router = express.Router()

const { appFirestore } = require('../config/firebase.config')
const { login, register, setData, getById } = require('../app/service/service.app')
const bodyParser = require('body-parser')
const { errorHandlerApi } = require('../app/error/error.handler')
const { protectedAuthJwt } = require('../app/middleware/auth.login')
const { authRouter } = require('./auth')
const { routeApp } = require('./route-pakan')

router.use(errorHandlerApi)

router.get('/test', (req, res, next) => {
   return res.json({ name: "aldo ratmawan" })
});

router.post('/login', bodyParser.json(), async (req, res, next) => {
   try {
      const bodyLogin = {
         email: req.body?.username,
         password: req.body?.password
      }
      const tokenJwt = await login(appFirestore, bodyLogin)
      return res.status(201).json(tokenJwt);

   } catch (err) {
      next(err)
   }
})

router.get('/set-status-pkn/:payload', bodyParser.json(), async (req, res, next) => {
   try {
      switch (req.params.payload) {
         case 'start':
            const bodys = {
               created_at: Date.now().toString(),
               device: req.query?.device,
               message: req.query?.message,
               status: true
            }
            if (await setData(appFirestore, bodys, 'data-pkn-ikn')) {
               return res.status(201).json({ message: "Ok" });
            }
            return res.status(400).json({ message: "error request pakan awal" });
         case 'end':
            const body = {
               created_at: Date.now().toString(),
               device: req.query?.device,
               message: req.query?.message,
               status: true
            }
            if (await setData(appFirestore, body, 'data-pkn-ikn')) {
               return res.status(201).json({ message: "Ok" });
            }
            return res.status(400).json({ message: "error request pakan awal" });

         default:
            throw new Error('request error bro..')
      }
   } catch (err) {
      next(err)
   }
})

router.get('/get-setting-pkn', bodyParser.json(), async (req, res, next) => {
   try {
      const getByIdData = await getById(appFirestore, "setting-pakan-ikan", "dsuCXNomWec657gKORFR");
      return res.status(201).json(getByIdData);
   }
   catch (error) {
      next(error)
   }
})
router.post('/register', bodyParser.json(), async (req, res, next) => {
   try {
      if (req.body?.password !== req.body?.confirm_password) {
         return res.status(400).json({
            payload: "register error",
            message: "Password dan Konfirmasi password tidak sesuai",
            code: 404,
            error: true
         })
      }

      const dataBody = {
         email: req.body?.username,
         password: req.body?.password,
         full_name: req.body?.full_name
      }

      const registerUser = await register(appFirestore, dataBody)
      if (registerUser) {
         return res.status(201).json({
            payload: "create success",
            message: "Register Account Berhasil...",
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