const axios = require('axios');
const {Recipes, Diets} = require('../src/db')
const { API_KEY } = process.env;



const SearchInApi =async ()=>{

    try{
        const BuscarenApi = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5')

        let info= await BuscarenApi.data.results?.map((ele)=>{

            return{
                id: ele.id,
                name:ele.title,
                summary:ele.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
                healthScore: ele.healthScore,
                image: ele.image,
                dishTypes: ele.dishTypes?.map(ele=> ele),
                diets: ele.diets?.map(ele=> ele),
                steps: ele.analyzedIntructios[0]?.steps.map((ele)=>`${ele.number} ${ele.step}`).join(" ")
            }
        })
        return info
    } catch(err){
        return err
    }
}

const searchINDB = async ()=>{
    try {
        const buscardb= await Recipes.findAll({
            include:{
                model: Diets,
                atributes:['name'],
                through:{
                    atributes:[]
                }
            }
        })
        let infodb= await buscardb?.map((ele)=>{
            return{
                id:ele.id,
                name:ele.name,
                summary:ele.summary,
                healthScore: ele.healthScore,
                image:ele.image,
                steps:ele.steps,
                diets: ele.diets?.map(ele=> ele.name)
            }
        })
        return infodb

    } catch (error) {
        return error
    }
}

const dbYApi= async()=>{
 try{
    const api= await BuscarenApi()
    const db = await SearchInApi()
    const dbapi = api.concat(db)
    return dbapi 
 }catch(err){
    return err
 }
}

const reci = async (recipe) =>{
try{
    if(recipe){
        const searchRecipe = await dbYApi()
        const result =searchRecipe.filter((ele)=> ele.name.toLowerCase().includes(recipe.toLowerCase()))
        if(result.length) return result
    }else{
        const all = await dbYApi()
        return all
    }
    throw ("We sorry, at the moment we haven't that recipe yet")
}catch(err){
    return err
}
}

const searchIdRecipe= async (id) =>{
    const searchRecipe = await dbYApi()
    const recipe= searchRecipe.find((ele)=> ele.id == id)

    if(recipe) return recipe
    else throw ("we sorry, we can't found a recipe with that ID")
}

const putDietInfo = async ()=>{
    let ruta= `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`

    const isEmpty = await Diets.findAll()
    if(!isEmpty.length){
        let recetas =["vegetarian"];
        const peticion =await axios.get(ruta)
        let data = await peticion.data.results

        data.forEach((e)=> {
            recetas=[...recetas, ...e.diets]
        });
        recetas= [...new Set(recetas)];
        for (let name of recetas){
            await Diets.create({name:name})
        }

        const dietas = await Diets.findAll();
        return dietas
    }else{
        return isEmpty
    }
}

const postRecipe = async (objRecipe)=>{
    try{
        const{name, summary, healthScore, steps, image, diets} = objRecipe
        const recipe={
            name, summary, healthScore, steps, image, 
        }
        const dietInfo = await Diets.findAll({
            where: {name: diets}
        })
        const createRecipe = await Recipes.create(recipe)
        createRecipe.addDiets(dietInfo)
        return Recipes.findAll()
    }catch(err){
        return err
    }
}

module.exports= {reci, SearchInApi, searchINDB, searchIdRecipe, putDietInfo, postRecipe}