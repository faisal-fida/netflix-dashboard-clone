import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../../../store/item";
import { animated, useSpring } from "@react-spring/web";
import getGenres from "../../../helpers/getGenres";
import TitleLayout from "./TitleLayout";

const SimilarTitle = (props) => {
  const item = useSelector((state) => state.item.similar);
  const [genres, setGenres] = useState();
  const dispatch = useDispatch();
  const toggled = useSelector((state) => state.item.similarToggled);

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

  //   const closePageHandler = () => {
  //     dispatch(itemActions.setToggled(false));
  //     dispatch(itemActions.setSimilarToggled(false));

  //     setTimeout(() => {
  //       dispatch(itemActions.setItem(false));
  //     }, [250]);
  //   };

  const goBackHandler = () => {
    dispatch(itemActions.setSimilarToggled(false));

    setTimeout(() => {
      dispatch(itemActions.setSimilar(false));
    }, [250]);
  };

  let releaseDate;
  if (item.release_date) {
    releaseDate = item.release_date.split("-")[0];
  }

  return (
    <animated.div
      className="title title__similar--page"
      style={{ transform: x.to((x) => `translateX(${x * 1}%)`) }}
    >
      <div className="title__back" onClick={goBackHandler}>
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      <TitleLayout
        item={item}
        genres={genres}
        genre={genre}
        releaseDate={releaseDate}
        // close={closePageHandler}
      />
    </animated.div>
  );
};

export default SimilarTitle;
