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
    // TODO fetch movies, then set setMovieInformation accordingly, PROGRESS: fetching is done, server must return genre-preferred media!
    fetch("http://localhost:4000/api/media/getMoviesWithPreference", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
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
        let resArray = r.data;
        setMovieInformation( resArray);
        console.log( resArray);
    })
    .catch((err) => {
        console.log(err);
        toast.error("Error, movies based on your genre preference cannot be loaded!");
    });
  }, []);

  return (
    <Container>
      <h1 className="text-center">Movies</h1>
      <div className="MovieGrid">
        {movieInformation.map((movieArgs, index) => (
          <Media
            key={index}
            mediaId={movieArgs.mediaId}
            mediaType={0}
            mediaName={movieArgs.name}
            pageType={1}
          ></Media>
        ))}
      </div>
    </Container>
  );
}
