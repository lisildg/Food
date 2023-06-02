import React from "react";
import style from './NavBar.module.css';
import { Link } from 'react-router-dom';


export const Nav2 = () => {
  return (
    <nav className={style.nav}>
      <div className={style.navbarMenu}>
        <ul>
        <Link to='/'><button className={style.exitButton}>Principal page</button></Link>
        </ul>
        <ul>
        <Link to='/home'><button className={style.homeButton}>Home</button></Link>
        </ul>
      
      </div>
      
    </nav>
  )
}
