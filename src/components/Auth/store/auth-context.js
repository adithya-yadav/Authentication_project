import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLogin: false,
  logIn: (token) => {},
  logOut: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const userIsLogin = !! token;
  const logIn = (token) => {
    setToken(token);
  };
  const logOut = () => {
    setToken(null);
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