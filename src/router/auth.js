
const express = require('express')
const bodyParser = require('body-parser');
const { getById } = require('../app/service/service.app');
const { appFirestore } = require('../config/firebase.config');
const authRouter = express.Router();

authRouter.get('/data/:id', bodyParser.json(), async (req, res, next) => {
    try{
        const getDataById = await getById(appFirestore, req.params.id)
        return res.json(getDataById)
    }catch(err){
        return res.status(400).json({
            error: true,
            message: 'id not found'
        })
    }
})

module.exports = { authRouter }