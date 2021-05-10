import React, { Fragment, useState, useEffect } from "react";
import classes from "./AllEpisodes.module.css";
import Episode from "../Episode/Episode.js";
import axios from "axios";
import Spinner from "../../ui/Spinner.js";
import Pagination from "../Pagination/Pagination";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios.js";

const AllEpisodes = (props) => {
  const params = useParams().selectedPage;
  const [stateEpisodes, setStateEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(params);
  const [postsPerPage] = useState(5);
  const totalPosts = 41;

  const transformData = (dataObj) => {
    let updatedEpisodes = [];
    dataObj.forEach((fetchedEpisode) => {
      updatedEpisodes.push(fetchedEpisode);
    });

    updatedEpisodes.sort((a, b) => {
      return a.id - b.id;
    });
    setStateEpisodes(updatedEpisodes);
  };

  let episodesIds = [];
  for (
    let i = (currentPage - 1) * postsPerPage + 1;
    i <= currentPage * postsPerPage;
    i++
  ) {
    episodesIds.push(i);
  }

  const { loading, sendRequest: fetchEpisodes } = useAxios(
    {
      url: `https://rickandmortyapi.com/api/episode/[${episodesIds}]`,
      func: axios.get,
      body: null,
    },
    transformData
  );

  useEffect(() => {
      fetchEpisodes();
  }, [currentPage, postsPerPage]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className={classes.Episodes}>
            <h3 className={classes.Text}>All episodes are 41</h3>
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

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPosts={totalPosts}
            postsPerPage={postsPerPage}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default AllEpisodes;
