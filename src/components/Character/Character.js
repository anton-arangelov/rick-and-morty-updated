import React from 'react'
import classes from './Character.module.css'
import { Link } from "react-router-dom";

const Character = (props) => {
  return (
    <div className={classes.Paragraph}>
      <div className={classes.ColumnOne}>
        <p>Name - {props.el.name} </p>
        <p># - {props.characters.indexOf(props.el) + 1}</p>
        <div>
          <p>Status - {props.el.status}</p>
          <p>Species - {props.el.species}</p>
          {props.shouldNavigateOrigin ? (
            <Link
              className={classes.Link}
              to={`/origin/?originId=${props.el.origin.url.split("/").pop()}`}
            >
              Origin - {props.el.origin.name}. Click to see origin
            </Link>
          ) : (
            <p>Origin - {props.el.origin.name}</p>
          )}
          {props.shouldNavigateLocation ? (
            <Link
              className={classes.Link}
              to={`/location/?locationId=${props.el.location.url.split("/").pop()}`}
            >
              Location - {props.el.location.name}. Click to see location
            </Link>
          ) : (
            <p>Location - {props.el.location.name}.</p>
          )}

          <p>Gender - {props.el.gender}</p>
        </div>
      </div>
      <div className={classes.ColumnTwo}>
        <img src={props.el.image} alt="CharacterImage" />
      </div>
    </div>
  );
};

export default Character
