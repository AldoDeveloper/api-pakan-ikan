
const express = require('express')
const router  = express.Router()

const { appFirebase, appFirestore } = require('../config/firebase.config')
const { getAllData }  = require('../app/service/service.app')

router.get('/', async (req, res, next) => {
   const data = await getAllData(appFirestore, 'data')
   return res.status(200).json(data)
})

module.exports = router;