import React, { Fragment } from "react";
import GoToTop from "../../helpers/goToTop";
import Search from "../Pages/Search/Search";

const Dashboard = (props) => {
  return (
    <Fragment>
      <div className="dashboard">{props.children}</div>
      <Search />
      <GoToTop />
    </Fragment>
  );
};

export default Dashboard;
