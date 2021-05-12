import React, { Fragment } from "react";
import DetailedEpisode from "../components/DetailedEpisode/DetailedEpisode.js";
import { Route, Switch, Redirect } from "react-router-dom";
import AllEpisodes from "../components/AllEpisodes/AllEpisodes";
import Origin from "../components/Origin/Origin.js";
import Location from "../components/Location/Location.js";
import SearchCharacters from "../components/SearchCharacters/SearchCharacters";

const MainContainer = (props) => {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/all-episodes/?page=1" />
        </Route>
        <Route path="/all-episodes/">
          <AllEpisodes />
        </Route>
        <Route path="/detail/" exact>
          <DetailedEpisode />
        </Route>
        <Route path={`/origin/`} exact>
          <Origin />
        </Route>
        <Route path={`/location/`} exact>
          <Location />
        </Route>
        <Route path="/search/" exact>
          <SearchCharacters />
        </Route>
        <Route path="*">
          <h1>Page not found</h1>
        </Route>
      </Switch>
    </Fragment>
  );
};

export default MainContainer;
