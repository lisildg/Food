import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardRecipe } from "../../components/CardRecipes/CardRecipe";
import style from "./Home.module.css";
import { traerReceta } from "../../Redux/actions";
import { Pagination } from "../../components/Pagination/Pagination";
import { Sidebar } from "../../components/SideBar/SideBar";
import Loader from "../../components/Loading/Loader";
import { NavBar2 } from "../../components/Nav/Navbar2";

export const Home = () => {
  const dispatch = useDispatch();
  const recetas = useSelector((state) => state.recetas);
  const currentPage = useSelector((state) => state.currentPage);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true); // Create a ref to track component mount state

  useEffect(() => {
    dispatch(traerReceta());

    return () => {
      // Cleanup function to cancel any pending asynchronous tasks
      isMounted.current = false; // Set the mount state to false on unmount
    };
  }, [dispatch]);

  const [recipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recetas && Array.isArray(recetas)
    ? recetas.slice(indexOfFirstRecipe, indexOfLastRecipe)
    : [];

  useEffect(() => {
    // Simulating an asynchronous task
    const timer = setTimeout(() => {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }, 6000);

    return () => {
      // Cleanup function to cancel the timeout when the component is unmounted
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={`${style.container} `}>
      <NavBar2 />
      <Sidebar />
      {currentRecipes.length &&
        currentRecipes.map((r, index) => (
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
