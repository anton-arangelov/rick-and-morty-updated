import React, { useEffect, useState, Fragment } from "react";
import classes from "./Location.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoopThroughCharacters from "../AllEpisodes/LookThroughCharacters/LoopThroughCharacters";
import Spinner from "../../ui/Spinner.js";
import Pagination from "../Pagination/Pagination";
import useAxios from "../../hooks/useAxios.js";

const Location = (props) => {
  const params = useParams();
  const [allCharactersUrls, setAllCharactersUrls] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [locationName, setLocationName] = useState("");

  //FOR THE FIRST FETCH
  const transformLocationData = (dataObj) => {
    setAllCharactersUrls(dataObj.residents);
    setLocationName(dataObj.name);
  };
  const { loadingLocation, sendRequest: fetchLocationHandler } = useAxios(
    {
      url: `https://rickandmortyapi.com/api/location/${params.id}`,
      func: axios.get,
      body: null,
    },
    transformLocationData
  );

  //FOR THE SECOND FETCH
  const transformCharactersData = (dataObj) => {
    setCharacters(dataObj);
  };

  const allCharactersIds = allCharactersUrls.map((el) => el.split("/").pop());

  const { loadingCharacters, sendRequest: fetchCharactersHandler } = useAxios(
    {
      url: `https://rickandmortyapi.com/api/character/[${allCharactersIds}]`,
      func: axios.get,
      body: null,
    },
    transformCharactersData
  );

  useEffect(() => {
      fetchLocationHandler();
  }, [params.id]);

  useEffect(() => {
      fetchCharactersHandler();
  }, [allCharactersUrls]);

  //FOR PAGINATION
  const [currentPage, setCurrentPage] = useState(params.selectedPage);
  const [postsPerPage] = useState(5);

  const indexOfFirstNextPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfFirstNextPost - postsPerPage;
  let currentPosts = characters.slice(indexOfFirstPost, indexOfFirstNextPost);

  const totalPosts = allCharactersUrls.length;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Fragment>
      {loadingLocation || loadingCharacters ? (
        <Spinner />
      ) : (
        <div className={classes.Location}>
          <p className={classes.Text}>
            All residents in {locationName} are {characters.length}.
          </p>

          <LoopThroughCharacters
            characters={currentPosts}
            shouldNavigateOrigin={true}
            shouldNavigateLocation={false}
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

export default Location;
