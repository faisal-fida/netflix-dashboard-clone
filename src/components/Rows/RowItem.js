import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { itemActions } from "../../store/item";

const RowItem = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const getDetailsHandler = () => {
    localStorage.setItem("item", JSON.stringify(props.item));
    dispatch(itemActions.addItem(props.item));
    history.push(`/browse/${props.item.id}`);
  };

  return (
    <li className="row__list--item" onClick={getDetailsHandler}>
      <div className="row__list--item-img">
        <img
          src={`https://image.tmdb.org/t/p/w500${props.item.poster_path}`}
          alt={props.item.name}
        />
      </div>
    </li>
  );
};

export default RowItem;
