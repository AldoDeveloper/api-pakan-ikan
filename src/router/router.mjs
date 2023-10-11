
import express from "express";

const router = express.Router()

router.get('/', async (req, res, next) => {
   return res.status(200).json({
        name: "Aldo Ratmawan"
    })
})

export default router