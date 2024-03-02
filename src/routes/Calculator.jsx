import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import axios from "axios";
import "../styles/Calculator.css";

const Calculator = () => {
  const navigate = useNavigate();
  const [currentPercentage, setCurrentPercentage] = useState("");
  const [currentMileage, setCurrentMileage] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const range = localStorage.getItem("fullrange");
    const manufacturerFullRange = range;
    const currentFullRange =
      currentMileage / (currentPercentage / 100).toFixed(2);
    const lostMiles = (manufacturerFullRange - currentFullRange).toFixed(2);
    const lostPercentage = ((lostMiles / manufacturerFullRange) * 100).toFixed(
      2
    );
    const currentBatteryHealth = (100 - lostPercentage).toFixed(2);

    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const response = await axios.post(
        process.env.REACT_APP_POST_HEALTH,
        {
          userId: userId,
          full_range: manufacturerFullRange,
          current_range: currentFullRange,
          current_battery_health: currentBatteryHealth,
          lost_miles: lostMiles,
          lost_percentage: lostPercentage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setMessage({
          type: "success",
          text: "submission successful. Redirecting to monitoring...",
        });
        setTimeout(() => navigate("/monitor", 30000));
      }
    } catch (error) {
      setMessage({
        type: "danger",
        text: "Something went wrong, please try again!.",
      });
      console.error(`Error posting battery health: ${error}`);
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator-content">
        {message && <Alert variant={message.type}>{message.text}</Alert>}
        <h1 className="calculator-title">EV Battery Calculator</h1>
        <p className="calculator-description">
          Enter your current charge level and mileage to estimate your EV's
          battery health.
        </p>
        <form className="calculator-form" onSubmit={handleSubmit}>
          <input
            type="number"
            className="form-input"
            placeholder="Current Percentage (%)"
            value={currentPercentage}
            onChange={(e) => setCurrentPercentage(e.target.value)}
          />
          <input
            type="number"
            className="form-input"
            placeholder="Current Mileage (miles)"
            value={currentMileage}
            onChange={(e) => setCurrentMileage(e.target.value)}
          />
          <button type="submit" className="calculate-button">
            Calculate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Calculator;
