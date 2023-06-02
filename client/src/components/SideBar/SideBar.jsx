import React from "react";
import { Dietas } from "./filtros/dietas";
import { DesAsc } from "./filtros/asd-des";
import { Health } from "./filtros/heatlhScore";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../Redux/actions"
import style from "./siderbar.module.css"

import { useEffect } from "react";
import { SearchBar } from "../SearchBar/SearchBar";

export const Sidebar = (props) =>{

const dispatch = useDispatch()    

const recetas2 = useSelector(state => state.recetas2)

const seleccionadas = useSelector(state => state.seleccionadas)
const search = useSelector(state => state.search)

  const handleChange2 = (e) => {

    const name = e.target.value
    const buscar = seleccionadas.find(ele => ele === name)
    dispatch(actions.cambiarPagina(1))
    if(buscar){
      dispatch(actions.setSeleccionadas(seleccionadas.filter(dietas => dietas !== name)))
      
    }else{
      dispatch(actions.setSeleccionadas([...seleccionadas, e.target.value]))
      
  }
  
  };

 const filtroDietas = (seleccionadas, dietas) =>{
    for(const id of seleccionadas){
      const result = dietas?.find((ele) => ele == id)
      if(!result) return false
        }
    return true
   } 


  const filtro = recetas2?.filter((ele) => filtroDietas(seleccionadas, ele.diets) && ele.name?.toLowerCase().includes(search) ) 

  
//barrra de busqueda
const handleChange =(e) => { 
    e.preventDefault() 
    dispatch(actions.setSearch(e.target.value))
    dispatch(actions.cambiarPagina(1))
}

useEffect(() => {

    dispatch(actions.filtrarDietas(filtro));
  
  }, [search, seleccionadas])


  const handleClick = () => {
    window.location.reload();
}


    return (
      <div className={style.filterBar}>
      <div className={style.filterConteiner}>
        <SearchBar handleChange={handleChange} className={style.SearchBar} />
        <DesAsc className={`${style.filter} ${style.inline}`} />
        <Health className={`${style.filter} ${style.inline}`} />
        <Dietas handleChange2={handleChange2}   />
        <button className={style.button} onClick={(event) => handleClick(event)}><p>Clean filter</p></button>
      </div>
    </div>

    )
}