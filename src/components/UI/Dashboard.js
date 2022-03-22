import React, { useEffect, Fragment } from "react";
import GoToTop from "../../helpers/goToTop";
import Search from "../Pages/Search/Search";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const id = Cookies.get("userId");

  useEffect(() => {
    if (id) {
      const getAccount = async () => {
        try {
          const decodedUserId = atob(id);
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER}/api/v1/users/${decodedUserId}`
          );

          dispatch(userActions.setUser(response.data.data.user));
        } catch (err) {
          console.log(err);
        }
      };
      getAccount();
    }
  }, [dispatch, id]);

  return (
    <Fragment>
      <div className="dashboard">{props.children}</div>
      <Search />
      <GoToTop />
    </Fragment>
  );
};

export default Dashboard;
