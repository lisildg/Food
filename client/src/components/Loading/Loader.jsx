import React, {useEffect, useState}from "react";
import loader1 from '../../assets/loader1.gif'
import style from './Loader.module.css'

const Loader = () => {

  const datosCuriosos = [
    "Tomatoes are technically a fruit.",
    "Bananas float in water due to their low density.",
    "Purple carrots exist and contain special antioxidants.",
    "Strawberries have more vitamin C than oranges.",
    "Avocado is a fruit, not a vegetable, and its original name means 'testicle'.",
    "Asparagus can make urine have a peculiar odor.",
    "Mangos contain a chemical that can irritate the skin.",
    "Broccoli is one of the vegetables with the highest amount of protein.",
    "Pomegranates can contain up to 600 seeds.",
    "Cherries can be yellow, red, or black in color.",
    "Potatoes were the first vegetable grown in space.",
    "Kiwi is the national fruit of New Zealand.",
    "Zucchini is technically a berry.",
    "Artichokes are actually a flower of the plant.",
    "Apples float in water due to their high air content.",
    "Spinach was originally cultivated in Persia over 2,000 years ago.",
    "Brazil nuts are the richest natural source of selenium.",
    "Peaches originated in China and are considered a symbol of longevity.",
    "Raisins are simply dried grapes.",
    "Ginger is considered an aphrodisiac and is used as a condiment in many cultures."
  ];
  
  const [fraseAleatoria, setFraseAleatoria] = useState('');

  useEffect(() => {
    // Función para obtener una frase aleatoria del array
    const obtenerFraseAleatoria = () => {
      const indiceAleatorio = Math.floor(Math.random() * datosCuriosos.length);
      const frase = datosCuriosos[indiceAleatorio];
      setFraseAleatoria(frase);
    };

    // Llamada a la función al cargar la página
    obtenerFraseAleatoria();
  }, []);

  return (
    <div className={style.container}>
      <h1 className={style.name}>Loading...</h1>
      <p className={style.frase}>{fraseAleatoria}</p>
    </div>
  );
};

export default Loader;