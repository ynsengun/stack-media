import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "../../css/MainPage/Home.css";
import "../../css/MainPage/FriendsBar.css";

import FriendLabel from "./FriendLabel";
import { checkResponse } from "../../util/ResponseUtil";
import { getAuthName, getAuthToken } from "../../util/AuthenticationUtil";

export default function FriendsBar() {
  const [friends, setFriends] = useState([{}]);
  const [textInput, setTextInput] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.currentTarget;
    setTextInput(value);
  };

  useEffect(() => {
    // TODO fetch friends of the user with their last watch => wait server
    // fetch("http://localhost:4000/api/user/getFriendActivities", {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     token: getAuthToken(),
    //     username: getAuthName(),
    //   }),
    // })
    //   .then((r) => checkResponse(r))
    //   .then((r) => r.json())
    //   .then((r) => {
    //     let resArray = r.data;
    //     console.log( resArray);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast.error("Error, could not load your friends!");
    //   });

    setFriends([
      {
        name: "friend1",
        lastWatch: "watch1",
      },
      {
        name: "friend2",
        lastWatch: "watch1",
      },
      {
        name: "friend3",
        lastWatch: "watch1",
      },
    ]);
  }, []);

  const handleNewFriend = () => {
    // fetch add new friend
    console.log( "Add new friend!");
    fetch("http://localhost:4000/api/user/sendFriendshipInvitation", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getAuthToken(),
        username: getAuthName(),

        invitedUsername: textInput,
      }),
    })
      .then((r) => checkResponse(r))
      .then((r) => r.json())
      .then((r) => {
        toast.success( "Friendship request is sent!");
        setTextInput(""); // to reset the input text field
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error, could not send friendship request!");
      });

    // setFriends([...friends, { name: textInput, lastWatch: "aa" }]);
    // setTextInput(""); // to reset the input text field
  };

  const handleDeleteFriend = (friendName) => {
    
    let temp = [];
    friends.forEach((friend) => {
      if (friendName != friend.name) temp.push(friend);
    });
    
    //TODO fetch delete friend => wait for server to implement getFriendActivities to actually test it
    fetch("http://localhost:4000/api/user/removeFriend", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getAuthToken(),
        username: getAuthName(),

        friendUsername: friendName,
      }),
    })
      .then((r) => checkResponse(r))
      .then((r) => r.json())
      .then((r) => {
        toast.success( "Friend " + friendName + " is successfully removed!");
        setFriends(temp);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error, could not remove friend " + friendName + "!");
      });
  };

  return (
    <div className="FriendsBar">
      <div className="MediaSection">
        <div className="MediaChoiceContainer">
          <h3 className="Header3">Friends</h3>
        </div>
        <div className="FriendsScroolBar">
          {friends.map((friend) => (
            <FriendLabel
              friendName={friend.name}
              movieName={friend.lastWatch}
              handleDeleteFriend={handleDeleteFriend}
            ></FriendLabel>
          ))}
        </div>

        <div className="MediaChoiceContainer">
          <input
            className="w-75 mx-auto"
            type="text"
            name="friendText"
            value={textInput}
            onChange={handleChange}
          />
          <button onClick={handleNewFriend} className="w-75 mx-auto mt-1">
            Add Friend
          </button>
        </div>
      </div>
    </div>
  );
}
