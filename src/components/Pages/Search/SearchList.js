import React from "react";
import SearchListItem from "./SearchListItem";

const SearchList = (props) => {
  return (
    <ul className="search__list">
      {props.match.length >= 1 &&
        props.match.map((title) => {
          if (title.poster_path && title.backdrop_path && title.title) {
            return <SearchListItem item={title} />;
          }
          return null;
        })}
    </ul>
  );
};

export default SearchList;
