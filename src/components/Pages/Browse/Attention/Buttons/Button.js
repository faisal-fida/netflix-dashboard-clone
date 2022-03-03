import React from "react";

const Button = (props) => {
  return (
    <button className={props.btnClass}>
      <span>
        <i className={props.icon}></i>
      </span>
      {props.name}
    </button>
  );
};

export default Button;
