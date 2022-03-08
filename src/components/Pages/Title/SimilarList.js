import React, { useState, useEffect, Fragment } from "react";
import axios from "../../../utilities/axios";
import RowItem from "../../Rows/RowItem";

const SimilarList = (props) => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const getSimilar = async () => {
      try {
        const response = await axios.get(props.endpoint);
        const results = response.data.results.slice(0, 6);
        setTitles(results);
      } catch (err) {
        console.log(err);
      }
    };
    getSimilar();
  }, [props.endpoint]);

  return (
    <Fragment>
      <h2 className="title__similar-heading">More Like This</h2>
      <section className="title__similar">
        <ul className="title__similar--list">
          {titles.length > 0 &&
            titles.map((title) => <RowItem key={title.id} item={title} />)}
        </ul>
      </section>
    </Fragment>
  );
};

export default SimilarList;
