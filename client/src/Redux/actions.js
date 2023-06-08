import axios from 'axios';
import {TRAER_RECETAS,SET_FILTERED_RECIPES,CLEAN_FILTERED_RECIPES, LIMPIAR_DETAIL, VACIAR_ID, CAMBIAR_PAGINA, SEARCH, SELECCIONADAS, TRAER_DIETAS, FILTRAR_DIETAS, ORDENAR_POR_NOMBRE, FILTRO_SCORE, RECETA_ID,} from './action-types'

export const traerReceta=()=>{
    return async (dispatch) =>{
        let receta = await axios('/recipes/')
        return dispatch({type:TRAER_RECETAS, payload : receta.data})
    }
};

export const vaciarId=()=>{
    return {
        type: VACIAR_ID
    }
};

export const limpiarDetail =()=>{
    return{
        type: LIMPIAR_DETAIL
    }
};

export const cambiarPagina =(pagenumber)=>{
    return {
        type: CAMBIAR_PAGINA,
        payload: pagenumber++
    }
};
export const setSearch =(payload)=>{
    return{
        type: SEARCH,
        payload
    }
}
export const setSeleccionadas =(payload)=>{
    return{
        type: SELECCIONADAS,
        payload
    }
};

export const traerDietas =()=>{
     return async (dispatch) =>{
        let receta = await axios(`/diets/`)
        return dispatch({type: TRAER_DIETAS, payload: receta.data})
     }
};

export const filtrarDietas =(payload)=>{
    return{
        type: FILTRAR_DIETAS,
        payload: payload
    }
};

export const ordenarPorNombre =(payload)=>{
    return{
        type: ORDENAR_POR_NOMBRE,
        payload
    }
};

export const filtroScoreH=(payload)=>{
    return {
        type: FILTRO_SCORE,
        payload
    }
};

export const recetaId = (id) => {
    return async (dispatch) => {
      try {
        let receta = await axios(`/recipes/${id}`);
        return dispatch({ type: RECETA_ID, payload: receta.data });
      } catch (error) {
        console.log(error);
      }
    };
  };
  

export const postRecipe =(payload)=>{
    return async function(dispatch){
        try {
            const postRecipe =await axios('/recipes/', payload)
            .then((a)=> alert(a))
            return postRecipe
        } catch (error) {
            console.log(error)
            
        }
    }
};

export const modificar =(id, payload) =>{
    return async function (){
        const modificar = await axios (`/recipes/${id}`, payload)
        return modificar
    }
}

export const setFilteredRecipes = (recipes) => {
    return {
      type: SET_FILTERED_RECIPES,
      payload: recipes,
    };
  };
  
  export const cleanFilteredRecipes = () => {
    return {
      type: CLEAN_FILTERED_RECIPES,
    };
  };
  