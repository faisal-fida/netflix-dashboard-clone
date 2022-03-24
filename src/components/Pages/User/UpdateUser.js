import React from "react";
import { useHistory } from "react-router-dom";

const UpdateUser = () => {
  const history = useHistory();

  const goBackHandler = () => {
    history.replace("/users");
  };

  return (
    <div className="user">
      <figure className="auth__logo">
        <img src="/img/netflix-logo.png" alt="netflix logo" />
      </figure>
      <form className="user__update">
        <p>Update User</p>
        <div className="user__update--main">
          <figure>
            <img src={`/img/avatar-1.png`} alt="user" />
          </figure>
          <input placeholder="Name" />
        </div>
        <div className="user__btns">
          <button type="submit">Continue</button>
          <button type="button" onClick={goBackHandler}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
