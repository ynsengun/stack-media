import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container, Divider } from "semantic-ui-react";

import "../../css/MainPage/MovieContents.css";
import { checkResponse } from "../../util/ResponseUtil";
import { getAuthName, getAuthToken } from "../../util/AuthenticationUtil";
import Media from "../Media/Media";

export default function MovieContents() {
  const [movieInformation, setMovieInformation] = useState([]);

  useEffect(() => {
    // TODO fetch movies, then set setMovieInformation accordingly
    console.log( "REquesting movies");
    fetch("http://localhost:4000/api/media/getMovies", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            // token: getAuthToken(),
            // username: getAuthName(),
        },
        body: JSON.stringify(
        {
            token: getAuthToken(),
            username: getAuthName(),
        }),
    })
    .then((r) => checkResponse(r))
    .then((r) => r.json())
    .then((r) => {
        console.log( r);
    })
    .catch((err) => {
        console.log(err);
        toast.error("error");
    });

    console.log("moviecontent");
    setMovieInformation(["CS353", "CS342", "CS465", "CS491"]);
  }, []);

  return (
    <Container>
      <h1 className="text-center">Movies</h1>
      <div className="MovieGrid">
        {movieInformation.map((movieArg, index) => (
          <Media
            key={index}
            mediaType={0}
            mediaName={movieArg}
            pageType={1}
          ></Media>
        ))}
      </div>
    </Container>
  );
}
