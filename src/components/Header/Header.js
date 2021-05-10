import classes from "./Header.module.css";
import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const stateSigned = useSelector((state) => state.signed.signedIn);
  const history = useHistory();

  const searchValueChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const clicked = (e) => {
    e.preventDefault();
    if (searchValue.trim().length === 0) {
      return;
    }
    history.push(`/search/${searchValue}/1`);
    setSearchValue("");
  };

  return (
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
  );
};

export default Header;
