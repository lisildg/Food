import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ordenarPorNombre } from "../../../Redux/actions";
import style from "./DesAsc.module.css";

export const DesAsc = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleSort = (e) => {
    e.preventDefault();
    dispatch(ordenarPorNombre(e.target.value));
    setValue(e.target.value);
  };
  

  return (
    <div className={style.box}>
      <select className={style.classic} onChange={handleSort} value={value}>
        <option value=""> Alfabetic Order</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      
    </div>
  );
};
