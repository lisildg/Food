import React from "react";
import style from "./SearchBar.module.css"
import { useSelector } from "react-redux";


export const SearchBar = (props) =>{
  
  const search = useSelector(state => state.search)


return (
    <div>
      
      <input className={style.Search}
        placeholder="Busca tu receta por su nombre"  
        type="text"
        onChange={props.handleChange}
        value={search}
      />
      
    </div>
  );
};