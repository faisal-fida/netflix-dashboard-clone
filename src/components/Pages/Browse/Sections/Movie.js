import React, { Fragment, useState } from "react";
import Attention from "../Attention";
import Row from "../../../Rows/Row";
import { movieRequests } from "../../../../utilities/requests";

const Movie = () => {
  const [fade, setFade] = useState(false);
  const change = () => {
    setFade(true);
  };

  return (
    <Fragment>
      <Attention fade={fade} setToggled={change} />
      <main className="main">
        <Row
          title="Netflix Originals"
          endpoint={movieRequests.netflixOriginals}
        />
        <Row title="Trending" endpoint={movieRequests.trending} />
        <Row
          title="Popular on Netflix"
          endpoint={movieRequests.discoverPopular}
        />
        <Row title="Horror Movies" endpoint={movieRequests.discoverHorror} />
        <Row title="TV Comedies" endpoint={movieRequests.discoverComedy} />
        <Row title="Action" endpoint={movieRequests.discoverAction} />
        <Row title="Adventure" endpoint={movieRequests.discoverAdventure} />
      </main>
    </Fragment>
  );
};

export default Movie;
