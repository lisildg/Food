import React from 'react';
import { Link } from 'react-router-dom';
import fondoo from '../../assets/fondoo.mp4';
import './LandingPage.css'; // Archivo CSS normal

export const LandingPage = (props) => {
  return (
    <div className="landing-page">
      <div className="video-container">
        <video src={fondoo} autoPlay loop muted />
      </div>
      <div className="content-container">
        <div className="card">
          <h1>Recipes for everyone!!!</h1>
          <br />
          <div>
            <span>Welcome</span>
          </div>
          <Link to="home">
            <button className="button">
              See Recipes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
