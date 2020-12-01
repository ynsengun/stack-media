import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Checkbox, Container } from "semantic-ui-react";

export default function Comment(props) {

    function handleUpvote(event)
    {
        console.log( "Pressed upvote checkbox");
    };

    return (
        <Container>
            <div>
                <label>Who made the comment</label>
                <div>
                    <textarea id="mediaDescriptionInputID" rows="3" cols="30" disabled>Sample comment here!</textarea>
                    <label><Checkbox onClick={handleUpvote}></Checkbox>Upvote</label>
                </div>
            </div>
        </Container>
  );
}