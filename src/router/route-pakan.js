const express = require('express');

const routeApp = express.Router();
const { appFirestore } = require('../config/firebase.config');
const { getAllData, setData } = require('../app/service/service.app');

routeApp.route('/pkn-data')
        .get(async(req, res, next) => {
            const data = await getAllData(appFirestore, 'pakan-ikan');
            return res.status(201).json(data)
        })
        .post(async(req, res, next) => {
            const dateNow = new Date();
            const dataBody = {
                ...req.body,
                created_at: `${dateNow.toUTCString()}`
            }
            const setDatePakan = await setData(appFirestore, dataBody, 'pakan-ikan');

            if(setDatePakan){
                return res.status(201).json({
                    ...dataBody,
                    message: "set data success",
                    code: 201
                })
            }
            return res.status(400).json({
                code: 400,
                message: "set data failure please try again..."
            })
        })

module.exports = {
    routeApp
}