import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/user";
import axios from "axios";
import Cookies from "js-cookie";
import UserAccount from "./UserAccount";
import GoToTop from "../../../helpers/goToTop";

const User = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAccount = async () => {
      try {
        setIsLoading(true);
        const id = Cookies.get("accountId");
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/v1/accounts/${id}`
        );

        setUsers(response.data.data.account.users);
        dispatch(userActions.setUserId(response.data.data.account.id));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    getAccount();
  }, [dispatch]);

  const goToCreateUserHandler = () => {
    history.push("/users/create");
  };

  return (
    <div className="user">
      <figure className="auth__logo">
        <img src="/img/netflix-logo.png" alt="netflix logo" />
      </figure>
      {!isLoading && (
        <section className="user__list">
          <p className="user__heading">Who's watching?</p>
          <ul
            className={
              users && users.length === 0 ? "user__empty" : "user__filled"
            }
          >
            {users &&
              users.map((user) => <UserAccount key={user._id} user={user} />)}
            <li className="user__account" onClick={goToCreateUserHandler}>
              <figure>
                <i className="fa-solid fa-circle-plus"></i>
              </figure>
              <p>Add Profile</p>
            </li>
          </ul>
        </section>
      )}
      <GoToTop />
    </div>
  );
};

export default User;
