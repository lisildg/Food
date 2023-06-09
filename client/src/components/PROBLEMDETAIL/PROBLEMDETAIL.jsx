import React from "react";
import style from './problem.module.css'

export const ProblemDetail = () => {

    return (
        <div className={style.conteiner}>
            <div>
            <h1 className={style.h1}>Sorry we've problems with the info of this recipe.</h1>
            <span className={style.span}>We're working to solve the problems, come back later</span> <br></br>
            <span className={style.span2}>Thanks for your patience</span>
        </div>
        </div>
    )
}