import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Layout.css";

const Layout = () => {
  const navigate = useNavigate();
  const [hasToken, setHasToken] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_LOGIN, formData);
      const { token, username, fullRange, userId } = response.data;
      if (response.status === 200) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("fullrange", fullRange);
        localStorage.setItem("userId", userId);
        setHasToken(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        setFormData("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const fullrange = localStorage.getItem("fullrange");
    const userId = localStorage.getItem("userId");
    setHasToken(!!token && !!username && !!fullrange && !!userId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("fullrange");
    localStorage.removeItem("userId");
    setHasToken(false);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            EV World
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {hasToken && (
                <li className="nav-item">
                  <Link className="nav-link" to="/calculator">
                    Calculator
                  </Link>
                </li>
              )}
              {hasToken && (
                <li className="nav-item">
                  <Link className="nav-link" to="/monitor">
                    Monitor
                  </Link>
                </li>
              )}
              {hasToken && (
                <li className="nav-item">
                  <Link className="nav-link" to="/news">
                    News
                  </Link>
                </li>
              )}
            </ul>
            <div className="d-flex">
              {!hasToken && (
                <>
                  <form onSubmit={handleLogin} className="d-flex">
                    <input
                      className="form-control me-2"
                      placeholder="Username"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                    />
                    <input
                      className="form-control me-2"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button className="btn btn-outline-success" type="submit">
                      Login
                    </button>
                  </form>
                  <p
                    className="ms-3 my-auto"
                    style={{
                      textShadow: "2px 2px 4px #000000",
                      color: "#ffffff",
                    }}
                  >
                    Register{" "}
                    <Link
                      to="/signup"
                      style={{
                        textShadow: "2px 2px 4px #000000",
                        color: "#ffffff",
                      }}
                    >
                      here
                    </Link>
                  </p>
                </>
              )}
              {hasToken && (
                <button
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
