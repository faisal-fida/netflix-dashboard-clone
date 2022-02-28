import React from "react";
import { useDispatch } from "react-redux";
import { itemActions } from "../store/item";

const Dashboard = (props) => {
  const dispatch = useDispatch();

  window.addEventListener("scroll", () => {
    dispatch(itemActions.setYOffset(window.pageYOffset));
  });

  return <div className="dashboard">{props.children}</div>;
};

export default Dashboard;
