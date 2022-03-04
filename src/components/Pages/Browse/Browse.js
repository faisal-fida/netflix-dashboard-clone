import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";

import Navigation from "../../UI/Navigation";
import MobileNavigation from "../../UI/MobileNavigation";
import Main from "./Sections/Main";
import TV from "./Sections/TV";
import Movie from "./Sections/Movie";
import Title from "../Title/Title";

const Browse = () => {
  const { media } = useParams();

  return (
    <Fragment>
      <Navigation />
      <MobileNavigation />
      {!media && <Main />}
      {media === "tv" && <TV />}
      {media === "movie" && <Movie />}
      <Title />
    </Fragment>
  );
};

export default Browse;
