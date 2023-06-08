import React from "react";
import style from './NavBar.module.css';
import { Link } from 'react-router-dom';


export const NavBar2 = () => {
  return (
    <nav className={style.nav}>
      <div className={style.navbarMenu}>
        <ul>
        <Link to='/'><button className={style.exitButton}>Principal page</button></Link>
        </ul>
        <ul>
        <Link to='/create'><button className={style.createRecipeButton}>Create Recipe</button></Link>
        </ul>
      </div>
      
    </nav>
  )
}
