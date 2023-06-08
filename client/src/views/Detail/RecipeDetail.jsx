import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { recetaId, vaciarId } from "../../Redux/actions";
import style from "./Detail.module.css";
import Loader from "../../components/Loading/Loader";

export const RecipeDetail = () => {
  const dispatch = useDispatch();
  const detailId = useSelector((state) => state.recetaId);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const regresar = () => {
    dispatch(vaciarId());
  };

  useEffect(() => {
    if (!detailId.length && id) {
      const timerId = setTimeout(() => {
        dispatch(recetaId(id));
        if (id === "undefined") console.log("cargando id");
      }, 3000);

      return () => clearTimeout(timerId);
    }
  }, [dispatch, detailId.length, id]);

  useEffect(() => {
    // Simulating an asynchronous task
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={style.fondo}>
      <div className={style.card}>
        <div className={style.detailContainer}>
          <div>
            <div>
              <h3>Id: {detailId?.id}</h3>
              <img src={detailId?.image} alt="" />
              <h2>Name: {detailId?.name}</h2>
              <h3>Steps: {detailId?.steps}</h3>
              <h4>
                Diets:{" "}
                {detailId?.diets?.map((diet, index) => (
                  <span key={index}>{diet}</span>
                ))}
              </h4>
              <h4>HealthScore: {detailId?.healthScore}</h4>
              <h4>Summary: {detailId?.summary}</h4>
              <h4>DishTypes: {detailId?.dishTypes?.map((dishT) => dishT)}</h4>
              <button>
                <Link
                  to="/home"
                  onClick={() => regresar()}
                  className={style.homeLink}
                >
                  Home
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
