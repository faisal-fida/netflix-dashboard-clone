import React, { useEffect, useState, Fragment } from "react";
import RowItem from "./RowItem";
import axios from "../../utilities/axios";
import { useSelector } from "react-redux";

const Row = (props) => {
  const [titles, setTitles] = useState([]);
  const { item } = useSelector((state) => state.item);

  useEffect(() => {
    if (!props.list) {
      const getGenre = async () => {
        try {
          const response = await axios.get(props.endpoint);
          setTitles(response.data.results);
        } catch (err) {
          console.log(err);
        }
      };
      getGenre();
    }

    if (props.list) {
      setTitles(props.list);
    }
  }, [props.endpoint, props.list]);

  return (
    <Fragment>
      <h2 tabIndex={item ? "-1" : "0"} className="row__heading">
        {props.title}
      </h2>
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
