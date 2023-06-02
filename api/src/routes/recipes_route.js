const router = require('express').Router()
const {Router} =require ('express')
const {reci, postRecipe, searchIdRecipe} = require('../../controllers/controllers')
const {Recipes, Diets} =require('../db')

const recipesRoute = Router()

recipesRoute.get("/id", async (req, res)=>{
    const {id} =req.params

    try{
        const Idrecipe = await searchIdRecipe(id)
        res.status(200).json(Idrecipe)
    }catch(error){
        res.status(400).json(error)
    }
});

recipesRoute.get('/', async (req, res)=>{
    const { name }= req.query
    try{
        if(name){
            const show = await reci(name)
            res.status(200).json(show)
        }else{
            const all = await reci()
            res.status(200).json(all)
        }
    }catch (error){
        res.status(400).send(error)
    }
});

recipesRoute.post('/', async(req, res)=>{
    try {
        const objRecipe = req.body;
        const newRecipe = await postRecipe(objRecipe)
        res.status(201).send(newRecipe)
    } catch (error) {
        res.status(404).send(error)
    }
})

recipesRoute.put('/:id', async(req, res)=>{
    const { id } = req.params;
    const {name, summary, steps, healthScore, diets, image} = req.body
    try {
        const recipe = await Recipes.findByPk(id)
        if(!recipe){
            return res.status(404).json({error: 'recipe not found'})
        }

        await Recipes.update(
            {
                name: name,
                summary: summary,
                image:image,
                steps: steps,
                healthScore: healthScore
            },
            {
                where:{
                    id:id,
                }
            }
        )
        if(diets.length){
            await recipe.setDiets([])
            diets.forEach (async (e)=>{
                const diet = await Diets.findOne({
                    where:{
                        name: e,
                    }
                })
                if(diet){
                    await recipe.addDiet(diet)
                }
            })
        }
        const updateRecipe = await Recipes.findByPk(id,{
            include:[{model: Diets}]
        })
        return res.status(200).json(updateRecipe)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})
module.exports = recipesRoute