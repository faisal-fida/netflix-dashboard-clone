import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import SelectAvatar from "./SelectAvatar";
import axios from "axios";
import DeleteUserModal from "./DeleteUserModal";

const UpdateUser = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user.editUser);
  const [holder, setHolder] = useState(user.holderName);
  const [avatar, setAvatar] = useState(user.avatar);
  const [openAvatarSelector, setOpenAvatarSelector] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const goBackHandler = () => {
    history.replace("/users");
  };

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
