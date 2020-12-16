import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "../../css/MainPage/Home.css";
import "../../css/MainPage/FriendsBar.css";

import FriendLabel from "./FriendLabel";

export default function FriendsBar() {
  const [friends, setFriends] = useState([{}]);
  const [textInput, setTextInput] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.currentTarget;
    setTextInput(value);
  };

  useEffect(() => {
    // TODO fetch friends with their last watch

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
    // TODO fetch add new friend, if valid then fetch its last watch

    setFriends([...friends, { name: textInput, lastWatch: "aa" }]);
    setTextInput(""); // to reset the input text field
  };

  const handleDeleteFriend = (friendName) => {
    //TODO fetch delete friend

    let temp = [];
    friends.forEach((friend) => {
      if (friendName != friend.name) temp.push(friend);
    });
    setFriends(temp);
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
