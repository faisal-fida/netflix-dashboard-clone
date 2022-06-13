import React from "react";

const Button = (props) => {
  return (
    <button
      aria-label={props.label}
      aria-expanded={props.expanded}
      tabIndex={props.tabIndex}
      className={props.btnClass}
      onClick={props.onClick}
    >
      <span>
        <i className={props.icon}></i>
      </span>
      {props.name}
    </button>
  );
};

export default Button;
