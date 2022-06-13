import React from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/user";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const UserAccount = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const selectUserHandler = () => {
    if (!props.edit) {
      const encodedUserId = btoa(props.user._id);
      Cookies.set("userId", encodedUserId, { expires: (1 / 24) * 2 });
      history.replace("/browse");
    } else if (props.edit) {
      dispatch(userActions.setEditUser(props.user));
      history.replace("/users/update");
    }
  };

  return (
    <li
      tabIndex="0"
      role="link"
      className="user__account"
      onClick={selectUserHandler}
    >
      <figure>
        <img src={`/img/${props.user.avatar}.png`} alt="account" />
        {props.edit && (
          <div>
            <i
              role="button"
              tabIndex="0"
              aria-label={`Edit ${props.user.holderName}'s Account`}
              className="fa-solid fa-pencil"
            ></i>
          </div>
        )}
      </figure>
      <p>{props.user.holderName}</p>
    </li>
  );
};

export default UserAccount;
