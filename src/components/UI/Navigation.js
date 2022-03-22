import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { animated, useSpring } from "@react-spring/web";
import useScrollPosition from "../../helpers/useScrollPosition";

const Navigation = () => {
  const user = useSelector((state) => state.user.user);

  const scrollPosition = useScrollPosition();

  const { x } = useSpring({
    x: scrollPosition > 0 ? 1 : 0,
  });

  return (
    <animated.nav
      className="nav"
      style={{ background: x.to((x) => `rgba(0, 0, 0, ${x * 1}`) }}
    >
      <div className="nav__main">
        <div className="nav__main--logo">
          <img src="/img/netflix-logo.png" alt="Netflix logo" />
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
          {user && user.list.length > 0 && (
            <NavLink to="my-list" activeClassName="nav__active">
              My List
            </NavLink>
          )}
        </ul>
      </div>
      <div className="nav__user">
        <img src={`/img/${user.avatar}.png`} alt="User avatar" />
      </div>
    </animated.nav>
  );
};

export default Navigation;
