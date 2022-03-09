import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../../store/item";

const RowItem = (props) => {
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.item);

  const getDetailsHandler = () => {
    if (!item) {
      dispatch(itemActions.setItem(props.item));
      document.title = `${
        props.item.title ? props.item.title : props.item.name
      } - Netflix`;

      setTimeout(() => {
        dispatch(itemActions.setToggled(true));
      }, 350);
    } else {
      dispatch(itemActions.setSimilar(props.item));

      setTimeout(() => {
        dispatch(itemActions.setSimilarToggled(true));
      }, 350);
    }
  };

  return (
    <li className="row__list--item" onClick={getDetailsHandler}>
      <div className="row__list--item-img">
        <img
          src={`https://image.tmdb.org/t/p/w300${props.item.poster_path}`}
          alt={props.item.name}
        />
      </div>
    </li>
  );
};

export default RowItem;
