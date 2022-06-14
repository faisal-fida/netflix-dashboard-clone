import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user";

const TitleLayout = (props) => {
  const dispatch = useDispatch();
  const [onList, setOnList] = useState(false);
  const user = useSelector((state) => state.user.user);

  // checking to see if the user has this title in their list to appropriately correspond the correct icon (check for already added, plus to add)
  useEffect(() => {
    if (user) {
      const match = user.list.find((item) => item.id === props.item.id);

      // if match is true, the "onList" value will be used as a conditional to render the proper icon to the user
      if (match) {
        setOnList(true);
      } else {
        setOnList(false);
      }
    }
  }, [props.item.id, user.list, user]);

  // function for adding or removing title from user list
  const addToListHandler = async () => {
    try {
      // if not on list a request will be made to the server to add the title
      if (!onList) {
        const response = await axios.patch(
          `${process.env.REACT_APP_SERVER}/api/v1/users/${user._id}`,
          { list: props.item }
        );

        // redux will be reset to the most current display for best UX
        dispatch(userActions.setUser(response.data.data.user));

        // if on list a request will be made to the server to remove the title from the users list
      } else if (onList) {
        const response = await axios.patch(
          `${process.env.REACT_APP_SERVER}/api/v1/users/${user._id}`,
          { listId: props.item.id }
        );

        // redux will be reset to the most current display for best UX
        dispatch(userActions.setUser(response.data.data.user));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="title__container">
      <section className="title__main">
        <div className="title__main--desktop">
          <figure className="title__figure">
            <button className="title__close" onClick={props.close}>
              <i
                aria-label={`${
                  props.item.title
                    ? `Close ${props.item.title} details page`
                    : `Close ${props.item.name} details page`
                }`}
                className="fa-solid fa-xmark"
              ></i>
            </button>
            <img
              src={`https://image.tmdb.org/t/p/original${props.item.backdrop_path}`}
              alt={`${props.item.title} cover`}
            />
          </figure>
          <section className="title__info">
            {props.item.title && <h2 tabIndex="0">{props.item.title}</h2>}
            {props.item.name && <h2 tabIndex="0">{props.item.name}</h2>}
            {props.item.release_date && (
              <div className="title__details">
                <p>{props.releaseDate}</p>
              </div>
            )}
            <ul className="title__list--desktop">
              <li>
                <button>
                  <i
                    aria-label={`Play ${props.item.title}`}
                    className="fa-solid fa-play"
                  ></i>
                  Play
                </button>
              </li>
              {!onList && (
                <li
                  role="button"
                  tabIndex="0"
                  aria-label="Add to list"
                  onClick={addToListHandler}
                >
                  <i className="fa-solid fa-plus title__badge"></i>
                </li>
              )}
              {onList && (
                <li
                  role="button"
                  tabIndex="0"
                  aria-label="Remove from list"
                  onClick={addToListHandler}
                >
                  <i className="fa-solid fa-check title__badge"></i>
                </li>
              )}
              <li role="button" tabIndex="0" aria-label="Rate title: Thumbs up">
                <i className="fa-regular fa-thumbs-up title__badge"></i>
              </li>
              <li
                role="button"
                tabIndex="0"
                aria-label="Rate title: Thumbs down"
              >
                <i className="fa-regular fa-thumbs-down title__badge"></i>
              </li>
            </ul>
            <div className="title__btn">
              <button className="title__btn--play">
                <i
                  aria-label={`Play ${props.item.title}`}
                  className="fa-solid fa-play"
                ></i>
                Play
              </button>
              <button className="title__btn--download">
                <i
                  aria-label={`Download ${props.item.title} to play later`}
                  className="fa-solid fa-arrow-down"
                ></i>
                Download
              </button>
            </div>
            <p className="title__desc--mobile">{props.item.overview}</p>
            <ul className="title__mobile-cta">
              {!onList && (
                <li
                  role="button"
                  tabIndex="0"
                  aria-label="Add to list"
                  onClick={addToListHandler}
                >
                  <i className="fa-solid fa-plus"></i>
                  <p>My List</p>
                </li>
              )}
              {onList && (
                <li
                  role="button"
                  tabIndex="0"
                  aria-label="Remove from list"
                  onClick={addToListHandler}
                >
                  <i className="fa-solid fa-check"></i>
                  <p>My List</p>
                </li>
              )}
              <li role="button" tabIndex="0" aria-label="Rate title: Thumbs up">
                <i className="fa-regular fa-thumbs-up"></i>
                <p>Rate</p>
              </li>
              <li role="button" tabIndex="0">
                <i className="fa-regular fa-paper-plane"></i>
                <p>Share</p>
              </li>
            </ul>
          </section>
        </div>
        <div className="title__info--desktop">
          {props.item.release_date && (
            <div className="title__details--desktop">
              <p>{props.releaseDate}</p>
            </div>
          )}
          <p tabIndex="0" className="title__desc">
            {props.item.overview}
          </p>
        </div>
      </section>
      {props.children}
    </div>
  );
};

export default TitleLayout;
