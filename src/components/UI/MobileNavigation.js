import React from "react";
import logo from "../../img/netflix-logo-mobile.png";
import avatar from "../../img/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../../store/item";
import { NavLink } from "react-router-dom";

const MobileNavigation = () => {
  const dispatch = useDispatch();
  const offset = useSelector((state) => state.item.offset);

  const openSearchHandler = () => {
    dispatch(itemActions.setSearchToggled(true));
  };

  return (
    <nav
      className={offset === false ? "nav__mobile" : "nav__mobile nav__animated"}
    >
      <div className="nav__mobile--main">
        <div className="nav__mobile--main-logo">
          <img src={logo} alt="Netflix logo" />
        </div>
        <div className="nav__mobile--side">
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={openSearchHandler}
          ></i>
          <div className="nav__mobile--user">
            <img src={avatar} alt="User avatar" />
          </div>
        </div>
      </div>
      <div className="nav__mobile--links">
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
    </nav>
  );
};

export default MobileNavigation;
