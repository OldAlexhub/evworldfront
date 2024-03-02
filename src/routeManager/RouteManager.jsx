import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../routes/Home";
import Calculator from "../routes/Calculator";
import News from "../routes/News";
import Monitor from "../routes/Monitor";
import Signup from "../routes/Signup";
import GraphOne from "../components/GraphOne";
import GraphTwo from "../components/GraphTwo";
import GraphThree from "../components/GraphThree";
import GraphFour from "../components/GraphFour";

// Consider creating a separate hook or utility function for authentication
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      const fullrange = localStorage.getItem("fullrange");
      const userId = localStorage.getItem("userId");
      const isAuthenticated = !!token && !!username && !!fullrange && !!userId;
      setIsLoggedIn(isAuthenticated);
      setIsLoading(false);
    };

    checkAuth();

    // Set up a listener for changes in localStorage
    const handleStorageChange = (event) => {
      if (["token", "username", "fullrange", "userId"].includes(event.key)) {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Clean up the listener when the component unmounts
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return { isLoggedIn, isLoading };
};

const RouteManager = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="calculator"
            element={isLoggedIn ? <Calculator /> : <Navigate to="/" replace />}
          />
          <Route
            path="news"
            element={isLoggedIn ? <News /> : <Navigate to="/" replace />}
          />
          <Route
            path="monitor"
            element={isLoggedIn ? <Monitor /> : <Navigate to="/" replace />}
          />
          <Route
            path="graphone"
            element={isLoggedIn ? <GraphOne /> : <Navigate to="/" replace />}
          />
          <Route
            path="graphtwo"
            element={isLoggedIn ? <GraphTwo /> : <Navigate to="/" replace />}
          />
          <Route
            path="graphthree"
            element={isLoggedIn ? <GraphThree /> : <Navigate to="/" replace />}
          />
          <Route
            path="graphfour"
            element={isLoggedIn ? <GraphFour /> : <Navigate to="/" replace />}
          />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteManager;
