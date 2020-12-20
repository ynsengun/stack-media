import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container, Divider } from "semantic-ui-react";

import Media from "../Media/Media";
import { checkResponse } from "../../util/ResponseUtil";
import { getAuthName, getAuthToken } from "../../util/AuthenticationUtil";

export default function TVShowContents() {
  const [tvShowInformation, setTVShowInformation] = useState([]);

  useEffect(() => {

    // fetch TV SHOWS
    fetch("http://localhost:4000/api/media/getSeries", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getAuthToken(),
          username: getAuthName(),
        }),
      })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
          let resArray = r.data;
          console.log("FOUND TV SERIES:");
          console.log( resArray);
          setTVShowInformation( resArray);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error, could not get TV-shows!");
        });
  }, []);

  return (
    <Container>
      <h1 className="text-center">TV Shows</h1>
      <div className="MovieGrid">
        {tvShowInformation.map((tvShowArg, index) => (
          <Media
            key={index}
            mediaType={1}
            mediaName={tvShowArg.TVSerieName}
            pageType={1}
          ></Media>
        ))}
      </div>
    </Container>
  );
}
