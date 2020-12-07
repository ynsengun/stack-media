import React from "react";
import { Container } from "semantic-ui-react";
import MovieLogo from "../../images/MovieIcon.png";
import TVShowLogo from "../../images/TVShowIcon.png";

import "../../css/Media.css";

export default function Media(props) {
  const { mediaType, mediaName } = props;

  const loadMediaPage = () => {
    // TODO redirect to media page, use useHistory hook
    console.log("Loading media page...");
  };

  return (
    <div className="row">
      <div className="col-1" />
      <div className="col-4">
        <img
          src={mediaType == 0 ? MovieLogo : TVShowLogo}
          className="w-100"
        ></img>
      </div>
      <div className="col-2" />
      <div className="col-5">
        <h3 className="h3" style={{ marginTop: "70px" }}>
          {mediaName}
        </h3>
        <button className="btn btn-primary btn-lg mt-5" onClick={loadMediaPage}>
          Watch
        </button>
      </div>
    </div>
  );
}
