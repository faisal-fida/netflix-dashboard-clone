import React from "react";
import AuthForm from "./AuthForm";

const Auth = () => {
  return (
    <div className="auth">
      <figure className="auth__logo">
        <img src="/img/netflix-logo.png" alt="netflix logo" />
      </figure>
      <AuthForm />
    </div>
  );
};

export default Auth;
