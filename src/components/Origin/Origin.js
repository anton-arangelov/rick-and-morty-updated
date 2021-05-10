import React, { useEffect, useState, Fragment } from "react";
import classes from "./Origin.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoopThroughCharacters from "../AllEpisodes/LookThroughCharacters/LoopThroughCharacters";
import Spinner from "../../ui/Spinner.js";
import Pagination from "../Pagination/Pagination";
import useAxios from "../../hooks/useAxios.js";

const Origin = (props) => {
  const params = useParams();
  const [allCharactersUrls, setAllCharactersUrls] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [originName, setOriginName] = useState("");

  //FOR THE FIRST FETCH
  const transformOriginData = (dataObj) => {
    setAllCharactersUrls(dataObj.residents);
    setOriginName(dataObj.name);
  };
  const { loadingOrigin, sendRequest: fetchOriginHandler } = useAxios(
    {
      url: `https://rickandmortyapi.com/api/location/${params.id}`,
      func: axios.get,
      body: null,
    },
    transformOriginData
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
      fetchOriginHandler();
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
      {loadingOrigin || loadingCharacters ? (
        <Spinner />
      ) : (
        <div className={classes.Origin}>
          <p className={classes.Text}>
            All residents in {originName} are {characters.length}.
          </p>

          <LoopThroughCharacters
            characters={currentPosts}
            shouldNavigateOrigin={false}
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

export default Origin;
