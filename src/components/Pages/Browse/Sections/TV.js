import React, { Fragment, useState } from "react";
import Attention from "../Attention";
import Row from "../../../Rows/Row";
import { tvRequests } from "../../../../utilities/requests";

const TV = () => {
  const [fade, setFade] = useState(false);
  const change = () => {
    setFade(true);
  };

  return (
    <Fragment>
      <Attention fade={fade} setToggled={change} />
      <main className="main">
        <Row title="Netflix Originals" endpoint={tvRequests.netflixOriginals} />
        <Row title="Trending" endpoint={tvRequests.trending} />
        <Row title="Popular on Netflix" endpoint={tvRequests.discoverPopular} />
        <Row
          title="Action and Adventure"
          endpoint={tvRequests.discoverActionAndAdventure}
        />
        <Row title="Comedies" endpoint={tvRequests.discoverComedy} />
        <Row title="Sci-Fi and Fantasy" endpoint={tvRequests.discoverSciFi} />
        <Row title="Crime" endpoint={tvRequests.discoverCrime} />
        <Row title="Documentaries" endpoint={tvRequests.discoverDocumentary} />
        <Row title="Reality TV" endpoint={tvRequests.discoverReality} />
      </main>
    </Fragment>
  );
};

export default TV;
