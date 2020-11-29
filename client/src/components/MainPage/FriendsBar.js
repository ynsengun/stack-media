import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "../../css/MainPage/Home.css";
import "../../css/MainPage/FriendsBar.css";

import FriendLabel from "./FriendLabel";

export default function FriendsBar() {
  return (
    <Container>
        <div className="FriendsBar">
                <div style={ {width: 300, height: 600}} className="MediaSection">
                    
                    <div className="MediaChoiceContainer">
                        <h3 className="Header3">Friends</h3>
                    </div>
                    <div className="FriendsScroolBar">
                        <FriendLabel
                            friendName = {"Cevat"}
                            movieName = {"CS353"}
                        >
                        </FriendLabel>
                        <FriendLabel
                            friendName = {"Cevat"}
                            movieName = {"CS353"}
                        >
                        </FriendLabel>
                        <FriendLabel
                            friendName = {"Cevat"}
                            movieName = {"CS353"}
                        >
                        </FriendLabel>
                        <FriendLabel
                            friendName = {"Cevat"}
                            movieName = {"CS353"}
                        >
                        </FriendLabel>
                        <FriendLabel
                            friendName = {"Cevat"}
                            movieName = {"CS353"}
                        >
                        </FriendLabel>
                        <FriendLabel
                            friendName = {"Cevat"}
                            movieName = {"CS353"}
                        >
                        </FriendLabel>
                        <FriendLabel
                            friendName = {"Cevat"}
                            movieName = {"CS353"}
                        >
                        </FriendLabel>
                        <FriendLabel
                            friendName = {"Cevat"}
                            movieName = {"CS353"}
                        >
                        </FriendLabel>
                    </div>

                    <div className="MediaChoiceContainer">
                        <input type="text" style={ {width: 150}}></input>
                        <button>Add Friend</button>
                    </div>

                </div>
            </div>
    </Container>
  );
}
