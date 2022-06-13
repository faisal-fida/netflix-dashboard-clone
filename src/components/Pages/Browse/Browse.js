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
import SearchBackdrop from "../Search/SearchBackdrop";

const Browse = () => {
  const { media } = useParams();
  const { item } = useSelector((state) => state.item);
  const searchToggled = useSelector((state) => state.item.searchToggled);
  const accountId = Cookies.get("accountId");
  const userId = Cookies.get("userId");

  return (
    <>
      {!accountId && !userId && <Redirect to="/auth" />}
      {accountId && userId && (
        <div tabIndex="-1" className="browse">
          <Navigation />
          <MobileNavigation />
          {!media && <Main />}
          {media === "tv" && <TV />}
          {media === "movie" && <Movie />}
          <Title />
          <SimilarTitle />
          {!searchToggled && item && <TitleBackdrop />}
          {searchToggled && <SearchBackdrop />}
        </div>
      )}
    </>
  );
};

export default Browse;
