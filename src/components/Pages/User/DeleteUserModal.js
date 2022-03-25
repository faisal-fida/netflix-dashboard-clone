import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const DeleteUserModal = (props) => {
  const history = useHistory();

  const deleteUserHandler = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/v1/users/${props.user._id}`
      );

      history.replace("/users");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="user__delete--container">
      <div className="user__delete--modal">
        <p>Are you sure you want to delete your account?</p>
        <div className="user__btns">
          <button onClick={deleteUserHandler}>Delete</button>
          <button onClick={props.close}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
