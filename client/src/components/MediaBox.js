import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import MovieLogo from "../images/MovieIcon.png";
import TVShowLogo from "../images/TVShowIcon.png";

export default function MediaBox(props) {
  const { mediaType, mediaName } = props;

  const history = useHistory();

  return (
    <div className="card p-3 mr-4 mt-4">
      <a
        onClick={() => {
          history.push(`/media/${mediaName}`);
        }}
      >
        <img
          src={mediaType == 0 ? MovieLogo : TVShowLogo}
          className="w-75 ml-5"
        ></img>
      </a>
      <h3 className="h3 text-center d-inline-block">{mediaName}</h3>
    </div>
  );
}
