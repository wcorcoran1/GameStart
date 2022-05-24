// This is our user login component that builds our login form on the home page
// This is all our imports that were used for this component
import React, { useState, useEffect } from "react";
import { userLogin, getUserProfile } from "../../api/index";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    loginStatus,
    setLoginStatus,
    loginMessage,
    setLoginMessage,
    token,
    setToken,
    user,
    setUser,
  } = useAuth();
/* This function calls our login function from the API then checks to see if the user data is correct
if the data is correct set the token and set the login status to true.*/  
const onLogin = async (e) => {
    e.preventDefault();
    console.log("HELLO WORLD!!!");
    const result = await userLogin(username, password);
   
    // if (result.error) {
    //   console.log("an error has occurred in onLogin function")
    //   setLoginMessage(result.message);
    // }
    // setLoginMessage(result.message)
    localStorage.setItem("token", result.token);
    localStorage.setItem("username", username);
    setToken(result.token)
    console.log(result.user, "ONLOGIN");
    setUser(result.user);
    setLoginStatus(true);
  };
// on logout this function removes the token from local storage and sets the login status to false. 
  const onLogOut = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setLoginStatus(false);
    setToken("")
    setUser({})
  };


  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     setLoginStatus(true);
  //   }
  // }, [loginStatus]);
// This return is the HTML for the form that is on our webpage.

  return (
    <div className="userForm">
      {loginStatus ? (
        <button onClick={onLogOut}>Log Out</button>
      ) : (
        <>
          <form
            onSubmit={(e) => {
              onLogin(e);
            }}
          >
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
            <button className="loginbtn" type="submit">Login</button>
          </form>
          {/* {loginMessage.error ? (
            <>
              <h3>{loginMessage.name}</h3>
              <p>{loginMessage.message}</p>
            </>
          ) : null} */}
        </>
      )}
    </div>
  );
};

export default Login;
