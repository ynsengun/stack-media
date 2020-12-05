import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "../../css/MainPage/MovieContents.css";

import Home from "../Home.js";
import Media from "../Media/Media";

export default function MovieContents(props) {
    
    return (
		<Container>
			<h1>Movies</h1>
            <hr></hr>
            <div className="MovieGrid">
                {
                    props.contentArgs.map( (movieArg) => (
                        <div>
                            <Media
                                mediaType = {0}
                                mediaName = {movieArg}
                            ></Media>
                        </div>
                    ))
                }
            </div>
		</Container>
	);
}
