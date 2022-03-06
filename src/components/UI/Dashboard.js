import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../../store/item";
import GoToTop from "../../helpers/goToTop";
import Search from "../Pages/Search/Search";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const offset = useSelector((state) => state.item.offset);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 0 && window.pageYOffset < 2 && offset === false) {
      dispatch(itemActions.setYOffset(true));
    } else if (window.pageYOffset === 0 && offset === true) {
      dispatch(itemActions.setYOffset(false));
    }
  });

  return (
    <Fragment>
      <div className="dashboard">{props.children}</div>
      <Search />
      <GoToTop />
    </Fragment>
  );
};

export default Dashboard;
