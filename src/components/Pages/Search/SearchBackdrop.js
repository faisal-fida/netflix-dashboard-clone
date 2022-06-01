import React from "react";
import { animated, useSpring } from "@react-spring/web";
import { useSelector } from "react-redux";

const SearchBackdrop = () => {
  const toggled = useSelector((state) => state.item.searchToggled);

  const { x } = useSpring({
    x: toggled ? 1 : 0,
  });

  return (
    <animated.div
      className="title__backdrop"
      style={{
        opacity: x.to((x) => `${1 * x}`),
      }}
    ></animated.div>
  );
};

export default SearchBackdrop;
