import React from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/user";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const UserAccount = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const selectUserHandler = () => {
    const encodedUserId = btoa(props.user._id);
    Cookies.set("userId", encodedUserId, { expires: (1 / 24) * 2 });
    dispatch(userActions.setUser(props.user));
    history.replace("/browse");
  };

  return (
    <li className="user__account" onClick={selectUserHandler}>
      <figure>
        <img src={`/img/${props.user.avatar}.png`} alt="account" />
      </figure>
      <p>{props.user.holderName}</p>
    </li>
  );
};

export default UserAccount;
