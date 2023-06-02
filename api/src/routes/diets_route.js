const Router = require('express');

const {putDietInfo} = require('../../controllers/controllers.js')

const dietsRoute =Router()

dietsRoute.get('/', async(req, res)=>{
    try {
        const allDiets = await putDietInfo()
        res.status(200).send(allDiets)
    } catch (error) {
        req.status(400).send(error)
    }
})

module.exports= dietsRoute