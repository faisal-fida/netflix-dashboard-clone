import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { itemActions } from "../../store/item";
import GoToTop from "../../helpers/goToTop";

const Dashboard = (props) => {
  const dispatch = useDispatch();

  window.addEventListener("scroll", () => {
    dispatch(itemActions.setYOffset(window.pageYOffset));
  });

  return (
    <Fragment>
      <div className="dashboard">{props.children}</div>
      <GoToTop />
    </Fragment>
  );
};

export default Dashboard;
