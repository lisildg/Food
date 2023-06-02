import React from "react";
import loader1 from '../../assets/loader1.gif'
import style from './Loading.module.css'

const Loading = () => {
  return (
    <div>
    <div className="loading">
     
      <img class ='gif' src={loader1}  alt="Gif" />

    </div>
    </div>
  );
};

export default Loading;
