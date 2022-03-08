import React from "react";
import { useParams } from "react-router-dom";

import Navigation from "../../UI/Navigation";
import MobileNavigation from "../../UI/MobileNavigation";
import Main from "./Sections/Main";
import TV from "./Sections/TV";
import Movie from "./Sections/Movie";
import Title from "../Title/Title";
import TitleBackdrop from "../Title/TitleBackdrop";
import { useSelector } from "react-redux";

const Browse = () => {
  const { media } = useParams();
  const { item } = useSelector((state) => state.item);

  // let titleStyle = item ? "hidden" : "scroll";

  return (
    <div className="browse" /* style={{ overflow: `${titleStyle}` }} */>
      <Navigation />
      <MobileNavigation />
      {!media && <Main />}
      {media === "tv" && <TV />}
      {media === "movie" && <Movie />}
      <Title />
      {item && <TitleBackdrop />}
    </div>
  );
};

export default Browse;
