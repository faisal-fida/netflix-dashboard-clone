import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../../../store/item";

const SearchListItem = (props) => {
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
    <li className="search__list--item" onClick={getDetailsHandler}>
      <img
        src={`https://image.tmdb.org/t/p/w300${props.item.poster_path}`}
        alt={`${props.item.name} poster`}
      />
    </li>
  );
};

export default SearchListItem;
