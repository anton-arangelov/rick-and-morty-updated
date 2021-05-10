import React, { Fragment } from "react";
import classes from "./LoopThroughCharacters.module.css";
import { Link } from "react-router-dom";

const LoopThroughSameItems = (props) => {
  const characters = props.characters;
  const clicked = () => {
    localStorage.removeItem("selectedPage");
  };
  return (
    <Fragment>
      {characters.map((el) => {
        return (
          <div key={el.id}>
            <div className={classes.Paragraph}>
              <div className={classes.ColumnOne}>
                <p>Name - {el.name}</p>
                <div>
                  <p>Status - {el.status}</p>
                  <p>Species - {el.species}</p>
                  {props.shouldNavigateOrigin ? (
                    <Link
                      className={classes.Link}
                      to={`/origin/${el.origin.url.split("/").pop()}/1`}
                      onClick={clicked}
                    >
                      Origin - {el.origin.name}. Click to see origin
                    </Link>
                  ) : (
                    <p>Origin - {el.origin.name}</p>
                  )}
                  {props.shouldNavigateLocation ? (
                    <Link
                      className={classes.Link}
                      to={`/location/${el.location.url.split("/").pop()}/1`}
                      onClick={clicked}
                    >
                      Location - {el.location.name}. Click to see location
                    </Link>
                  ) : (
                    <p>Location - {el.location.name}.</p>
                  )}

                  <p>Gender - {el.gender}</p>
                </div>
              </div>
              <div className={classes.ColumnTwo}>
                <img src={el.image} alt="CharacterImage" />
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default LoopThroughSameItems;
