import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { animated, useSpring } from "@react-spring/web";
import useScrollPosition from "../../helpers/useScrollPosition";
import { itemActions } from "../../store/item";
import Cookies from "js-cookie";

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { searchToggled, item } = useSelector((state) => state.item);
  const [dropdownActive, setDropdownActive] = useState(false);
  const scrollPosition = useScrollPosition();

  const { x } = useSpring({
    x: scrollPosition > 0 ? 1 : 0,
  });

  // sets search toggled state to true when the user clicks the search icon
  const openSearchHandler = () => {
    dispatch(itemActions.setSearchToggled(true));
  };

  const openSettingsDropdown = () => {
    setDropdownActive(true);
  };

  const closeSettingsDropdown = () => {
    setDropdownActive(false);
  };

  const goToUsers = () => {
    Cookies.remove("userId");
  };

  const logoutUser = () => {
    Cookies.remove("accountId");
    Cookies.remove("userId");
  };

  return (
    <animated.header
      className="nav"
      style={{ background: x.to((x) => `rgba(0, 0, 0, ${x * 1}`) }}
    >
      <nav aria-label="Main" className="nav__main">
        <div className="nav__main--logo">
          <img src="/img/netflix-logo.png" alt="Netflix logo" />
        </div>
        <ul>
          <NavLink
            tabIndex={searchToggled || item ? "-1" : "0"}
            to="/browse"
            activeClassName="nav__active"
          >
            Home
          </NavLink>
          <NavLink
            tabIndex={searchToggled || item ? "-1" : "0"}
            to="/media/tv"
            activeClassName="nav__active"
          >
            TV Shows
          </NavLink>
          <NavLink
            tabIndex={searchToggled || item ? "-1" : "0"}
            to="/media/movie"
            activeClassName="nav__active"
          >
            Movies
          </NavLink>
          {user && user.list.length > 0 && (
            <NavLink
              tabIndex={searchToggled || item ? "-1" : "0"}
              to="my-list"
              activeClassName="nav__active"
            >
              My List
            </NavLink>
          )}
        </ul>
      </nav>
      <nav aria-label="Secondary" className="nav__right">
        <button
          onClick={openSearchHandler}
          tabIndex={searchToggled || item ? "-1" : "0"}
          aria-expanded={searchToggled ? "true" : "false"}
        >
          <i
            className="fa-solid fa-magnifying-glass"
            aria-label="Search movies or tv shows"
          ></i>
        </button>
        <div className="nav__settings">
          <button className="nav__user" onMouseDown={openSettingsDropdown}>
            <img src={`/img/${user.avatar}.png`} alt="User avatar" />
          </button>
          {dropdownActive && (
            <ul className="nav__dropdown" onMouseLeave={closeSettingsDropdown}>
              <p>{user.holderName}</p>
              <NavLink onClick={goToUsers} to="users">
                Change Profiles
              </NavLink>
              <NavLink onClick={logoutUser} to="auth">
                Log Out
              </NavLink>
            </ul>
          )}
        </div>
      </nav>
    </animated.header>
  );
};

export default Navigation;
