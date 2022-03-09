import React from "react";

const SimilarItem = (props) => {
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
        <i className="fa-solid fa-plus"></i>
      </section>
      <p className="title__similar--desktop-desc">{props.item.overview}</p>
    </li>
  );
};

export default SimilarItem;
