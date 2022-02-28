import React, { useEffect, useState } from "react";
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
    <section className="row">
      <h2>{props.title}</h2>
      <ul className="row__list">
        {titles.length > 0 &&
          titles.map((title) => <RowItem key={title.id} item={title} />)}
      </ul>
    </section>
  );
};

export default Row;
