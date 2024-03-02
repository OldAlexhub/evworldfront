import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Monitor.css";

const Monitor = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_SHOW_HEALTH}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setData(response.data.show);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="monitor-container">
      <div className="monitor-header">
        <h5
          className="display-6 text-light"
          style={{ textShadow: "2px 2px 4px #000000" }}
        >
          Battery Health Snippet
        </h5>
      </div>
      <div
        className="monitor-links"
        style={{ textShadow: "2px 2px 4px #000000" }}
      >
        <ul>
          <li>
            <Link to="/graphone">Manufactory Range VS. Current Range</Link>
          </li>
          <li>
            <Link to="/graphtwo">Battery Health TrendLine</Link>
          </li>
          <li>
            <Link to="/graphthree">Lost Miles</Link>
          </li>
          <li>
            <Link to="/graphfour">Lost Percentage</Link>
          </li>
        </ul>
      </div>
      <div className="monitor-data-list">
        <ul>
          {data.map((dat) => (
            <li key={dat._id}>
              <p>
                <strong>Date Submitted: </strong>
                {new Date(dat.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time Submitted: </strong>
                {new Date(dat.date).toLocaleTimeString()}
              </p>
              <p>
                <strong>Manufactory Full (100%) Range: </strong>
                {dat.full_range} Miles
              </p>
              <p>
                <strong>Current Full (100%) Range: </strong>
                {dat.current_range.toFixed(2)} Miles
              </p>
              <p>
                <strong>Battery Current Health: </strong>
                {dat.current_battery_health}%
              </p>
              <p>
                <strong>Miles Lost on A Full Charge: </strong>
                {dat.lost_miles} Miles
              </p>
              <p>
                <strong>Lost Percentage: </strong>
                {dat.lost_percentage}%
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Monitor;
