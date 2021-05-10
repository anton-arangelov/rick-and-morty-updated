import React, { useState, useEffect, Fragment } from "react";
import classes from "./SearchCharacters.module.css";
import { useParams } from "react-router-dom";
import LoopThroughCharacters from "../AllEpisodes/LookThroughCharacters/LoopThroughCharacters";
import axios from "axios";
import Spinner from "../../ui/Spinner.js";
import Pagination from "../Pagination/Pagination";
import useAxios from "../../hooks/useAxios.js";

const SearchCharacters = (props) => {
  const [allCharacters, setAllCharacters] = useState([]);
  let searchResultArray = [];
  const params = useParams();

  const transformEpisodesData = (dataObj) => {
    setAllCharacters(dataObj);
  };

  const allCharactersIds = [];
  for (let i = 1; i <= 671; i++) {
    allCharactersIds.push(i);
  }
  const { loading, sendRequest: fetchCharactersHandler } = useAxios(
    {
      url: `https://rickandmortyapi.com/api/character/[${allCharactersIds}]`,
      func: axios.get,
      body: null,
    },
    transformEpisodesData
  );

  useEffect(() => {
      const allCharactersIds = [];
      for (let i = 1; i <= 671; i++) {
        allCharactersIds.push(i);
      }
      fetchCharactersHandler();
  }, []);

  allCharacters.forEach((el) => {
    if (el.name.toLowerCase().includes(params.searchValue.toLowerCase())) {
      searchResultArray.push(el);
    }
  });

  //FOR PAGINATION
  const [currentPage, setCurrentPage] = useState(params.selectedPage);
  const [postsPerPage] = useState(5);

  const indexOfFirstNextPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfFirstNextPost - postsPerPage;
  let currentPosts = searchResultArray.slice(
    indexOfFirstPost,
    indexOfFirstNextPost
  );

  const totalPosts = searchResultArray.length;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className={classes.Search}>
          <p className={classes.Text}>
            Found {searchResultArray.length} results. They are:
          </p>
          <LoopThroughCharacters
            characters={currentPosts}
            toOrigin={`/origin/`}
            toLocation={`/location/`}
            shouldNavigateOrigin={true}
            shouldNavigateLocation={true}
          />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPosts={totalPosts}
            postsPerPage={postsPerPage}
          />
        </div>
      )}
    </Fragment>
  );
};

export default SearchCharacters;
