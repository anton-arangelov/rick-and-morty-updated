import React, { useState, useEffect, Fragment } from "react";
import classes from "./SearchCharacters.module.css";
import { useLocation } from "react-router-dom";
import LoopThroughCharacters from "../AllEpisodes/LookThroughCharacters/LoopThroughCharacters";
import axios from "axios";
import Spinner from "../../ui/Spinner.js";
import Pagination from "../Pagination/Pagination";
import useAxios from "../../hooks/useAxios.js";

const SearchCharacters = (props) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search)
  const searchValue = searchParams.get('name')
  const pageNumber = searchParams.get('page')
  const statusValue = searchParams.get('status')
  const speciesValue = searchParams.get('species')
  const typeValue = searchParams.get('type')
  const genderValue = searchParams.get('gender')

  const [allCharacters, setAllCharacters] = useState([]);
  const [info, setInfo] = useState({
    count: 0,
    pages: 0,
    prev: null,
    next: null,
  });

  

  const transformEpisodesData = (dataObj) => {
    if (dataObj.length !== 0) {
      setAllCharacters(dataObj.results);
      setInfo(dataObj.info);
    } else {
      setAllCharacters([]);
      setInfo({});
    }
  };

  const {
    loading,
    error,
    sendRequest: fetchCharactersHandler,
  } = useAxios(
    {
      url: `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${searchValue}&status=${statusValue}&species=${speciesValue}&type=${typeValue}&gender=${genderValue}`,
      func: axios.get,
      body: null,
    },
    transformEpisodesData
  );

  useEffect(() => {
    fetchCharactersHandler();
  }, [searchValue, pageNumber, statusValue, speciesValue, typeValue, genderValue]);



  return (
    <Fragment>
      {error ? (
        <h1 style={{textAlign: "center"}}>{error.toString()}</h1>
      ) : (
        <Fragment>
          {loading ? (
            <Spinner />
          ) : (
            <div className={classes.Search}>
              <p className={classes.Text}>
                Found {info.count} results. They are:
              </p>
              <LoopThroughCharacters
                characters={allCharacters}
                shouldNavigateOrigin={true}
                shouldNavigateLocation={true}
              />
              <Pagination
                {...info}
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default SearchCharacters;
