import React, { Fragment, useState } from "react";
import Attention from "../Attention";
import Row from "../../../Rows/Row";
import { mainRequests } from "../../../../utilities/requests";

const Main = () => {
  const [fade, setFade] = useState(false);
  const change = () => {
    setFade(true);
  };

  // Top 10 list to go in here. need to figure out endpoint and also styling like netflix top 10
  // also need to set an index so that only the top 10 appear

  return (
    <Fragment>
      <Attention fade={fade} setToggled={change} />
      <main className="main">
        <Row
          title="Netflix Originals"
          endpoint={mainRequests.netflixOriginals}
        />
        <Row title="Trending" endpoint={mainRequests.trending} />
        <Row
          title="Popular on Netflix"
          endpoint={mainRequests.discoverPopular}
        />
        <Row title="Horror Movies" endpoint={mainRequests.discoverHorror} />
        <Row title="TV Comedies" endpoint={mainRequests.discoverComedy} />
        <Row title="Action" endpoint={mainRequests.discoverAction} />
        <Row title="Adventure" endpoint={mainRequests.discoverAdventure} />
      </main>
    </Fragment>
  );
};

export default Main;
