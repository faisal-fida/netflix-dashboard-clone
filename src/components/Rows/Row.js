import React, { useEffect, useState, Fragment } from "react";
import RowItem from "./RowItem";
import axios from "../../utilities/axios";

const Row = (props) => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const getGenre = async () => {
      try {
        const response = await axios.get(props.endpoint);
        setTitles(response.data.results);
      } catch (err) {
        console.log(err);
      }
    };
    getGenre();
  }, [props.endpoint]);

  return (
    <Fragment>
      <h2 className="row__heading">{props.title}</h2>
      <section className="row">
        <ul className="row__list">
          {titles.length > 0 &&
            titles.map((title) => <RowItem key={title.id} item={title} />)}
        </ul>
      </section>
    </Fragment>
  );
};

export default Row;
