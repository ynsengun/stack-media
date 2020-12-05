import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "../../css/MainPage/Home.css";
import "../../css/MainPage/FriendsBar.css";

export default function FriendLabel(props) {
  return (
    <Container>
        <div className="FriendContainer">
            <h4 className="">{props.friendName}</h4>
            <p>Last Watched: {props.movieName}</p>
        </div>
    </Container>
  );
}
