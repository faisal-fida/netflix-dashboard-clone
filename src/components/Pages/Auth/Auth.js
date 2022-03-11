import React from "react";
import netflixLogo from "../../../img/netflix-logo.png";
import AuthForm from "./AuthForm";

const Auth = () => {
  return (
    <div className="auth">
      <figure className="auth__logo">
        <img src={netflixLogo} alt="netflix logo" />
      </figure>
      <AuthForm />
    </div>
  );
};

export default Auth;
