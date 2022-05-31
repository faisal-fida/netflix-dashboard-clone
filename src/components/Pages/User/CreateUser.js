import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/user";
import axios from "axios";
import SelectAvatar from "./SelectAvatar";

const CreateUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const nameInputRef = useRef();
  const [avatar, setAvatar] = useState("avatar-1");
  const [openAvatarSelector, setOpenAvatarSelector] = useState(false);

  // function for DOM element to return to the users page and also to reroute the user back to the users page
  // when a new user has been created
  const goToUsersHandler = () => {
    history.replace("/users");
  };

  // form that submits the new user's inputs into the database
  const submitFormHandler = async (e) => {
    e.preventDefault();

    try {
      const name = nameInputRef.current.value;

      // accountOwner key is being fetched from redux where we have stored the account id for the new user to
      // be properly assigned to the correct account
      const formBody = {
        holderName: name,
        accountOwner: userId,
        avatar: avatar,
      };

      await axios.post(
        `${process.env.REACT_APP_SERVER}/api/v1/users`,
        formBody
      );

      // resetting the account in redux so that upon returning to the users page the second conditional in the useEffect
      // will be ran to display the most current state of the account
      dispatch(userActions.setAccount(false));

      goToUsersHandler();
    } catch (err) {
      console.log(err);
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
          <figure className="user__profile" onClick={openAvatarHandler}>
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
