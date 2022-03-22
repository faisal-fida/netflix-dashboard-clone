import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user";
import axios from "axios";

const SimilarItem = (props) => {
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
    <li className="title__similar--desktop">
      <figure>
        <img
          src={`https://image.tmdb.org/t/p/w300${props.item.backdrop_path}`}
          alt={props.item.title}
        />
      </figure>
      <section>
        <div>
          {props.item.title && <h2>{props.item.title}</h2>}
          {props.item.name && <h2>{props.item.name}</h2>}
          {props.item.release_date && (
            <p>{props.item.release_date.split("-")[0]}</p>
          )}
        </div>
        {!onList && (
          <i className="fa-solid fa-plus" onClick={addToListHandler}></i>
        )}
        {onList && (
          <i className="fa-solid fa-check" onClick={addToListHandler}></i>
        )}
      </section>
      <p className="title__similar--desktop-desc">{props.item.overview}</p>
    </li>
  );
};

export default SimilarItem;
