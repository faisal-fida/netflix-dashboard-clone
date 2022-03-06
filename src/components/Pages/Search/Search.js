import React, { useState, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { itemActions } from "../../../store/item";
import axios from "axios";
import SearchList from "./SearchList";

const Search = () => {
  const [search, setSearch] = useState("");
  const [match, setMatch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(match);

  let refinedSearch;
  if (search.length > 0) {
    refinedSearch = search.split(" ").join("%");
  } else {
    refinedSearch = "title that doesnt exist";
  }

  useEffect(() => {
    const findMatch = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIE_API}&query=${refinedSearch}&language=en-US&page=1&`
        );
        setMatch(response.data.results);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    findMatch();
  }, [refinedSearch]);

  const dispatch = useDispatch();
  const toggled = useSelector((state) => state.item.searchToggled);

  const { x } = useSpring({
    x: toggled ? 0 : 100,
  });

  const findTitleHandler = (e) => {
    setTimeout(() => {
      setSearch(e.target.value);
    }, 2000);
  };

  const closeSearchHandler = () => {
    dispatch(itemActions.setSearchToggled(false));
  };

  return (
    <animated.div
      className="search"
      style={{ transform: x.to((x) => `translateY(${x * 1}%)`) }}
    >
      <form className="search__form">
        <div className="search__input">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input placeholder="Search" onChange={findTitleHandler} />
        </div>
        <button type="button" onClick={closeSearchHandler}>
          Cancel
        </button>
      </form>
      {!isLoading && <SearchList match={match} />}
    </animated.div>
  );
};

export default Search;
