import { useContext, useRef } from "react";
import AuthContext from "../Auth/store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const ctx = useContext(AuthContext);
  const passwordRef = useRef();
  const changePasswordHandler = async (e) => {
    e.preventDefault();
    const newPassword = passwordRef.current.value;
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCasb3yIci0sDna1vR6qKDTRJ_mb3Ihq1w",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: ctx.token,
            password: newPassword,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
      } else {
        let message = "Authentication fail";
        if (data.error.message) {
          message = data.error.message;
        }
        throw new Error(message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <form className={classes.form} onSubmit={changePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" ref={passwordRef} id="new-password" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
