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
  const title = useSelector((state) => state.item.item);
  const searchToggled = useSelector((state) => state.item.searchToggled);

  // checks to see if the attention item is already added to the users list
  // if it is it will be presented with a check icon. if not will be presented with an add icon
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

  // Function that sets the selected title in redux for when the user wants to see more details about the title
  // Sets the document title as the title name
  const openAttentionHandler = () => {
    dispatch(itemActions.setItem(props.item));
    document.title = `${
      props.item.title ? props.item.title : props.item.name
    } - Netflix`;

    // waits 350ms to set toggled to true so that the animation for the backdrop will run and appear visually smoother to the user
    setTimeout(() => {
      dispatch(itemActions.setToggled(true));
    }, 350);
  };

  const addToListHandler = async () => {
    try {
      // if item isn't on list, the server will get a request for an update to add the item to the users list
      if (!onList) {
        const response = await axios.patch(
          `${process.env.REACT_APP_SERVER}/api/v1/users/${user._id}`,
          { list: props.item }
        );

        // after the item has been added to the list, the user will be updated in redux to show the most current data
        dispatch(userActions.setUser(response.data.data.user));

        // if item is on list, the server will get a request to remove the item from the users list
      } else if (onList) {
        const response = await axios.patch(
          `${process.env.REACT_APP_SERVER}/api/v1/users/${user._id}`,
          { listId: props.item.id }
        );

        // after the item has been removed from the list, the user will be updated in redux to show the most current data
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
          label="Add to list"
          icon="fa-solid fa-plus"
          tabIndex={searchToggled || title ? "-1" : "0"}
        />
      )}
      {onList && (
        <Button
          onClick={addToListHandler}
          btnClass="attention__btn--list"
          name="My List"
          label="Remove from list"
          icon="fa-solid fa-check"
          tabIndex={searchToggled || title ? "-1" : "0"}
        />
      )}
      <Button
        btnClass="attention__btn--play"
        name="Play"
        label={`Play ${props.item.original_title}`}
        icon="fa-solid fa-play"
        tabIndex={searchToggled || title ? "-1" : "0"}
      />
      <Button
        onClick={openAttentionHandler}
        btnClass="attention__btn--info"
        name="More Info"
        label={`More info about ${props.item.original_title}`}
        expanded={title ? "true" : "false"}
        icon="fa-solid fa-circle-info"
        tabIndex={searchToggled || title ? "-1" : "0"}
      />
      <Button
        onClick={openAttentionHandler}
        btnClass="attention__btn--info-mobile"
        name="Info"
        expanded={title ? "true" : "false"}
        icon="fa-solid fa-circle-info"
        tabIndex={searchToggled || title ? "-1" : "0"}
      />
    </div>
  );
};

export default ButtonContainer;
