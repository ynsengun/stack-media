import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";

import WatchedMediaImage from "../images/mediaToWatch.png";

import Comment from "./Media/Comment";

export default function MediaPage(props) {
  
    function handleWatchButtonPress(event)
    {
        var progress = document.getElementById( "watchedProgressID");
        progress.value = progress.value + 34;

        if ( progress.value == "100")
        {
            document.getElementById( "finishMediaButtonID").disabled = false;
        }
    };

    function handleFinishButtonPress(event)
    {

    };
  
    return (
    <Container>
        <div style={ {overflow: "hidden"}}>
            <div style={{float: "left"} }>
                <div>
                    <h1>{"USe the media name here"}</h1>
                    <img src={WatchedMediaImage} width={300} height={300}></img>
                </div>
                <div>
                    <button id="watchMediaButtonID" onClick={handleWatchButtonPress}>Watch</button>
                    <progress id="watchedProgressID" value="0" max="100"></progress>
                    <button id="finishMediaButtonID" onClick={handleFinishButtonPress} disabled>Finish</button>
                </div>
                <div>
                    <label>Rating:</label>
                    <select name="mediaRating" id="mediaRatingInputID" disabled>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <hr></hr>
                <div>
                    <h1>Comments</h1>
                    <Comment commentID={0} upvoted={true}></Comment>
                    <Comment commentID={1}></Comment>
                    <Comment commentID={2}></Comment>
                    <Comment commentID={3} upvoted={true}></Comment>
                </div>
            </div>
            <div style={{float: "left"}}>
                anan
            </div>
        </div>
    </Container>
  );
}
