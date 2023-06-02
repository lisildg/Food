import React from "react";
import {filtroScoreH} from "../../../Redux/actions";
import { useDispatch } from "react-redux";
import style from "./Health.module.css"
import { useState } from "react";


export const Health = () => {

    const dispatch = useDispatch()
    const [, setValue] = useState("");


    const filter = (e) =>{
        e.preventDefault()
        dispatch(filtroScoreH(e.target.value))
        setValue(e.target.value);
    }

    return(
        
        <div className={style.box}>
<select className={style.classic} onChange={ e => filter(e)}>
<option value="">Health Score</option>
    <option value ="maximo">Mayor a menor</option>
    <option value ="desc">Menor a mayor</option>

</select>
        </div>
    )
}