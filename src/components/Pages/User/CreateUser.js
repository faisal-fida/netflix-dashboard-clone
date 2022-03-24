import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import SelectAvatar from "./SelectAvatar";

const CreateUser = () => {
  const history = useHistory();
  const userId = useSelector((state) => state.user.userId);
  const nameInputRef = useRef();
  const [avatar, setAvatar] = useState("avatar-1");
  const [openAvatarSelector, setOpenAvatarSelector] = useState(false);

  const goToUsersHandler = () => {
    history.replace("/users");
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      const name = nameInputRef.current.value;

      const formBody = {
        holderName: name,
        accountOwner: userId,
        avatar: avatar,
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

  const openAvatarHandler = () => {
    setOpenAvatarSelector((prevState) => !prevState);
  };

  const changeAvatarHandler = (value) => {
    setAvatar(value);
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
          <figure onClick={openAvatarHandler}>
            <img src={`/img/${avatar}.png`} alt="avatar" />
          </figure>
          <input placeholder="Name" ref={nameInputRef} />
        </div>
        <div className="user__btns">
          <button type="submit">Continue</button>
          <button type="button" onClick={goToUsersHandler}>
            Cancel
          </button>
        </div>
      </form>
      {openAvatarSelector && (
        <SelectAvatar
          changeAvatar={changeAvatarHandler}
          closeAvatar={openAvatarHandler}
        />
      )}
    </div>
  );
};

export default CreateUser;
