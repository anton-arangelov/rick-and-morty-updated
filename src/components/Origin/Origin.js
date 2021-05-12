import React, { useEffect, useState, Fragment, useRef } from "react";
import classes from "./Origin.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../../ui/Spinner.js";
// import Pagination from "../Pagination/Pagination";
import useAxios from "../../hooks/useAxios.js";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Character from '../Character/Character.js'

const Origin = (props) => {
  const [allCharactersUrls, setAllCharactersUrls] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [originName, setOriginName] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search)
  const originId = searchParams.get('originId')

  const listRef = useRef();
  const [scrollValue, setScrollValue] = useState('');
  const [exceedingNumber, setExceedingNumber] = useState(false);

  //FOR THE FIRST FETCH
  const transformOriginData = (dataObj) => {
    setAllCharactersUrls(dataObj.residents);
    setOriginName(dataObj.name);
  };
  const { loading: loadingOrigin, sendRequest: fetchOriginHandler } = useAxios(
    {
      url: `https://rickandmortyapi.com/api/location/${originId}`,
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

  const { loading: loadingCharacters, sendRequest: fetchCharactersHandler } = useAxios(
    {
      url: `https://rickandmortyapi.com/api/character/[${allCharactersIds}]`,
      func: axios.get,
      body: null,
    },
    transformCharactersData
  );

  useEffect(() => {
      fetchOriginHandler();
  }, [originId]);

  useEffect(() => {
    if(allCharactersIds.length ===0){
      return
    }
      fetchCharactersHandler();
  }, [allCharactersUrls]);

  const Row = ({ index, style }) => ( 
      
    <div key={characters[index].id} style={style}>
        <Character
            el={characters[index]}
            characters={characters}
            shouldNavigateOrigin={false}
            shouldNavigateLocation={true}
          />
          </div>
  );

  const scrollToRow = (itemNumber) => {
    if (itemNumber > characters.length || itemNumber < 1) {
      setScrollValue("");
      setExceedingNumber(true);
      return;
    }
    listRef.current.scrollToItem(itemNumber-1, "center");
  };

  const onScrollValueChange = (e) => {
    setScrollValue(e.target.value);
    setExceedingNumber(false);
  };



  return (
    <Fragment>
      {loadingOrigin || loadingCharacters ? (
        <Spinner />
      ) : (
        <div className={classes.Origin}>
          <p className={classes.Text}>
            All residents in {originName} are {characters.length}.
          </p>

          
          <Fragment>
            <div className = {classes.WindowCharacter}
            >
              <label
                htmlFor="Select to which row you want to scroll"
                style={{ marginLeft: "20%", color: "white" }}
              >
                Select to which row you want to go
              </label>
              <input
              type='number'
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

export default Origin;
