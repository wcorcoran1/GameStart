// This is our register component that makes up our register form and function.
// This is all our imports that we used for this component
import React, { useState } from "react";
import { registerUser } from "../../api/index";
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';


const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  let navigate = useNavigate();
  const {
    loginStatus,
    setLoginStatus,
    loginMessage,
    setLoginMessage,
    token,
    setToken,
    user,
    setUser
  } = useAuth();
  
// On register we make an APIcall for registerUser to make a new user in the database by return a token 
  const onRegister = async (e) => {
    e.preventDefault();
    const result = await registerUser(name, email, username, password);
    // console.log("HELLO WORLD")
    
    console.log("RegisterUser", result);
    localStorage.setItem("token", result.token);

    const myToken = result.token;
    setToken(myToken);
    setUser(result.user)
    setLoginStatus(true)
    navigate("../")

  };
  return (
    <div className="userForm">
      <form onSubmit={onRegister}>
        <fieldset className="nameForm">
        <input
          value={name}
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        </fieldset>
        <fieldset className="nameForm">
        <input
          value={email}
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        </fieldset>
        <fieldset className="nameForm">
        <input
          value={username}
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        </fieldset>
        <fieldset className="nameForm">
        <input
          value={password}
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        </fieldset>
        <button className="registerButton" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
