import React, { Fragment, useState } from "react";
import MainContainer from "./containers/MainContainer";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import classes from "./App.module.css";
import { useDispatch } from "react-redux";
import { signedActions } from "./store/signed-slice.js";
import { useHistory } from "react-router-dom";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    !!JSON.parse(localStorage.getItem("user"))
  );
  const [userValue, setUserValue] = useState("");
  const [invalidUsername, setInvalidUsername] = useState(false);

  let existingUsersArray = [];
  let savedUsers = JSON.parse(localStorage.getItem("users")) || "";
  savedUsers.split(",").map((el) => {
    return existingUsersArray.push(el);
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const changeValueHandler = (e) => {
    setUserValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let letters = /^[A-Za-z]+$/;
    if (!userValue.match(letters)) {
      setInvalidUsername(true);
      return;
    }
    dispatch(
      signedActions.handleStateLogin({
        status: true,
      })
    );
    localStorage.setItem("user", JSON.stringify(userValue));
    setIsUserLoggedIn(true);
    setInvalidUsername(false);
  };

  const logoutHandler = () => {
    dispatch(
      signedActions.handleStateLogin({
        status: false,
      })
    );
    setInvalidUsername(false);
    setUserValue("");
    setIsUserLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("selectedPage");

    history.push("/");
  };

  return (
    <Fragment>
      <Header clicked={logoutHandler} />
      {!isUserLoggedIn ? (
        <Login
          submited={submitHandler}
          value={userValue}
          changed={changeValueHandler}
        />
      ) : (
        <MainContainer />
      )}
      {invalidUsername && (
        <p className={classes.P}>
          Username should include only english alphabetic characters
        </p>
      )}
    </Fragment>
  );
}

export default App;
