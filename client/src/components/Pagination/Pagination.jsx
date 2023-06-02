import React from "react";
import * as actions from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Pagination.module.css";

export const Pagination = (props) => {
  const { recipesPerPage, recetas } = props;
  const dispatch = useDispatch();

  const recetas2 = useSelector((state) => state.recetas);

  const currentPage = useSelector((state) => state.currentPage);
  let pages = [];
  for (let i = 1; i <= Math.ceil(recetas / recipesPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className={styles.Paginacion}>
      <div className={styles.BarraPaginacion}>
      {currentPage !== 1 && recetas2.length >= recipesPerPage ? (
        <>
          <button
            onClick={() => dispatch(actions.cambiarPagina(currentPage - 1))}
          >
            {"<"}
          </button>
          {currentPage > 2 && (
            <button
              className={styles.BtnPaginacion}
              onClick={() => dispatch(actions.cambiarPagina(currentPage - 2))}
            >
              {currentPage - 2}
            </button>
          )}
          <button
            className={styles.BtnPaginacion}
            onClick={() => dispatch(actions.cambiarPagina(currentPage - 1))}
          >
            {currentPage - 1}
          </button>
        </>
      ) : (
        <button disabled>{"<"}</button>
      )}

      <button>{currentPage}</button>

      {currentPage !== pages[pages.length - 1] && recetas2.length >= recipesPerPage ? (
        <>
          <button
            className={styles.BtnPaginacion}
            onClick={() => dispatch(actions.cambiarPagina(currentPage + 1))}
          >
            {currentPage + 1}
          </button>
          {currentPage < pages[pages.length - 2] - 1 && (
            <button
              className={styles.BtnPaginacion}
              onClick={() => dispatch(actions.cambiarPagina(currentPage + 2))}
            >
              {currentPage + 2}
            </button>
          )}
          <button
            onClick={() => dispatch(actions.cambiarPagina(currentPage + 1))}
          >
            {">"}
          </button>
        </>
      ) : (
        <button disabled>{"||"}</button>
      )}
      </div>
    </div>
  );
};