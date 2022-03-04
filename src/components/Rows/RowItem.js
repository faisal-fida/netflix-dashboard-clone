import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../../store/item";

const RowItem = (props) => {
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.item);

  const getDetailsHandler = () => {
    if (!item) {
      dispatch(itemActions.setItem(props.item));
      dispatch(itemActions.setToggled(true));
    } else {
      dispatch(itemActions.setSimilar(props.item));
      dispatch(itemActions.setSimilarToggled(true));
    }
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
