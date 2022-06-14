import React, { useEffect, useState, Fragment } from "react";
import axios from "../../utilities/axios";
import Top10RowItem from "./Top10RowItem";
import { useSelector } from "react-redux";

const Top10Row = (props) => {
  const [titles, setTitles] = useState([]);

  // only called for reducing keyboard from accessing items that aren't currently in focus
  const { item } = useSelector((state) => state.item);

  // function that will receive an endpoint from client/src/components/Pages/Browse/Sections/Main and will load
  // the appropriate data
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
      <h2 tabIndex={item ? "-1" : "0"} className="row__heading">
        {props.title}
      </h2>
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
