import classes from "./Header.module.css";
import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const stateSigned = useSelector((state) => state.signed.signedIn);
  const history = useHistory();
  const [detailedSearchIsVisible, setDetailedSearchIsVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchStatusValue, setSearchStatusValue] = useState("");
  const [searchSpeciesValue, setSearchSpeciesValue] = useState("");
  const [searchTypeValue, setSearchTypeValue] = useState("");
  const [searchGenderValue, setSearchGenderValue] = useState("");

  const searchValueChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchStatusValueChangeHandler = (e) => {
    if (e.target.value === "select") {
      setSearchStatusValue("");
      return;
    }
    setSearchStatusValue(e.target.value);
  };

  const searchSpeciesValueChangeHandler = (e) => {
    setSearchSpeciesValue(e.target.value);
  };

  const searchTypeValueChangeHandler = (e) => {
    setSearchTypeValue(e.target.value);
  };
  const searchGenderValueChangeHandler = (e) => {
    if (e.target.value === "select") {
      setSearchGenderValue("");
      return;
    }
    setSearchGenderValue(e.target.value);
  };

  const clicked = (e) => {
    e.preventDefault();
    if (
      searchValue.trim().length === 0 &&
      !(
        searchStatusValue !== "" ||
        searchSpeciesValue !== "" ||
        searchTypeValue !== "" ||
        searchGenderValue !== ""
      )
    ) {
      return;
    }
    history.push({
      pathname: `/search`,
      search: `?name=${searchValue}&page=1&status=${searchStatusValue}&species=${searchSpeciesValue}&type=${searchTypeValue}&gender=${searchGenderValue}`,
    });
    setSearchValue("");
    setSearchStatusValue("");
    setSearchSpeciesValue("");
    setSearchTypeValue("");
    setSearchGenderValue("");
  };

  const toggleDetailedSearch = () => {
    setDetailedSearchIsVisible(!detailedSearchIsVisible);
  };

  return (
    <Fragment>
      <div className={classes.Header}>
        {stateSigned && (
          <Fragment>
            <form className={classes.Search} onSubmit={clicked}>
              <label htmlFor="searchBox">Search your favourite character</label>
              <input
                value={searchValue}
                onChange={searchValueChangeHandler}
              ></input>
              <button className={classes.Link}>Search</button>
              <p onClick={toggleDetailedSearch}>Detailed Search</p>
            </form>

            <div className={classes.Logout}>
              <p></p>
              <button className={classes.Button} onClick={props.clicked}>
                Logout
              </button>
            </div>
          </Fragment>
        )}
      </div>
      {detailedSearchIsVisible && (
        <div className={classes.DetailedSearch}>
          <div>
            <label htmlFor="searchBox">Status</label>
            <select
              className={classes.Select}
              onChange={searchStatusValueChangeHandler}
            >
              <option>select</option>
              <option>alive</option>
              <option>dead</option>
              <option>unknown</option>
            </select>
          </div>
          <div>
            <label htmlFor="searchBox">Species</label>
            <input
              className={classes.Input}
              value={searchSpeciesValue}
              onChange={searchSpeciesValueChangeHandler}
            ></input>
          </div>
          <div>
            <label htmlFor="searchBox">Type</label>
            <input
              className={classes.Input}
              value={searchTypeValue}
              onChange={searchTypeValueChangeHandler}
            ></input>
          </div>
          <div>
            <label htmlFor="searchBox">Gender</label>
            <select
              className={classes.Select}
              onChange={searchGenderValueChangeHandler}
            >
              <option>select</option>
              <option>male</option>
              <option>female</option>
              <option>genderless</option>
              <option>unknown</option>
            </select>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Header;
