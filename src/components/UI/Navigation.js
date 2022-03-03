import React from "react";
import logo from "../../img/netflix-logo.png";
import avatar from "../../img/avatar.png";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const offset = useSelector((state) => state.item.offset);

  return (
    <nav className={offset === 0 ? "nav" : "nav nav__animated"}>
      <div className="nav__main">
        <div className="nav__main--logo">
          <img src={logo} alt="Netflix logo" />
        </div>
        <ul>
          <NavLink to="/browse" activeClassName="nav__active">
            Home
          </NavLink>
          <NavLink to="/media/tv" activeClassName="nav__active">
            TV Shows
          </NavLink>
          <NavLink to="/media/movie" activeClassName="nav__active">
            Movies
          </NavLink>
        </ul>
      </div>
      <div className="nav__user">
        <img src={avatar} alt="User avatar" />
      </div>
    </nav>
  );
};

export default Navigation;
