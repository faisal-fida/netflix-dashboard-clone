import React, { useEffect, useState, Fragment } from "react";
import axios from "../../utilities/axios";

const Top10Row = (props) => {
  const [titles, setTitles] = useState([]);
  console.log("top 10", titles);

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
                console.log(i);
                return (
                  <li
                    key={title.id}
                    className="row__list--item row__list--item-container"
                  >
                    <div className="row__list--item-top">
                      <p>{i + 1}</p>
                    </div>
                    <div className="row__list--item-img">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${title.poster_path}`}
                        alt={title.name}
                      />
                    </div>
                  </li>
                );
              }
            })}
        </ul>
      </section>
    </Fragment>
  );
};

export default Top10Row;
