import React from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { itemActions } from "../../../../../store/item";

const ButtonContainer = (props) => {
  const dispatch = useDispatch();

  const openAttentionHandler = () => {
    dispatch(itemActions.setItem(props.item));
    dispatch(itemActions.setToggled(true));
  };

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
        onClick={openAttentionHandler}
        btnClass="attention__btn--info"
        name="More Info"
        icon="fa-solid fa-circle-info"
      />
      <Button
        onClick={openAttentionHandler}
        btnClass="attention__btn--info-mobile"
        name="Info"
        icon="fa-solid fa-circle-info"
      />
    </div>
  );
};

export default ButtonContainer;
