import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "../styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    full_range: "",
  });
  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_SIGNUP, formData);

      if (response.status === 201) {
        setMessage({
          type: "success",
          text: "Signup successful. Redirecting...",
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setMessage({ type: "danger", text: "Signup failed. Please try again." });
      console.log(error);
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1 className="signup-title">Signup</h1>
        {message && <Alert variant={message.type}>{message.text}</Alert>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-input"
            placeholder="Username"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
          <input
            type="email"
            className="form-input"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Your EV's Full Range"
            name="full_range"
            value={formData.full_range}
            onChange={handleChange}
          />
          <input
            type="password"
            className="form-input"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            className="form-input"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button type="submit" className="signup-button">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
