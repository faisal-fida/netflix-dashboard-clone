import React, { useState, useRef } from "react";
import axios from "axios";
import authFunc from "./authAxios";
import { useHistory } from "react-router-dom";

const AuthForm = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState("login");
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (
      !isLogin &&
      passwordInputRef.current.value !== confirmPasswordInputRef.current.value
    ) {
      console.log("passwords dont match");
      return;
    }

    const formBody = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    if (isLogin) {
      authFunc(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API}`,
        formBody,
        axios,
        history,
        isLogin
      );
    } else {
      authFunc(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API}`,
        formBody,
        axios,
        history,
        isLogin
      );
    }
  };

  const changeAuthStatus = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <form className="auth__form" onSubmit={submitFormHandler}>
      <section>
        {isLogin && <p>Sign In</p>}
        {!isLogin && <p>Create Account</p>}
        <div>
          <input
            className="auth__input"
            type="text"
            placeholder="Email"
            ref={emailInputRef}
          />
          <input
            className="auth__input"
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
          />
          {!isLogin && (
            <input
              className="auth__input"
              type="password"
              placeholder="Confirm Password"
              ref={confirmPasswordInputRef}
            />
          )}
        </div>
        <button type="submit">{isLogin ? "Sign In" : "Sign Up"}</button>
      </section>
      <p className="auth__account-status">
        {isLogin ? "New to Netflix?" : "Already have an account?"}{" "}
        <span onClick={changeAuthStatus}>
          {isLogin ? "Sign up now." : "Login now."}
        </span>
      </p>
    </form>
  );
};

export default AuthForm;
