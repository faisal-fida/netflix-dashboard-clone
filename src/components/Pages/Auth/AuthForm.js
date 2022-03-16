import React, { useState, useRef } from "react";
import authFunc from "./authAxios";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../UI/LoadingSpinner";

const AuthForm = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState("login");
  const [hasError, setHasError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (
      !isLogin &&
      passwordInputRef.current.value !== confirmPasswordInputRef.current.value
    ) {
      setHasError("Passwords don't match");
      return;
    }

    const formBody = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      returnSecureToken: true,
    };

    if (formBody.email === "" || formBody.password === "") {
      setHasError("Please fill in all fields");
      return;
    }

    if (isLogin) {
      authFunc(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API}`,
        formBody,
        history,
        isLogin,
        setHasError,
        setIsLoading
      );
    } else {
      authFunc(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API}`,
        formBody,
        history,
        isLogin,
        setHasError,
        setIsLoading
      );
    }
  };

  const changeAuthStatus = () => {
    setHasError();
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    setIsLogin((prevState) => !prevState);
  };

  return (
    <form className="auth__form" onSubmit={submitFormHandler}>
      <section>
        {isLogin && <p>Sign In</p>}
        {!isLogin && <p>Create Account</p>}
        {hasError && (
          <div className="auth__error">
            <strong>{hasError}</strong>
          </div>
        )}
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
        <button type="submit">
          {isLogin && !isLoading && "Sign In"}
          {!isLogin && !isLoading && "Sign Up"}
          {isLoading && <LoadingSpinner componentClass="auth__loader" />}
        </button>
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
