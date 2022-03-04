import React, { useState, useEffect, Fragment } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { itemActions } from "../../../store/item";
import getGenres from "../../../helpers/getGenres";
import Row from "../../Rows/Row";

const Title = () => {
  const [genres, setGenres] = useState();
  const { item } = useSelector((state) => state.item);
  const dispatch = useDispatch();
  const toggled = useSelector((state) => state.item.toggled);
  console.log(item.genre_ids);

  useEffect(() => {
    getGenres(setGenres);
  }, []);

  let genre;
  if (item.genre_ids && genres) {
    genre = item.genre_ids.map((id) => genres.find((genre) => genre.id === id));
  }

  const { x } = useSpring({
    x: toggled ? 0 : 100,
  });

  const closePageHandler = () => {
    dispatch(itemActions.setToggled(false));

    setTimeout(() => {
      dispatch(itemActions.setItem({}));
    }, [250]);
  };

  let releaseDate;
  if (item.release_date) {
    releaseDate = item.release_date.split("-")[0];
  }

  return (
    <animated.div
      className="title"
      style={{ transform: x.to((x) => `translateY(${x * 1}%)`) }}
    >
      {item && (
        <div className="title__container">
          <div className="title__close" onClick={closePageHandler}>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <section className="title__main">
            <section className="title__info">
              <h2>{item.title && item.title}</h2>
              <h2>{item.name && item.name}</h2>
              {item.release_date && (
                <div className="title__details">
                  <p>{releaseDate}</p>
                </div>
              )}
              <p className="title__desc">{item.overview}</p>
              {item.genre_ids && (
                <div className="title__genres">
                  {genres &&
                    genre.map((genre, i) => {
                      if (i < 2) {
                        return (
                          <Fragment key={genre.name}>
                            <p>{genre.name}</p>
                            <span>•</span>
                          </Fragment>
                        );
                      }
                      return null;
                    })}
                </div>
              )}
            </section>
            <figure className="title__figure">
              <img
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                alt="test"
              />
            </figure>
          </section>
          <section className="title__cta">
            <ul>
              <li>
                <i className="fa-solid fa-play"></i>
                <p>Play</p>
              </li>
              <li>
                <i className="fa-solid fa-layer-group"></i>
                <p>Trailers & More</p>
              </li>
              <li>
                <i className="fa-solid fa-closed-captioning"></i>
                <p>Audio & Subtitles</p>
              </li>
              <li>
                <i className="fa-solid fa-plus"></i>
                <p>Add to My List</p>
              </li>
            </ul>
          </section>
          <Row
            title={`Titles similar to ${item.title ? item.title : item.name}`}
            endpoint={`/movie/${item.id}/similar?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&page=1`}
          />
        </div>
      )}
    </animated.div>
  );
};

export default Title;
