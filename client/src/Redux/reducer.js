import {TRAER_RECETAS, MODIFICAR_RECETA, VACIAR_ID, CAMBIAR_PAGINA, SEARCH, SELECCIONADAS, TRAER_DIETAS, FILTRAR_DIETAS, POST_RECIPE, ORDENAR_POR_NOMBRE, FILTRO_SCORE,  RECETA_ID, LIMPIAR_DETAIL} from './action-types';

const initialState ={
    recetas: [],
    recetas2: [],
    dietas: [],
    currentPage: 1,
    recetaId: [],
    seleccionadas: [],
    search: '', 
}

const rootReducer =(state = initialState, action) =>{
    switch(action.type){
        case TRAER_RECETAS:
            return{
                ...state,
                recetas: action.payload,
                recetas2: action.payload,
                detailId: []
            }
        case LIMPIAR_DETAIL:
            return{
                ...state,
                detailId:[]
            }
        case MODIFICAR_RECETA:
            return{
                ...state,
                recetas: action.payload,
                recetas2: action.payload
            }
        case RECETA_ID:
            return{
                ...state,
                recetaId: action.payload
            }
        case VACIAR_ID:
            return{
                ...state,
                recetaId: []
            }
        case TRAER_DIETAS:
            return{
                ...state,
                dietas: action.payload
            }
        case FILTRAR_DIETAS:
            return{
                ...state,
                dietas: [...action.payload]
            }
        case CAMBIAR_PAGINA:
            return{
                ...state,
                currentPage: action.payload
            }
        case ORDENAR_POR_NOMBRE:
            const allRecipe = [...state.recetas];
            const sortedLetter = allRecipe.sort((a, b) => {
            const nameA = typeof a.name === 'string' ? a.name : '';
            const nameB = typeof b.name === 'string' ? b.name : '';
            if (action.payload === 'asc') {
            return nameA.localeCompare(nameB);
                } else if (action.payload === 'desc') {
                return nameB.localeCompare(nameA);
                 } else {
            // fallback in case action.payload is not 'asc' or 'desc'
                return 0;
         }
            });
            return {
                 ...state,
                recetas: sortedLetter,
                currentPage: 1  
                }

        case FILTRO_SCORE:
            let allRecipes = [...state.recetas];
            let orderByHealthScore;
            if(action.payload === 'maximo') {
                orderByHealthScore = allRecipes.sort((a, b) => b.healthScore - a.healthScore);
            } else {
                orderByHealthScore = allRecipes.sort((a, b) => a.healthScore - b.healthScore);
            }
            return {
                ...state,
                recetas: orderByHealthScore,
                currentPage: 1
            }
        case SELECCIONADAS:
            return{
                ...state,
                search: action.payload
            }
        case SEARCH:
            return{
                ...state,
                search: action.payload
            }
        case POST_RECIPE:
            return{
                ...state,
                recetas: [...state.recetas, action.payload]
            }

        default:
           return { ...state }    
    }
}

export default rootReducer;