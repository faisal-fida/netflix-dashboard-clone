import React, { Fragment } from "react";
import { useParams } from "react-router-dom";

import Navigation from "../../UI/Navigation";
import MobileNavigation from "../../UI/MobileNavigation";
import Main from "./Sections/Main";
import TV from "./Sections/TV";
import Movie from "./Sections/Movie";

const Browse = () => {
  const { media } = useParams();

  return (
    <Fragment>
      <Navigation />
      <MobileNavigation />
      {!media && <Main />}
      {media === "tv" && <TV />}
      {media === "movie" && <Movie />}
    </Fragment>
  );
};

export default Browse;
