import React from "react";

function Url(props) {
  return (
    <p>
      Url: <a href={props.url}>{props.url}</a>
    </p>
  );
}

export default Url;
