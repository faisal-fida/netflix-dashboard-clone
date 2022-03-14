import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const CreateUser = () => {
  const history = useHistory();
  const userId = useSelector((state) => state.user.userId);
  const nameInputRef = useRef();

  const goToUsersHandler = () => {
    history.goBack();
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      const name = nameInputRef.current.value;

      const formBody = {
        holderName: name,
        accountOwner: userId,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/v1/users`,
        formBody
      );

      return response;
    } catch (err) {
      console.log(err);
    } finally {
      goToUsersHandler();
    }
  };

  return (
    <div className="user">
      <figure className="auth__logo">
        <img src="/img/netflix-logo.png" alt="netflix logo" />
      </figure>
      <form className="user__create" onSubmit={submitFormHandler}>
        <div className="user__desc">
          <p>Add Profile</p>
          <p>Add a profile for another person watching Netflix.</p>
        </div>
        <div className="user__details">
          <figure>
            <img src="/img/avatar.png" alt="avatar" />
          </figure>
          <input placeholder="Name" ref={nameInputRef} />
        </div>
        <div>
          <button type="submit">Continue</button>
          <button type="button" onClick={goToUsersHandler}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
