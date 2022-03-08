import React from "react";
import SimilarList from "./SimilarList";

const TitleLayout = (props) => {
  return (
    <div className="title__container">
      <section className="title__main">
        <section className="title__info">
          {props.item.title && <h2>{props.item.title}</h2>}
          {props.item.name && <h2>{props.item.name}</h2>}
          {props.item.release_date && (
            <div className="title__details">
              <p>{props.releaseDate}</p>
            </div>
          )}
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
          <p className="title__desc">{props.item.overview}</p>
          <ul className="title__mobile-cta">
            <li>
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
        <figure className="title__figure">
          <div className="title__close" onClick={props.close}>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/original${props.item.backdrop_path}`}
            alt="test"
          />
        </figure>
      </section>
      <SimilarList
        endpoint={`/movie/${props.item.id}/similar?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&page=1`}
      />
    </div>
  );
};

export default TitleLayout;
