import { useContext, useRef, useState } from "react";

import classes from "./AuthForm.module.css";
import AuthContext from "./store/auth-context";

const AuthForm = () => {
  const ctx = useContext(AuthContext)
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [request, setRequest] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setRequest(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCasb3yIci0sDna1vR6qKDTRJ_mb3Ihq1w";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCasb3yIci0sDna1vR6qKDTRJ_mb3Ihq1w";
    }

    try {
      const responese = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      setRequest(false);
      if (responese.ok) {
        const data = await responese.json();
        ctx.logIn(data.idToken)
      } else {
        const data = await responese.json();
        let errorMessage = "Authentication fail";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage)
      }
    } catch (error) {
      alert(error.message)
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
          {!request && <button>{isLogin ? "Login" : "Create Account"}</button>}
          {request && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
