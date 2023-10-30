
const express = require('express')
const bodyParser = require('body-parser');
const { getById, updateDataFirebase, getAllData, deleteDocFirebase } = require('../app/service/service.app');
const { appFirestore } = require('../config/firebase.config');
const authRouter = express.Router();
const fs = require("fs");

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

authRouter.get('/user', bodyParser.json(), async(req, res, next) => {
    return res.status(201).json(req.user)
})

authRouter.post('/setting-pakan', bodyParser.json(), async(req, res, next) => {
    try{
        const update = await updateDataFirebase(appFirestore, req.body, "setting-pakan-ikan", req.body?.idDoc);
        if(update){
            return res.status(201).json({message: "Update Pakan Ikan Berhasil", code: 201})
        }
    }catch(err){
        next(err)
    }
});

authRouter.get('/delete/:id', bodyParser.json(), async(req, res, next) => {

    try{
        const deleted = await deleteDocFirebase(appFirestore, 'data-pkn-ikn', req.params.id);
        if(deleted){
            return res.status(201).json({message: "delete success", code: 201})
        }
        throw new Error('error request delete');

    }catch(error){
        next(error)
    }
})
authRouter.get('/get-setting', bodyParser.json(), async(req, res, next) => {
    try{
        const getByIdData  = await getById(appFirestore, "setting-pakan-ikan", "dsuCXNomWec657gKORFR");
        return res.status(201).json(getByIdData);
    }
    catch(error){
        next(error)
    }
})
authRouter.get('/data-pkn-all', bodyParser.json(), async(req, res, next) => {
    try{
        const data =  await getAllData(appFirestore, 'data-pkn-ikn');
        return res.status(201).json(data);    
    }catch(err){
        next(err)
    }
})

module.exports = { authRouter }