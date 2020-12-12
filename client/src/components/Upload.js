import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { checkResponse } from "../util/ResponseUtil";
import {  getAuthToken } from "../util/AuthenticationUtil";

export default function Upload() {
    
    function handleUploadButtonPress(event)
    {
        fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
        {
            token: getAuthToken(),
            // username: nameArg,
            // password: passArg,
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
    };
    
    return (
    <Container>
        <div style={ {textAlign: "center"}}>
		    <h1>Media Information</h1>
			<div>
                <label>Media Name:</label>
				<input
					type="text"
					id="mediaNameInputID"
				></input>
			</div>
            <div>
                <label>Channel Genre:</label>
                <select name="mediaGenre" id="mediaGenreSelectorID" multiple>
                    <option value="action">Action</option>
                    <option value="adventure">Adventure</option>
                    <option value="comedy">Comedy</option>
                    <option value="drama">Drama</option>
                    <option value="horror">Horror</option>
                </select>
            </div>
			<div>
				<label>Description:</label>
                <textarea id="mediaDescriptionInputID" rows="3" cols="30"></textarea>
			</div>
            <div>
                <label>TV-Serie Name (left blank if not serie):</label>
                <input
					type="text"
					id="mediaTVSerieNameInputID"
				></input>
            </div>
            <div>
                <label>Season (left blank if not serie):</label>
                <input
                   type="text"
                    id="mediaSeasonInputID"
                ></input>
            </div>
            <div>
                <label>Episode (left blank if not serie):</label>
                <input
                   type="text"
                    id="mediaEpisodeInputID"
                ></input>
            </div>
			<div>
				<button onClick={handleUploadButtonPress}>Upload Media</button>
			</div>
        </div>
    </Container>
  );
}
