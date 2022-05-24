import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
// import { getAPIHealth } from '../axios-services';

import axios from "axios";
import "../style/App.css";
import { Hardware, Navbar, Games, Cart, Home, Platforms, Footer } from "./";
import Register from "./user/Register";
import Login from "./user/Login";
import useAuth from "../hooks/useAuth";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const { token, setToken } = useAuth();
  async function getAPIHealth() {
    try {
      const { data } = await axios.get("/api/health");
      return data;
    } catch (err) {
      console.error(err);
      return { healthy: false };
    }
  }

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };
  });
  //   second, after you've defined your getter above
  //   invoke it immediately after its declaration, inside the useEffect callback
  //   getAPIStatus();
  // }, []);
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    localToken ? setToken(localToken) : console.log("Trouble setting token...");
  }, [token]);

  return (
    <div>
      <div className="app-container">
        {/* <h1>GAMESTART - YOUR GAMING DEPOT</h1> */}
        <img src="/images/logo.jpg" alt="not found" />
        {/* <p>API Status: {APIHealth}</p> */}
      </div>
      <Navbar />
      <Routes>
        <Route path="/games" element={<Games />} />
        <Route path="/hardware" element={<Hardware />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/platforms" element={<Platforms />} />
        {/* <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} /> */}
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
