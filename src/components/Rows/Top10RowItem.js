import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../../store/item";

const Top10RowItem = (props) => {
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.item);

  const getDetailsHandler = () => {
    dispatch(itemActions.setItem(props.title));

    setTimeout(() => {
      dispatch(itemActions.setToggled(true));
    }, 350);
  };

  return (
    <button
      tabIndex={item ? "-1" : "0"}
      key={props.title.id}
      className="row__list--item row__list--item-container"
      aria-expanded={item ? "true" : "false"}
      onClick={getDetailsHandler}
    >
      <div className="row__list--item-top">
        <p>{props.i + 1}</p>
      </div>
      <div className="row__list--item-img">
        <img
          src={`https://image.tmdb.org/t/p/w300${props.title.poster_path}`}
          alt={props.title.title ? props.title.title : props.title.name}
        />
      </div>
    </button>
  );
};

export default Top10RowItem;
