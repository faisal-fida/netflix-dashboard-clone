import React from "react";
import { Redirect } from "react-router-dom";
import AuthForm from "./AuthForm";
import Cookies from "js-cookie";

const Auth = () => {
  const accountCookie = Cookies.get("accountId");

  return (
    <>
      {accountCookie && <Redirect to="/users" />}
      {!accountCookie && (
        <div className="auth">
          <figure className="auth__logo">
            <img src="/img/netflix-logo.png" alt="netflix logo" />
          </figure>
          <AuthForm />
        </div>
      )}
    </>
  );
};

export default Auth;
