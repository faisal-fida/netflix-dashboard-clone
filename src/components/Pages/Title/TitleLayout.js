import React from "react";

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
            src={`https://image.tmdb.org/t/p/w500${props.item.backdrop_path}`}
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
    </div>
  );
};

export default TitleLayout;
