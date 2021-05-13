import React, { useEffect, useState, Fragment, useRef } from "react";
import classes from "./DetailedEpisode.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../../ui/Spinner";
import useAxios from "../../hooks/useAxios.js";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Character from "../Character/Character.js";

const DetailedEpisode = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const episodeId = searchParams.get("episodeId");

  const [allCharactersUrls, setAllCharactersUrls] = useState([]);
  const [characters, setCharacters] = useState([]);
  //FOR REACT_WINDOW
  const listRef = useRef();
  const [scrollValue, setScrollValue] = useState("");
  const [exceedingNumber, setExceedingNumber] = useState(false);
  const [shouldHighlight, setShouldHighlight] = useState(false)

  // FOR THE FIRST FETCH
  const transformEpisodesData = (dataObj) => {
    setAllCharactersUrls(dataObj.characters);
  };

  const { loading: loadingEpisode, sendRequest: fetchEpisodeHandler } =
    useAxios(
      {
        url: `https://rickandmortyapi.com/api/episode/${episodeId}`,
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
    fetchEpisodeHandler();
  }, [episodeId]);

  useEffect(() => {
    if (allCharactersIds.length === 0) {
      return;
    }
    fetchCharactersHandler();
  }, [allCharactersUrls]);

  // const characterClass =
  //   scrollValue === elIndex + 1
  //     ? classes.Paragraph
  //     : `${classes.Paragraph} ${classes.Active}`;
  // console.log(characterClass);

  const onScrollValueChange = (e) => {
    setScrollValue(e.target.value);
    setExceedingNumber(false);
    setShouldHighlight(false)
  };

  const scrollToRow = (itemNumber) => {
    if (itemNumber > characters.length || itemNumber < 1) {
      setScrollValue("");
      setExceedingNumber(true);
      return;
    }
    listRef.current.scrollToItem(itemNumber - 1, "center");
    setShouldHighlight(true)
  };

  const Row = ({ index, style }) => (
    // <div key={characters[index].id} style={style} className={(+scrollValue === +index+1 && shouldHighlight) ? classes.Active : null} >
    <div key={characters[index].id} style={style} >
      <Character 
      shouldHighlight={shouldHighlight}
      scrollValue = {scrollValue}
      index={index} 
      className={(+scrollValue === +index+1 && shouldHighlight) ? classes.Active : null}
        el={characters[index]}
        characters={characters}
        shouldNavigateOrigin={true}
        shouldNavigateLocation={true}
      />
    </div>
  );

  return (
    <Fragment>
      {loadingEpisode || loadingCharacters ? (
        <Spinner />
      ) : (
        <div className={classes.DetailedEpisode}>
          <p className={classes.Text}>
            Detailed information for episode #{episodeId}
          </p>
          <p className={classes.Text}>
            Number of characters who have been seen in the episode:{" "}
            {characters.length}
          </p>
          <p className={classes.Text}>
            All characters who have been seen in the episode are:{" "}
          </p>

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
                  height={height * 4.8}
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

export default DetailedEpisode;
