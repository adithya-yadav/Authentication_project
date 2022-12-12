import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLogin: false,
  logIn: (token) => {},
  logOut: () => {},
});

export const AuthContextProvider = (props) => {
  const localToken = localStorage.getItem("token")
  const [token, setToken] = useState(localToken);
  
  const userIsLogin = !! token;
  const logIn = (token) => {
    setToken(token);
    localStorage.setItem("token",token)
  };
  const logOut = () => {
    setToken(null);
    localStorage.removeItem("token")
  };
  
  const AuthContextval = {
    token:token,
    isLogin:userIsLogin,
    logIn: logIn,
    logOut: logOut,
  };
  return (
    <>
      <AuthContext.Provider value={AuthContextval}>{props.children}</AuthContext.Provider>
    </>
  );
};

export default AuthContext;