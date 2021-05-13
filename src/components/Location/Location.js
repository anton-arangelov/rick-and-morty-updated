import React, { useEffect, useState, Fragment, useRef } from "react";
import classes from "./Location.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../../ui/Spinner.js";
import useAxios from "../../hooks/useAxios.js";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Character from "../Character/Character.js";

const Location = (props) => {
  const [allCharactersUrls, setAllCharactersUrls] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [locationName, setLocationName] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationId = searchParams.get("locationId");

  const listRef = useRef();
  const [scrollValue, setScrollValue] = useState("");
  const [exceedingNumber, setExceedingNumber] = useState(false);
  const [shouldHighlight, setShouldHighlight] = useState(false);

  //FOR THE FIRST FETCH
  const transformLocationData = (dataObj) => {
    setAllCharactersUrls(dataObj.residents);
    setLocationName(dataObj.name);
  };
  const { loading: loadingLocation, sendRequest: fetchLocationHandler } =
    useAxios(
      {
        url: `https://rickandmortyapi.com/api/location/${locationId}`,
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

  const { loading: loadingCharacters, sendRequest: fetchCharactersHandler } =
    useAxios(
      {
        url: `https://rickandmortyapi.com/api/character/[${allCharactersIds}]`,
        func: axios.get,
        body: null,
      },
      transformCharactersData
    );

  useEffect(() => {
    fetchLocationHandler();
  }, [locationId]);

  useEffect(() => {
    if (allCharactersIds.length > 0) {
      fetchCharactersHandler();
    }
  }, [allCharactersUrls]);

  //FOR PAGINATION
  // const [currentPage, setCurrentPage] = useState(params.selectedPage);
  // const [postsPerPage] = useState(5);

  // const indexOfFirstNextPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfFirstNextPost - postsPerPage;
  // let currentPosts = characters.slice(indexOfFirstPost, indexOfFirstNextPost);

  // const totalPosts = allCharactersUrls.length;
  // const pageNumbers = [];
  // for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
  //   pageNumbers.push(i);
  // }

  const scrollToRow = (itemNumber) => {
    if (itemNumber > characters.length || itemNumber < 1) {
      setScrollValue("");
      setExceedingNumber(true);
      return;
    }
    setShouldHighlight(true);
    listRef.current.scrollToItem(itemNumber - 1, "center");
  };

  const onScrollValueChange = (e) => {
    setScrollValue(e.target.value);
    setExceedingNumber(false);
    setShouldHighlight(false);
  };

  const Row = ({ index, style }) => (
    <div key={characters[index].id} style={style}>
      <Character
        shouldHighlight={shouldHighlight}
        scrollValue={scrollValue}
        index={index}
        el={characters[index]}
        characters={characters}
        shouldNavigateOrigin={true}
        shouldNavigateLocation={false}
      />
    </div>
  );

  return (
    <Fragment>
      {loadingLocation || loadingCharacters ? (
        <Spinner />
      ) : (
        <div className={classes.Location}>
          <p className={classes.Text}>
            All residents in {locationName} are {characters.length}.
          </p>

          {/* <LoopThroughCharacters
            characters={characters}
            shouldNavigateOrigin={true}
            shouldNavigateLocation={false}
          /> */}
          {/* <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPosts={totalPosts}
            postsPerPage={postsPerPage}
          /> */}

          <Fragment>
            <div className={classes.WindowCharacter}>
              <label
                htmlFor="Select to which row you want to scroll"
                style={{ marginLeft: "20%", color: "white" }}
              >
                Select to which row you want to go
              </label>
              <input
                type="number"
                style={{ width: "10%" }}
                value={scrollValue}
                onChange={onScrollValueChange}
              ></input>
              <button
                className={classes.Button}
                onClick={() => scrollToRow(scrollValue)}
                style={{ marginRight: "25%" }}
              >
                Scroll
              </button>
            </div>
            {exceedingNumber && (
              <p>Characters are between 1 and {characters.length}</p>
            )}

            <AutoSizer>
              {({ height, width }) => (
                <FixedSizeList
                  ref={listRef}
                  className={classes.Window}
                  height={height * 8.4}
                  itemCount={characters.length}
                  itemSize={250}
                  width={width}
                >
                  {Row}
                </FixedSizeList>
              )}
            </AutoSizer>
          </Fragment>
        </div>
      )}
    </Fragment>
  );
};

export default Location;
