import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../../store/item";
import { NavLink, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const MobileNavigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const openSearchHandler = () => {
    dispatch(itemActions.setSearchToggled(true));
  };

  const logoutTemp = () => {
    Cookies.remove("accountId");
    Cookies.remove("userId");
    history.replace("/");
  };

  return (
    <nav className="nav__mobile">
      <div className="nav__mobile--main">
        <div className="nav__mobile--main-logo">
          <img src="/img/netflix-logo-mobile.png" alt="Netflix logo" />
        </div>
        <div className="nav__mobile--side">
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={openSearchHandler}
          ></i>
          <div className="nav__mobile--user">
            <img
              src={`/img/${user.avatar}.png`}
              alt="User avatar"
              onClick={logoutTemp}
            />
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
