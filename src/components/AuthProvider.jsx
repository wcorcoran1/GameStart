import AuthContext from "../authContext";
import React, { useState, useEffect } from "react";
import { getGames, getUserProfile, getPlatforms, getCartbyUserId } from "../api";
import { getHardwares } from "../api/hardware";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [gamesList, setGamesList] = useState([]);
  const [hardwareList, setHardwareList] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginMessage, setLoginMessage] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [platforms, setPlatforms] = useState();
  const [userCart, setUserCart] = useState([]);


  // useEffect(() => {
  //   async function getUser() {
  //     if (localStorage.getItem("token")) {
  //       console.log(token)
  //       const userProfile = await getUserProfile(token);
  //       console.log("AUTH", userProfile);
  //       setToken(localStorage.getItem("token"));
  //       setLoginStatus(true);
  //       setUser(userProfile);
  //     }
  //   }
  //   getUser();
  // }, [token]);

  useEffect(() => {
    const getGamesList = async () => {
      const gameList = await getGames();
      console.log(gameList, "GAMELIST");
      setGamesList(gameList);
    };
    getGamesList();

    const getHardwareList = async () => {
      const hardwareList = await getHardwares();
      console.log(hardwareList, "GAMELIST");
      setHardwareList(hardwareList);
    };
    getHardwareList();

    const fetchPlatforms = async () => {
      const data = await getPlatforms();
      console.log("PLatForms", data);
      setPlatforms(data);
    };
    fetchPlatforms();

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        gamesList,
        setGamesList,
        platforms,
        setPlatforms,
        hardwareList,
        setHardwareList,
        username,
        setUsername,
        password,
        setPassword,
        loginStatus,
        setLoginStatus,
        loginMessage,
        setLoginMessage,
        email,
        setEmail,
        name,
        setName,
        userCart,
        setUserCart
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
