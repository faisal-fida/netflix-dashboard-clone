import React from "react";
import { useDispatch } from "react-redux";
import { itemActions } from "../../store/item";

const Top10RowItem = (props) => {
  const dispatch = useDispatch();

  const getDetailsHandler = () => {
    dispatch(itemActions.setItem(props.title));
    dispatch(itemActions.setToggled(true));
  };

  return (
    <li
      key={props.title.id}
      className="row__list--item row__list--item-container"
      onClick={getDetailsHandler}
    >
      <div className="row__list--item-top">
        <p>{props.i + 1}</p>
      </div>
      <div className="row__list--item-img">
        <img
          src={`https://image.tmdb.org/t/p/w300${props.title.poster_path}`}
          alt={props.title.name}
        />
      </div>
    </li>
  );
};

export default Top10RowItem;
