import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user";
import axios from "axios";
import Cookies from "js-cookie";
import UserAccount from "./UserAccount";
import LoadingSpinner from "../../UI/LoadingSpinner";
import GoToTop from "../../../helpers/goToTop";

const User = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [account, setAccount] = useState({ role: "user" });
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState(false);
  const accountId = Cookies.get("accountId");
  const userId = Cookies.get("userId");
  const loggedInAccount = useSelector((state) => state.user.account);

  useEffect(() => {
    // this conditional will run upon a successful login attempt from the user. It sets the initial
    // data so that the ui is immediately filled
    if (loggedInAccount) {
      setAccount(loggedInAccount);
      setUsers(loggedInAccount.users);
    }

    // this conditional will run if the user has altered the data of the account in any way (create user, update user),
    // or if the user is revisiting the page with an already existing or valid cookie
    if (!loggedInAccount && accountId) {
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
    }
    return;
  }, [loggedInAccount, accountId]);

  const goToCreateUserHandler = () => {
    // setting the account id from the database so that it can be fetched in the create user page
    // and be used to assign the new user to the correct account (client/src/components/Pages/CreateUser)
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
                {loggedInAccount.role !== "guest" && account.role !== "guest" && (
                  <li className="user__account" onClick={goToCreateUserHandler}>
                    <figure>
                      <i className="fa-solid fa-circle-plus"></i>
                    </figure>
                    <p>Add Profile</p>
                  </li>
                )}
              </ul>
              {users &&
                users.length > 0 &&
                loggedInAccount.role !== "guest" &&
                account.role !== "guest" && (
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
