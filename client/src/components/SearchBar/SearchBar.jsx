import React from "react";
import style from "./SearchBar.module.css"
import { useSelector } from "react-redux";


export const SearchBar = (props) =>{
  
  const search = useSelector(state => state.search)


return (
    <div>
      
      <input className={style.Search}
        placeholder="Search your recipe by name"  
        type="text"
        onChange={props.handleChange}
        value={search}
      />
      
    </div>
  );
};