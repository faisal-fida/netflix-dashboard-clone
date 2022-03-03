import React, { Fragment, useState } from "react";
import Attention from "../Attention";
import Row from "../../../Rows/Row";
import { mainRequests } from "../../../../utilities/requests";
import Top10Row from "../../../Rows/Top10Row";

const Main = () => {
  const [fade, setFade] = useState(false);
  const change = () => {
    setFade(true);
  };

  return (
    <Fragment>
      <Attention fade={fade} setToggled={change} />
      <main className="main">
        <Top10Row
          title="Top 10 in the U.S. Today"
          endpoint={mainRequests.top10}
        />
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
