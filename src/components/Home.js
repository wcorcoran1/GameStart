import React from "react";
import Login from "./user/Login";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homepage">
      <div className="topbot">
      <h3 className="login">
        <strong>Welcome to GameStart</strong>
      </h3>
      <h4 className="login" >Sign in to your GameStart account</h4>
      </div>
      <Login />
      <div className="createacc">
      <h5 className="login">Don't have an account?</h5>
      <nav>
        <Link to="/Register">
          <button className="createaccount">CREATE ACCOUNT</button>{" "}
        </Link>
      </nav>
        
      </div>
    </div>
  );
};

export default Home;
