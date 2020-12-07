import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "../../css/MainPage/MovieContents.css";

import Home from "../Home.js";
import Media from "../Media/Media";

export default function MovieContents() {
  const [movieInformation, setMovieInformation] = useState([]);

  useEffect(() => {
    // TODO fetch movies, then set setMovieInformation accordingly
    setMovieInformation(["CS353", "CS342", "CS465", "CS491"]);
  }, []);

  return (
    <Container>
      <h1>Movies</h1>
      <hr></hr>
      <div className="MovieGrid">
        {movieInformation.map((movieArg, index) => (
          <Media key={index} mediaType={0} mediaName={movieArg}></Media>
        ))}
      </div>
    </Container>
  );
}
