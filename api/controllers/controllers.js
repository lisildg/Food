const axios= require('axios');
const {Recipes, Diets} = require("../src/db");

const SearchInApi = async () =>{

    try{
        const BuscarenApi = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)

        let info = await BuscarenApi.data.results?.map((ele) =>{ 

            return{
                id: ele.id,
                name: ele.title,
                summary: ele.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
                healthScore: ele.healthScore,
                image: ele.image,
                dishTypes: ele.dishTypes?.map(ele => ele),
                diets: ele.diets?.map(element => element), 
                steps: ele.analyzedInstructions[0]?.steps.map((ele)=>`${ele.number} ${ele.step}`).join(" "),
            } 
        } ) 
        return info
    }
    catch(err){
        return err
    }

}
const searchInDb = async () => {
    try{
    const buscardb = await Recipes.findAll({
        include:{
            model: Diets,
            atributes: ['name'],
            through: {
                atributes: [],
            }
        }
    })

    let infodb = await buscardb?.map((ele) => {
    return{
        id: ele.id,
        name: ele.name,
        summary: ele.summary,
        healthScore: ele.healthScore,
        image: ele.image,
        steps: ele.steps,
        diets: ele.diets?.map(element => element.name), 
    }
   }) 
return infodb
}
catch(err){
return err
}
}

const dbYApi = async () =>{

   try{
const api = await SearchInApi()
const db = await searchInDb()
const dbapi = api.concat(db)
return dbapi
} 
catch(err) {
    return err
}
}



const reci = async(recipe)=>{
    try {
        if(recipe){
            const searchRecipe = await dbYApi()
            
const result = searchRecipe.filter((element) => element.name.toLowerCase().includes(recipe.toLowerCase()))
            
            if (result.length) return result
        }else{
            const all =await dbYApi()
            return all
        } 
        throw ('Lo sentimos, por el momento no tenemos esta receta')
    } catch (error) {
        return error
    }
}

 const searchIdRecipe = async(id) =>{
    
        const searchRecipe = await dbYApi()
         const recipe= searchRecipe.find((ele)=> ele.id ==id)
    
         if(recipe)return recipe
         else throw('Lo sentimos, no encontramos una receta con ese ID')
    
 }


const putDietInfo = async()=>{
    // let ruta = `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`;
   

    const isEmpty = await Diets.findAll();
    if(!isEmpty.length){
      let recetas = ["vegetarian"];
      const peticion = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`);
      let data = await peticion.data.results; //data Es Un Array De Objetos De Recetas

      data.forEach((elem) => {
        recetas = [...recetas, ...elem.diets];
      });
      recetas = [...new Set(recetas)];
      for(let name of recetas){
        await Diets.create({name: name});
      }
      // return recetas;
      const dietas = await Diets.findAll();
      return dietas;
    }else{
      return isEmpty;
    }
}

const postRecipe =async(objRecipe)=>{
    try {
        const{name, summary, healthScore, steps, image, diets} = objRecipe;
        const recipe={
            name, summary, healthScore, steps, image
        }
        const dietInfo = await Diets.findAll({
            where: {
                name: diets
            }
        });
        const createRecipe = await Recipes.create(recipe)
        createRecipe.addDiets(dietInfo)
        return Recipes.findAll()
    } catch (error) {
        console.log(error)
    }
}


module.exports ={
    reci, SearchInApi, searchInDb, searchIdRecipe, putDietInfo, postRecipe, 
}