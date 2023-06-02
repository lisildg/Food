import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardRecipe } from "../../components/CardRecipes/CardRecipe";
import style from './Home.module.css'
import { traerReceta } from "../../Redux/actions";
import { Pagination } from "../../components/Pagination/Pagination";
import { useState } from "react";
import { Sidebar } from "../../components/SideBar/SideBar";
import { Nav } from "../../components/Nav/NavBar";
import Loading from "../../components/Loading/Loading";

export const Home = () => {
  const dispatch = useDispatch();
  const recetas = useSelector(state => state.recetas);
  const currentPage = useSelector(state => state.currentPage);

  useEffect(() => {
    dispatch(traerReceta());
  }, [dispatch]);

  const [recipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recetas && Array.isArray(recetas)
    ? recetas.slice(indexOfFirstRecipe, indexOfLastRecipe)
    : [];

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulando una tarea asincrónica
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, []);
    if (isLoading) {
      return <Loading />;
    }
  return (
    <div className={`${style.container} `}>
      <Nav className={style.nav} />
      <Sidebar />
      {currentRecipes.length && currentRecipes.map((r, index) => (
            <CardRecipe
              key={`r.${index}`}
              image={r.image}
              name={r.name}
              diets={r.diets}
              healthScore={r.healthScore}
              id={r.id}
            />
          ))}
      <Pagination
        className="pagination"
        recipesPerPage={recipesPerPage}
        recetas={recetas.length}
        currentPage={currentPage}
      />
    </div>
  );
};
