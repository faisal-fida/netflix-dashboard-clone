import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../../store/item";
import { NavLink } from "react-router-dom";
import { animated, useSpring } from "@react-spring/web";

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 0) {
      dispatch(itemActions.setYOffset(window.pageYOffset));
    } else if (window.pageYOffset === 0) {
      dispatch(itemActions.setYOffset(window.pageYOffset));
    }
  });

  const offset = useSelector((state) => state.item.offset);

  const { x } = useSpring({
    x: offset > 0 ? 1 : 0,
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
        </ul>
      </div>
      <div className="nav__user">
        <img src={`/img/${user.avatar}.png`} alt="User avatar" />
      </div>
    </animated.nav>
  );
};

export default Navigation;
