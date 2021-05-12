import React, { Fragment } from "react";
import Character from "../../Character/Character";

const LoopThroughSameItems = (props) => {
  const characters = props.characters;
  return (
    <Fragment>
      {characters.map((el) => {
        return (

          <Character
          key={el.id}
            el={el}
            characters={characters}
            shouldNavigateOrigin={props.shouldNavigateOrigin}
            shouldNavigateLocation={props.shouldNavigateLocation}
          />
        );
      })}
    </Fragment>
  );
};

export default LoopThroughSameItems;
