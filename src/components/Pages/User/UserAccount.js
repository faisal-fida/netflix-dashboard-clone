import React from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/user";
import { useHistory } from "react-router-dom";

const UserAccount = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const selectUserHandler = () => {
    dispatch(userActions.setUser(props.user));
    history.replace("/browse");
  };

  return (
    <li className="user__account" onClick={selectUserHandler}>
      <figure>
        <img src="/img/avatar.png" alt="account" />
      </figure>
      <p>{props.user.holderName}</p>
    </li>
  );
};

export default UserAccount;
