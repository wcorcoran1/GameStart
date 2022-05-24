import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { user } = useAuth();

  return (
    <nav>
      <div className="navBar">
        {/* <h1>Welcome to GameStart </h1> */}
        <Link className="link" to="/games">
          Games{" "}
        </Link>
        <Link className="link" to="/platforms">
          Platforms{" "}
        </Link>
        <Link className="link" to="/hardware">
          Accessories{" "}
        </Link>
        {/* <Link className="link" to="/Login">Login </Link> */}
        {/* <Link className="link" to="/Register">Register </Link> */}
        {/* <Link className="link" to="/profile">Profile </Link> */}
        <Link className="link" to="/cart">
          Cart{" "}
        </Link>
        <Link className="link" to="/">
          Home{" "}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
