import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Home from "../Home.js";
import Media from "../Media/Media";

export default function TVShowContents(props) {
  return (
    <Container>
        	<h1>TV Shows</h1>
            <hr></hr>
            <div className="MovieGrid">
                {
                    props.contentArgs.map( (tvShowArg) => (
                        <div>
                            <Media
                                mediaType = {1}
                                mediaName = {tvShowArg}
                            ></Media>
                        </div>
                    ))
                }
            </div>
    </Container>
  );
}
