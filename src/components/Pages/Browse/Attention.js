import React, { useEffect, useState, Fragment } from "react";
import axios from "../../../utilities/axios";
import requestController from "../../../utilities/requests";
import movieTrailer from "movie-trailer";
import { animated, useSpring } from "@react-spring/web";
import { useParams } from "react-router-dom";

const Attention = (props) => {
  const [attentionItem, setAttentionItem] = useState();
  const [trailer, setTrailer] = useState();
  const [trailerVisible, setTrailerVisible] = useState(true);

  let request;
  const { media } = useParams();
  if (!media) request = requestController.mainRequests;
  if (media === "tv") request = requestController.tvRequests;
  if (media === "movie") request = requestController.movieRequests;

  const { x } = useSpring({
    x: !props.fade ? 1 : 0,
  });

  if (trailerVisible) {
    setTimeout(() => {
      props.setToggled();
    }, 5000);

    setTimeout(() => {
      setTrailerVisible(false);
    }, 35000);
  }

  useEffect(() => {
    const selector = Math.floor(Math.random() * 19);
    const getMain = async () => {
      try {
        const response = await axios.get(request.trending);
        setAttentionItem(response.data.results[selector]);

        const trailer = await movieTrailer(null, {
          tmdbId: response.data.results[selector].id,
        });
        setTrailer(trailer);
      } catch (err) {
        console.log(err);
      }
    };
    getMain();
  }, [request.trending]);

  let play;
  if (trailer) {
    play = trailer.split("v=")[1];
  }

  return (
    <Fragment>
      {attentionItem && (
        <section className="attention">
          <div className="attention__overlay"></div>
          <div className="attention__backdrop">
            <section className="attention__backdrop--info">
              {attentionItem.name && <h2>{attentionItem.name}</h2>}
              {attentionItem.title && <h2>{attentionItem.title}</h2>}
              <p className="attention__backdrop--info-desc">
                {attentionItem.overview}
              </p>
              <div className="attention__backdrop--info-btn">
                <button>
                  <span>
                    <i className="fa-solid fa-play"></i>
                  </span>
                  Play
                </button>
                <button className="more-info">
                  <span>
                    <i className="fa-solid fa-circle-info"></i>
                  </span>
                  More info
                </button>
              </div>
            </section>
            {trailer && trailerVisible && (
              <animated.div style={{ opacity: x }}>
                <img
                  className="attention__backdrop--img"
                  src={`https://image.tmdb.org/t/p/original${attentionItem.backdrop_path}`}
                  alt={`${attentionItem.name} backdrop`}
                />
              </animated.div>
            )}
            {trailer && trailerVisible && (
              <iframe
                allow="autoplay"
                title={attentionItem.name}
                src={`https://www.youtube.com/embed/${play}?autoplay=1&mute=1&end`}
              ></iframe>
            )}
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
        </section>
      )}
    </Fragment>
  );
};

export default Attention;
