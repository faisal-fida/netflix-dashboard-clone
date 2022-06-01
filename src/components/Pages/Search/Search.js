import React, { useState, useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { itemActions } from "../../../store/item";
import axios from "axios";
import SearchList from "./SearchList";

const Search = () => {
  const [search, setSearch] = useState("");
  let searchInput = useRef("");
  const [match, setMatch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const toggled = useSelector((state) => state.item.searchToggled);

  // refining the search to match the API restrictions for querying titles
  // Source: https://developers.themoviedb.org/3/search/multi-search
  let refinedSearch;
  if (search.length > 0) {
    refinedSearch = search.split(" ").join("%20");
  } else {
    refinedSearch = "title that doesnt exist";
  }

  useEffect(() => {
    // if search state is empty, a preset list of movies will be fetched from the database to
    // fill in popular titles that are frequently searched
    if (!search) {
      const findPresets = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&page=3`
          );
          setMatch(response.data.results);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.log(err);
        }
      };
      findPresets();
    }

    // if search state is truthy, this function will fetch the users search from the database
    // and replace the presets with the returned matching titles
    if (search) {
      const findMatch = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIE_API}&query=${refinedSearch}&language=en-US`
          );
          setMatch(response.data.results);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.log(err);
        }
      };
      findMatch();
    }
  }, [search, refinedSearch]);

  const { x } = useSpring({
    x: toggled ? 0 : 100,
  });

  // handler that sets the search state as the value that the user is entering into the input
  const findTitleHandler = (e) => {
    setTimeout(() => {
      setSearch(e.target.value);
    }, 2000);
  };

  // when user closes the search section all values will be reset so that next time the user
  // returns in the same session the input and search state will be reset
  const closeSearchHandler = () => {
    setSearch("");
    searchInput.current.value = "";
    dispatch(itemActions.setSearchToggled(false));
  };

  return (
    <animated.div
      className="search"
      style={{ transform: x.to((x) => `translateY(${x * 1}%)`) }}
    >
      <div className="search__container">
        <form className="search__form">
          <div className="search__input">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              placeholder="Search"
              onChange={findTitleHandler}
              ref={searchInput}
            />
          </div>
          <button
            type="button"
            className="search__cancel"
            onClick={closeSearchHandler}
          >
            Cancel
          </button>
        </form>
        {!search && <p className="search__title">Our most searched titles</p>}
        {search && match.length > 0 && (
          <p className="search__title">{`Results for ${search}`}</p>
        )}
        {search && match.length === 0 && (
          <p className="search__title">{`No results found for ${search}`}</p>
        )}
        {!isLoading && <SearchList match={match} />}
      </div>
    </animated.div>
  );
};

export default Search;
