import React from 'react';
import style from './CardRecipe.module.css';
import { Link } from 'react-router-dom';

export const CardRecipe = ({ id, name, healthScore, image, diets }) => {
  if(name){
  return (
    <Link to={`/detail/${id}`}>
      <div className={style.card}>
        <img 
          className={style.image}
          src={image ? image :null}
          alt=""
          
        />
        <h3 className={style.name}>{name? name :null }</h3>
        <h3 className={style.diets}>Diets: {diets? diets :null}</h3>
        <h3 className={style.healthScore}>HealthScore: {healthScore? healthScore :null}</h3>
      </div>
    </Link>
  )} else{
   return (<div><p></p></div>)
  }
};



