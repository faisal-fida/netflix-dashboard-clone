import React, { Fragment, useEffect } from "react";
import GoToTop from "../../helpers/goToTop";
import Search from "../Pages/Search/Search";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  // This will go in the user selection page
  useEffect(() => {
    const getAccount = async () => {
      const id = Cookies.get("accountId");
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/accounts/${id}`
        );

        dispatch(userActions.setUser(response.data.data.account));
      } catch (err) {
        console.log(err);
      }
    };
    getAccount();
  }, [dispatch]);

  return (
    <Fragment>
      <div className="dashboard">{props.children}</div>
      <Search />
      <GoToTop />
    </Fragment>
  );
};

export default Dashboard;
