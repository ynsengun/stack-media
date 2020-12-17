import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "../../css/MainPage/Home.css";
import "../../css/MainPage/FriendsBar.css";

export default function FriendLabel(props) {
  const { friendName, movieName, lastWatchedDate, handleDeleteFriend } = props;

  return (
    <Container>
      <div className="FriendContainer">
        <h4 className="">
          {friendName}{" "}
          <button
            className="btn btn-danger btn-sm float-right"
            onClick={() => {
              handleDeleteFriend(friendName);
            }}
          >
            x
          </button>
        </h4>
        <p>Last Watched: {movieName}</p>
        <p>On: {lastWatchedDate === null ? "-" : lastWatchedDate}</p>
      </div>
    </Container>
  );
}
