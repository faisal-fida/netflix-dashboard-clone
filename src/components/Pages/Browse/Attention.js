import React, { useEffect, useState, Fragment } from "react";
import axios from "../../../utilities/axios";
import requestController from "../../../utilities/requests";
// import movieTrailer from "movie-trailer";
// import { animated, useSpring } from "@react-spring/web";
import { useParams } from "react-router-dom";
import LoadingDiv from "../../UI/LoadingDiv";
import getAttentionInfo from "../../../helpers/getAttentionInfo";
import ButtonContainer from "./Attention/Buttons/ButtonContainer";

const Attention = (props) => {
  const [attentionItem, setAttentionItem] = useState();
  // const [trailer, setTrailer] = useState();
  // const [trailerVisible, setTrailerVisible] = useState(true);
  const [genres, setGenres] = useState();
  const [isLoading, setIsLoading] = useState();

  let genre;
  if (attentionItem && genres) {
    genre = attentionItem.genre_ids.map((id) =>
      genres.find((genre) => genre.id === id)
    );
  }

  let request;
  const { media } = useParams();
  if (!media) request = requestController.mainRequests;
  if (media === "tv") request = requestController.tvRequests;
  if (media === "movie") request = requestController.movieRequests;

  // const { x } = useSpring({
  //   x: !props.fade ? 1 : 0,
  // });

  // if (trailerVisible) {
  //   setTimeout(() => {
  //     props.setToggled();
  //   }, 5000);

  //   setTimeout(() => {
  //     setTrailerVisible(false);
  //   }, 35000);
  // }

  useEffect(() => {
    getAttentionInfo(
      setIsLoading,
      setAttentionItem,
      axios,
      request,
      // movieTrailer,
      // setTrailer,
      setGenres
    );
  }, [request]);

  // let play;
  // if (trailer) {
  //   play = trailer.split("v=")[1];
  // }

  return (
    <section className="attention">
      {isLoading && <LoadingDiv />}
      {!isLoading && attentionItem && (
        <Fragment>
          <div className="attention__overlay"></div>
          <div className="attention__backdrop">
            <section className="attention__backdrop--info">
              {attentionItem.name && <h2>{attentionItem.name}</h2>}
              {attentionItem.title && <h2>{attentionItem.title}</h2>}
              <p className="attention__backdrop--info-desc">
                {attentionItem.overview}
              </p>
              <div className="attention__backdrop--info-genre">
                {genres &&
                  genre.map((genre, i) => {
                    if (i < 2) {
                      return (
                        <Fragment key={genre.name}>
                          <p>{genre.name}</p>
                          <span>•</span>
                        </Fragment>
                      );
                    }
                    return null;
                  })}
              </div>
              <ButtonContainer item={attentionItem} />
            </section>
            {/* {trailer && trailerVisible && (
              <animated.div style={{ opacity: x }}>
                <img
                  className="attention__backdrop--img"
                  src={`https://image.tmdb.org/t/p/original${attentionItem.backdrop_path}`}
                  alt={`${attentionItem.name} backdrop`}
                />
              </animated.div>
            )} */}
            {/* {trailer && trailerVisible && media !== "tv" && (
              <iframe
                allow="autoplay"
                title={attentionItem.name}
                src={`https://www.youtube.com/embed/${play}?autoplay=1&mute=1&end`}
              ></iframe>
            )} */}
            <img
              className="attention__backdrop--img"
              src={`https://image.tmdb.org/t/p/original${attentionItem.backdrop_path}`}
              alt={`${attentionItem.name} backdrop`}
            />
            <img
              className="attention__backdrop--img-mobile"
              src={`https://image.tmdb.org/t/p/original${attentionItem.poster_path}`}
              alt={`${attentionItem.name} backdrop`}
            />
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default Attention;
