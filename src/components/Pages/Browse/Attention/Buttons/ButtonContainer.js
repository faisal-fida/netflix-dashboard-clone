import React, { useState, useEffect } from "react";
import Button from "./Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../../../../../store/item";
import { userActions } from "../../../../../store/user";

const ButtonContainer = (props) => {
  const dispatch = useDispatch();
  const [onList, setOnList] = useState(false);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      const match = user.list.find((item) => item.id === props.item.id);

      if (match) {
        setOnList(true);
      } else {
        setOnList(false);
      }
    }
  }, [props.item.id, user.list, user]);

  const openAttentionHandler = () => {
    dispatch(itemActions.setItem(props.item));
    document.title = `${
      props.item.title ? props.item.title : props.item.name
    } - Netflix`;

    setTimeout(() => {
      dispatch(itemActions.setToggled(true));
    }, 350);
  };

  const addToListHandler = async () => {
    try {
      if (!onList) {
        const response = await axios.patch(
          `${process.env.REACT_APP_SERVER}/api/v1/users/${user._id}`,
          { list: props.item }
        );

        dispatch(userActions.setUser(response.data.data.user));
      } else if (onList) {
        const response = await axios.patch(
          `${process.env.REACT_APP_SERVER}/api/v1/users/${user._id}`,
          { listId: props.item.id }
        );

        dispatch(userActions.setUser(response.data.data.user));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="attention__backdrop--info-btn">
      {!onList && (
        <Button
          onClick={addToListHandler}
          btnClass="attention__btn--list"
          name="My List"
          icon="fa-solid fa-plus"
        />
      )}
      {onList && (
        <Button
          onClick={addToListHandler}
          btnClass="attention__btn--list"
          name="My List"
          icon="fa-solid fa-check"
        />
      )}
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
