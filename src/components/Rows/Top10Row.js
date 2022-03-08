import React, { useEffect, useState, Fragment } from "react";
import axios from "../../utilities/axios";
import Top10RowItem from "./Top10RowItem";

const Top10Row = (props) => {
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
            titles.map((title, i) => {
              if (i < 10) {
                return <Top10RowItem title={title} i={i} key={title.id} />;
              }
              return null;
            })}
        </ul>
      </section>
    </Fragment>
  );
};

export default Top10Row;
