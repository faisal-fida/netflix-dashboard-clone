import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user";

const TitleLayout = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const addToListHandler = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER}/api/v1/users/${user._id}`,
        { list: props.item }
      );

      dispatch(userActions.setUser(response.data.data.user));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="title__container">
      <section className="title__main">
        <div className="title__main--desktop">
          <div className="title__main--backdrop">
            <div className="title__close" onClick={props.close}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <figure className="title__figure">
            <div className="title__close" onClick={props.close}>
              <i className="fa-solid fa-xmark"></i>
            </div>
            <img
              src={`https://image.tmdb.org/t/p/original${props.item.backdrop_path}`}
              alt="test"
            />
          </figure>
          <section className="title__info">
            {props.item.title && <h2>{props.item.title}</h2>}
            {props.item.name && <h2>{props.item.name}</h2>}
            {props.item.release_date && (
              <div className="title__details">
                <p>{props.releaseDate}</p>
              </div>
            )}
            <ul className="title__list--desktop">
              <li>
                <button>
                  <i className="fa-solid fa-play"></i>
                  Play
                </button>
              </li>
              <li onClick={addToListHandler}>
                <i className="fa-solid fa-plus title__badge"></i>
              </li>
              <li>
                <i className="fa-regular fa-thumbs-up title__badge"></i>
              </li>
              <li>
                <i className="fa-regular fa-thumbs-down title__badge"></i>
              </li>
            </ul>
            <div className="title__btn">
              <button className="title__btn--play">
                <i className="fa-solid fa-play"></i>
                Play
              </button>
              <button className="title__btn--download">
                <i className="fa-solid fa-arrow-down"></i>
                Download
              </button>
            </div>
            <p className="title__desc--mobile">{props.item.overview}</p>
            <ul className="title__mobile-cta">
              <li onClick={addToListHandler}>
                <i className="fa-solid fa-plus"></i>
                <p>My List</p>
              </li>
              <li>
                <i className="fa-regular fa-thumbs-up"></i>
                <p>Rate</p>
              </li>
              <li>
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
          <p className="title__desc">{props.item.overview}</p>
        </div>
      </section>
      {props.children}
    </div>
  );
};

export default TitleLayout;
