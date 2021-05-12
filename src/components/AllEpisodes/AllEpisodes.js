import React, { Fragment, useState, useEffect } from "react";
import classes from "./AllEpisodes.module.css";
import Episode from "../Episode/Episode.js";
import axios from "axios";
import Spinner from "../../ui/Spinner.js";
import Pagination from "../Pagination/Pagination";
import { useLocation } from "react-router-dom";
import useAxios from "../../hooks/useAxios.js";

const AllEpisodes = (props) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search)
  const pageNumber = searchParams.get('page')

  const [stateEpisodes, setStateEpisodes] = useState([]);
  const [info, setInfo] = useState({
    count: 0,
    pages: 0,
    prev: null,
    next: null,
  });

  const transformData = (dataObj) => {
    setStateEpisodes(dataObj.results);
    setInfo(dataObj.info);
  };

  const { loading, sendRequest: fetchEpisodes } = useAxios(
    {
      url: `https://rickandmortyapi.com/api/episode?page=${pageNumber}`,
      func: axios.get,
      body: null,
    },
    transformData
  );

  useEffect(() => {
    fetchEpisodes();
    
  }, [pageNumber]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className={classes.Episodes}>
            <h3 className={classes.Text}>All episodes are {info.count}</h3>
            {stateEpisodes.map((episode) => {
              return (
                <Episode
                  key={episode.id}
                  id={episode.id}
                  name={episode.name}
                  airDate={episode.air_date}
                />
              );
            })}
          </div>

          <Pagination {...info} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default AllEpisodes;
