import React from "react";
import Button from "./Button";

const ButtonContainer = () => {
  return (
    <div className="attention__backdrop--info-btn">
      <Button
        btnClass="attention__btn--list"
        name="My List"
        icon="fa-solid fa-plus"
      />
      <Button
        btnClass="attention__btn--play"
        name="Play"
        icon="fa-solid fa-play"
      />
      <Button
        btnClass="attention__btn--info"
        name="More Info"
        icon="fa-solid fa-circle-info"
      />
      <Button
        btnClass="attention__btn--info-mobile"
        name="Info"
        icon="fa-solid fa-circle-info"
      />
    </div>
  );
};

export default ButtonContainer;
