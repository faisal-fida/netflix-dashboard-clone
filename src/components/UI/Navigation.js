import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { animated, useSpring } from "@react-spring/web";
import useScrollPosition from "../../helpers/useScrollPosition";
import { itemActions } from "../../store/item";

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { searchToggled, item } = useSelector((state) => state.item);

  const scrollPosition = useScrollPosition();

  const { x } = useSpring({
    x: scrollPosition > 0 ? 1 : 0,
  });

  // sets search toggled state to true when the user clicks the search icon
  const openSearchHandler = () => {
    dispatch(itemActions.setSearchToggled(true));
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
        <i
          role="button"
          aria-label="Search movies or tv shows"
          tabIndex={searchToggled || item ? "-1" : "0"}
          aria-expanded={searchToggled ? "true" : "false"}
          className="fa-solid fa-magnifying-glass"
          onClick={openSearchHandler}
        ></i>
        <div className="nav__user">
          <img src={`/img/${user.avatar}.png`} alt="User avatar" />
        </div>
      </nav>
    </animated.header>
  );
};

export default Navigation;
