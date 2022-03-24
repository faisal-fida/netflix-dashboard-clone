import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/user";
import axios from "axios";
import Cookies from "js-cookie";
import UserAccount from "./UserAccount";
import LoadingSpinner from "../../UI/LoadingSpinner";
import GoToTop from "../../../helpers/goToTop";

const User = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [account, setAccount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState(false);
  const accountId = Cookies.get("accountId");
  const userId = Cookies.get("userId");

  useEffect(() => {
    const getAccount = async () => {
      try {
        setIsLoading(true);

        const decodedLocalId = atob(accountId);

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/v1/accounts/${decodedLocalId}`
        );

        setAccount(response.data.data.account);
        setUsers(response.data.data.account.users);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };

    getAccount();
  }, [accountId]);

  const goToCreateUserHandler = () => {
    dispatch(userActions.setUserId(account._id));
    history.push("/users/create");
  };

  const manageProfilesHandler = () => {
    setEdit((prevState) => !prevState);

    if (edit) {
      dispatch(userActions.setEditUser(false));
    }
  };

  return (
    <>
      {!accountId && <Redirect to="/auth" />}
      {accountId && userId && <Redirect to="/browse" />}
      {accountId && !userId && (
        <div className="user">
          <figure className="auth__logo">
            <img src="/img/netflix-logo.png" alt="netflix logo" />
          </figure>
          {isLoading && (
            <section className="user__list">
              <LoadingSpinner componentClass="user__loader" />
            </section>
          )}
          {!isLoading && (
            <section className="user__list">
              <p className="user__heading">Who's watching?</p>
              <ul
                className={
                  users && users.length === 0 ? "user__empty" : "user__filled"
                }
              >
                {users &&
                  users.map((user) => (
                    <UserAccount key={user._id} user={user} edit={edit} />
                  ))}
                <li className="user__account" onClick={goToCreateUserHandler}>
                  <figure>
                    <i className="fa-solid fa-circle-plus"></i>
                  </figure>
                  <p>Add Profile</p>
                </li>
              </ul>
              {users && users.length > 0 && (
                <div className="user__manage-profiles">
                  <button type="button" onClick={manageProfilesHandler}>
                    {users && users.length === 1
                      ? "Manage Profile"
                      : "Manage Profiles"}
                  </button>
                </div>
              )}
            </section>
          )}
          <GoToTop />
        </div>
      )}
    </>
  );
};

export default User;
