import React from "react";
import { Redirect, useParams } from "react-router-dom";
import Navigation from "../../UI/Navigation";
import MobileNavigation from "../../UI/MobileNavigation";
import Main from "./Sections/Main";
import TV from "./Sections/TV";
import Movie from "./Sections/Movie";
import Title from "../Title/Title";
import SimilarTitle from "../Title/SimilarTitle";
import TitleBackdrop from "../Title/TitleBackdrop";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const Browse = () => {
  const { media } = useParams();
  const { item } = useSelector((state) => state.item);
  const accountId = Cookies.get("accountId");
  const userId = Cookies.get("userId");

  return (
    <>
      {!accountId && !userId && <Redirect to="/auth" />}
      {accountId && userId && (
        <div className="browse">
          <Navigation />
          <MobileNavigation />
          {!media && <Main />}
          {media === "tv" && <TV />}
          {media === "movie" && <Movie />}
          <Title />
          <SimilarTitle />
          {item && <TitleBackdrop />}
        </div>
      )}
    </>
  );
};

export default Browse;
