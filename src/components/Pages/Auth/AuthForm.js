import React, { useState, useRef } from "react";
import authFunc from "./authAxios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useDispatch } from "react-redux";
import axios from "axios";
import { userActions } from "../../../store/user";

const AuthForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState("login");
  const [hasError, setHasError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  // Function that handles the form that the user submits to the Firebase server ("firebase.google.com")
  const submitFormHandler = (e) => {
    e.preventDefault();

    // checking to see if the passwords match when a new account is being created. If the conditional fails
    // it will return the statement and render an error on the screen to the user
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

    // sending the user an error if they try to submit an empty form
    if (formBody.email === "" || formBody.password === "") {
      setHasError("Please fill in all fields");
      return;
    }

    // Checking to see if the user is logging in to an already existing account or creating a new one.
    // Each function is calling to a Firebase server to determine which url should be used.
    if (isLogin) {
      authFunc(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API}`,
        formBody,
        history,
        isLogin,
        setHasError,
        setIsLoading,
        dispatch
      );
    } else {
      authFunc(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API}`,
        formBody,
        history,
        isLogin,
        setHasError,
        setIsLoading,
        dispatch
      );
    }
  };

  // Function to change whether the user is logging in or creating an account
  const changeAuthStatus = () => {
    // resetting all fields when the status is changed so that potential errors or previous input fields are removed
    setHasError();
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    setIsLogin((prevState) => !prevState);
  };

  // Function to sign in the user as a guest
  const signInGuestHandler = async () => {
    // Encoding the guest ID we receive from our env file to protect it's credentials and set it as a cookie
    const encodedGuestId = btoa(process.env.REACT_APP_GUEST);
    Cookies.set("accountId", encodedGuestId);

    // Fetch the account from our MongoDB server and set is as the account in our redux store. (client/src/store/user)
    const account = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/v1/accounts/${process.env.REACT_APP_GUEST}`
    );
    dispatch(userActions.setAccount(account.data.data.account));

    history.replace("/users");
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
            aria-label="Email"
            aria-required="true"
            required
            autoComplete="email"
            className="auth__input"
            type="email"
            placeholder="Email"
            ref={emailInputRef}
          />
          <input
            aria-label="Password"
            aria-required="true"
            required
            className="auth__input"
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
          />
          {!isLogin && (
            <input
              aria-label="Confirm password"
              aria-required="true"
              required
              className="auth__input"
              type="password"
              placeholder="Confirm Password"
              ref={confirmPasswordInputRef}
            />
          )}
        </div>
        <div>
          <button type="submit">
            {isLogin && !isLoading && "Sign In"}
            {!isLogin && !isLoading && "Sign Up"}
            {isLoading && <LoadingSpinner componentClass="auth__loader" />}
          </button>
          {isLogin && (
            <button
              type="button"
              className="auth__guest"
              onClick={signInGuestHandler}
            >
              Continue as Guest
            </button>
          )}
        </div>
      </section>
      <p tabIndex="0" className="auth__account-status">
        {isLogin ? "New to Netflix?" : "Already have an account?"}{" "}
        <span role="link" tabIndex="0" onClick={changeAuthStatus}>
          {isLogin ? "Sign up now." : "Login now."}
        </span>
      </p>
    </form>
  );
};

export default AuthForm;
