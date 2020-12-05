import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Media from "../Media/Media";

export default function ChannelContents(props) {
  return (
    <Container>
        <h1>Channel {props.contentArgs.name}</h1>
        <label>Channel Genre:</label>
        <select name="channelGenre" id="channelGenreSelectorID" multiple>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="horror">Horror</option>
        </select>
        <div>
            <button>Add to channel</button>
        </div>
        <h1>My Media</h1>
        <hr></hr>
        <div>
        {
            props.contentArgs.movieContents.map( (movie) => (
                <Media
                    mediaName = {movie}
                    mediaType = {1}
                ></Media>
            ))
        }
        </div>
        
        <h1>Suggestion</h1>
        <hr></hr>
        <div>
        {
            props.contentArgs.suggestedMedia.map( (movie) => (
                <Media
                    mediaName = {movie}
                    mediaType = {1}
                ></Media>
            ))
        }
        </div>
    </Container>
  );
}
