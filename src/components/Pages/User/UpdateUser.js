import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user";
import SelectAvatar from "./SelectAvatar";
import axios from "axios";
import DeleteUserModal from "./DeleteUserModal";

const UpdateUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.editUser);
  const [holder, setHolder] = useState(user.holderName);
  const [avatar, setAvatar] = useState(user.avatar);
  const [openAvatarSelector, setOpenAvatarSelector] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // function for DOM element to return to the users page and also to reroute the user back to the users page
  // when a new user has been created
  const goBackHandler = () => {
    history.replace("/users");
  };

  // setting the state of the holder name on change of input to use in the form when it is submitted
  const updateHolderNameHandler = (e) => {
    setHolder(e.target.value);
  };

  const openAvatarHandler = () => {
    setOpenAvatarSelector((prevState) => !prevState);
  };

  const changeAvatarHandler = (value) => {
    setAvatar(value);
  };

  const openConfirmDelete = () => {
    setDeleteModal((prevState) => !prevState);
  };

  // form that sumbits the updated profile of the current user
  const submitFormHandler = async (e) => {
    e.preventDefault();

    try {
      const formBody = {
        holderName: holder,
        avatar,
      };

      await axios.patch(
        `${process.env.REACT_APP_SERVER}/api/v1/users/${user._id}`,
        formBody
      );

      // resetting the account in redux so that upon returning to the users page the second conditional in the useEffect
      // will be ran to display the most current state of the account
      dispatch(userActions.setAccount(false));

      goBackHandler();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="user">
        <figure className="auth__logo">
          <img src="/img/netflix-logo.png" alt="netflix logo" />
        </figure>
        <form className="user__update" onSubmit={submitFormHandler}>
          <p>Update Profile</p>
          <div className="user__update--main">
            <figure className="user__profile" onClick={openAvatarHandler}>
              <img src={`/img/${avatar}.png`} alt="user" />
            </figure>
            <input
              placeholder="Name"
              defaultValue={user.holderName}
              onChange={updateHolderNameHandler}
            />
          </div>
          <div className="user__btns">
            <button type="submit">Continue</button>
            <button type="button" onClick={goBackHandler}>
              Cancel
            </button>
          </div>
          <p className="user__delete" onClick={openConfirmDelete}>
            Delete Profile
          </p>
        </form>
      </div>
      {deleteModal && <DeleteUserModal user={user} close={openConfirmDelete} />}
      {openAvatarSelector && (
        <SelectAvatar
          changeAvatar={changeAvatarHandler}
          closeAvatar={openAvatarHandler}
        />
      )}
    </>
  );
};

export default UpdateUser;
