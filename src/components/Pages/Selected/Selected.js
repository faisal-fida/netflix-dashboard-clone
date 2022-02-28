import React from "react";
import { useSelector } from "react-redux";

const Selected = () => {
  let title;
  title = useSelector((state) => state.item.item);
  console.log(title);

  if (!title) {
    title = JSON.parse(localStorage.getItem("item"));
  }

  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/original${title.backdrop_path}`}
        alt={title.title}
      />
      <p></p>
      <p></p>
    </div>
  );
};

export default Selected;
