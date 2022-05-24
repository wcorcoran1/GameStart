import { useContext } from "react";
import AuthContext from "../authContext";

const useAuth = () => {
  const {
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
    name,
    setName,
    email,
    setEmail,
    userCart,
    setUserCart
  } = useContext(AuthContext);

  return {
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
    name,
    setName,
    email,
    setEmail,
    userCart, 
    setUserCart
  };
};

export default useAuth;
