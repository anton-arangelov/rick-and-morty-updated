import React from "react";
import classes from "./Episode.module.css";
import { Link } from "react-router-dom";

const Episode = (props) => {
  return (
    <Link className={classes.Episode} to={`/detail/?episodeId=${props.id}`}>
      <p>
        The name of the episode #{props.id} is {props.name}
      </p>
      <p>This episode was aired on {props.airDate}</p>
    </Link>
  );
};

export default Episode;
