import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container, Divider } from "semantic-ui-react";

import Media from "../Media/Media";

export default function TVShowContents() {
  const [tvShowInformation, setTVShowInformation] = useState([]);

  useEffect(() => {
    // TODO fetch movies, then setTVShowInformation accordingly
    setTVShowInformation(["Talha", "Hakan", "Cevat", "Yusuf"]);
  }, []);

  return (
    <Container>
      <h1 className="text-center">TV Shows</h1>
      <div className="MovieGrid">
        {tvShowInformation.map((tvShowArg, index) => (
          <React.Fragment key={index}>
            <Divider />
            <Media mediaType={1} mediaName={tvShowArg}></Media>
          </React.Fragment>
        ))}
      </div>
    </Container>
  );
}
