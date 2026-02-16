import React from "react";
import Width from "./Width";
import Height from "./Height";

function DisplayInfoOne(props) {
  return (
    <div className="meme borderBlue">
      <Width width={props.width} />
      <Height height={props.height} />
    </div>
  );
}

export default DisplayInfoOne;
