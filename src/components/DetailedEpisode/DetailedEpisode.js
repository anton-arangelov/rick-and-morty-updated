import React, { useEffect, useState, Fragment } from "react";
import classes from "./DetailedEpisode.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoopThroughCharacters from "../AllEpisodes/LookThroughCharacters/LoopThroughCharacters";
import Spinner from "../../ui/Spinner";
import Pagination from "../Pagination/Pagination.js";
import useAxios from "../../hooks/useAxios.js";

const DetailedEpisode = (props) => {
  const params = useParams();
  const [allCharactersUrls, setAllCharactersUrls] = useState([]);
  const [characters, setCharacters] = useState([]);

  //FOR THE FIRST FETCH
  const transformEpisodesData = (dataObj) => {
    setAllCharactersUrls(dataObj.characters);
  };

  const { loadingEpisode, sendRequest: fetchEpisodeHandler } = useAxios(
    {
      url: `https://rickandmortyapi.com/api/episode/${params.id}`,
      func: axios.get,
      body: null,
    },
    transformEpisodesData
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
    try {
      fetchEpisodeHandler();
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  useEffect(() => {
    try {
      fetchCharactersHandler();
    } catch (error) {
      console.log(error);
    }
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
      {loadingEpisode || loadingCharacters ? (
        <Spinner />
      ) : (
        <div className={classes.DetailedEpisode}>
          <p className={classes.Text}>
            Detailed information for episode #{params.id}
          </p>
          <p className={classes.Text}>
            Number of characters who have been seen in the episode:{" "}
            {characters.length}
          </p>
          <p className={classes.Text}>
            All characters who have been seen in the episode are:{" "}
          </p>
          {/* <Link
        className={classes.Link}
        to={`/detail/${Math.ceil(Math.random() * 10)}`}
      >
        Click
      </Link> */}
          <Fragment>
            <LoopThroughCharacters
              characters={currentPosts}
              shouldNavigateOrigin={true}
              shouldNavigateLocation={true}
            />
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPosts={totalPosts}
              postsPerPage={postsPerPage}
            />
          </Fragment>
          )
        </div>
      )}
    </Fragment>
  );
};

export default DetailedEpisode;
