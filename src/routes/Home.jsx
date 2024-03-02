import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="container mt-5 text-center">
      <div className="row">
        <div className="col">
          <h1
            className="display-4 text-light"
            style={{ textShadow: "2px 2px 4px #000000" }}
          >
            Welcome to EV-World: Your Ultimate Platform for Tracking and
            Monitoring Your Electric Vehicle's Battery Health.
          </h1>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <h3>
            <Link to="/calculator" className="cool-link">
              Start Calculating
            </Link>
          </h3>
        </div>
        <div className="col">
          <h3>
            <Link to="/monitor" className="cool-link">
              Monitor
            </Link>
          </h3>
        </div>
        <div className="col">
          <h3>
            <Link to="/news" className="cool-link">
              Check EV News
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
