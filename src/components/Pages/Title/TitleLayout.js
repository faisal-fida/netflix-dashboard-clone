import React, { Fragment } from "react";

const TitleLayout = (props) => {
  return (
    <div className="title__container">
      {/* <div className="title__close" onClick={props.close}>
        <i className="fa-solid fa-xmark"></i>
      </div> */}
      <section className="title__main">
        <section className="title__info">
          <h2>{props.item.title && props.item.title}</h2>
          <h2>{props.item.name && props.item.name}</h2>
          {props.item.release_date && (
            <div className="title__details">
              <p>{props.releaseDate}</p>
            </div>
          )}
          <p className="title__desc">{props.item.overview}</p>
          {props.item.genre_ids && (
            <div className="title__genres">
              {props.genres &&
                props.genre.map((genre, i) => {
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
            src={`https://image.tmdb.org/t/p/original${props.item.backdrop_path}`}
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
