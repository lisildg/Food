
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../Redux/actions'
import style from "./Dietas.module.css"

export const Dietas = (props) => {


const diets = useSelector((state) => state.dietas);
 
const seleccionadas = useSelector((state) => state.seleccionadas);

const dispatch = useDispatch();

useEffect(() =>{
    if(!diets.length){
        dispatch(actions.traerDietas())
        
    }
    
}, [dispatch]);

return (
  <div className ={style.box}>
    <div className={style.dietasContainer}>
        {diets?.map((diet) => {
            return (
                <div key={diet.name}>
                    <input
                    className={style.checkBox}
                    type='checkbox'
                    id={diet.id}
                    checked={seleccionadas.includes(diet.name)}
                    value={diet.name}
                    name={diet.id}
                    onChange={(e) => props.handleChange2(e)}/>
                    <label htmlFor={diet.id} className={style.name}>
                        {diet.name}
                    </label>
                </div>
            )
        })}
    </div>
    </div>
    )
};
