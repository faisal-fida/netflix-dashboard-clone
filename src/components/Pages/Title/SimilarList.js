import React, { useState, useEffect, Fragment } from "react";
import axios from "../../../utilities/axios";
import RowItem from "../../Rows/RowItem";
import SimilarItem from "./SimilarItem";

const SimilarList = (props) => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const getSimilar = async () => {
      const selector = Math.floor(Math.random() * 14);
      try {
        const response = await axios.get(props.movieEndpoint);
        const results = response.data.results.slice(selector, selector + 6);
        setTitles(results);
      } catch (err) {
        const response = await axios.get(props.tvEndpoint);
        const results = response.data.results.slice(selector, selector + 6);
        setTitles(results);
      }
    };
    getSimilar();
  }, [props.movieEndpoint, props.tvEndpoint]);

  return (
    <Fragment>
      <h2 className="title__similar-heading">More Like This</h2>
      <section className="title__similar">
        <ul className="title__similar--list title__similar--list-mobile">
          {titles.length > 0 &&
            titles.map((title) => <RowItem key={title.id} item={title} />)}
        </ul>
        <ul className="title__similar--list title__similar--list-desktop">
          {titles.length > 0 &&
            titles.map((title) => <SimilarItem key={title.id} item={title} />)}
        </ul>
      </section>
    </Fragment>
  );
};

export default SimilarList;
