import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container, Card } from "semantic-ui-react";

import { checkResponse } from "../util/ResponseUtil";
import { getAuthName, getAuthToken } from "../util/AuthenticationUtil";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  //{ isFriend: false, name: "", id: "" }

  useEffect(() => {
    // fetch friendship notifications
    fetch("http://localhost:4000/api/user/getFriendshipInvitations", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getAuthToken(),
          username: getAuthName(),
        }),
      })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
          let resArray = r.data;
          console.log( r.data);
          let newFriendNotifications = [ ...notifications ];
          for ( let i = 0; i < resArray.length; i++)
          {
            newFriendNotifications.push( { isFriend: true, name: resArray[ i].inviterUsername, id: resArray[ i].inviterUsername } );
          }
          setNotifications( newFriendNotifications)
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error, could not get friend requests!");
        });

    // TODO fetch party notifications
    fetch("http://localhost:4000", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getAuthToken(),
          username: getAuthName(),
        }),
      })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
          let resArray = r.data;
          console.log( r.data);
        //   let newFriendNotifications = [ ...notifications ];
        //   for ( let i = 0; i < resArray.length; i++)
        //   {
        //     newFriendNotifications.push( { isFriend: false, name: resArray[ i].inviterUsername, id: resArray[ i].inviterUsername } );
        //   }
        //   setNotifications( newFriendNotifications)
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error, could not get friend requests!");
        });

    // setNotifications([
    //   { isFriend: false, name: "discoksjd party", id: "" },
    //   { isFriend: false, name: "disco party2", id: "" },
    //   { isFriend: true, name: "friend2", id: "" },
    // ]);
  }, []);

  const handleYes = (clickedNotification) => {

    let temp = [];
    notifications.forEach((notification) => {
      if (notification !== clickedNotification) temp.push(notification);
    });

    if ( clickedNotification.isFriend) // add to friendship
    {
        fetch("http://localhost:4000/api/user/acceptFriendshipInvitation", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: getAuthToken(),
              username: getAuthName(),
                
              inviterUsername: clickedNotification.id,
            }),
          })
            .then((r) => checkResponse(r))
            .then((r) => r.json())
            .then((r) => {
              setNotifications( temp);
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error, could not accept friend request!");
            });
    }
    else // TODO add to party
    {
        // fetch("http://localhost:4000/api/user/getFriendshipInvitations", {
        //     method: "POST",
        //     mode: "cors",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       token: getAuthToken(),
        //       username: getAuthName(),
        //     }),
        //   })
        //     .then((r) => checkResponse(r))
        //     .then((r) => r.json())
        //     .then((r) => {

        //       setNotifications(temp);
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //       toast.error("Error, could not accept party invitaion!");
        //     });
    }
  };

  const handleNo = (clickedNotification) => {
    let temp = [];
    notifications.forEach((notification) => {
      if (notification !== clickedNotification) temp.push(notification);
    });

    // fetch reject relation
    if ( clickedNotification.isFriend ) // reject friend request
    {
        fetch("http://localhost:4000/api/user/refuseFriendshipInvitation", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: getAuthToken(),
              username: getAuthName(),
                
              inviterUsername: clickedNotification.id,
            }),
          })
            .then((r) => checkResponse(r))
            .then((r) => r.json())
            .then((r) => {
              setNotifications( temp);
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error, could not reject friend request!");
            });
    }
    else // TODO reject party request
    {
        // fetch("http://localhost:4000/api/user/getFriendshipInvitations", {
        //     method: "POST",
        //     mode: "cors",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       token: getAuthToken(),
        //       username: getAuthName(),
        //     }),
        //   })
        //     .then((r) => checkResponse(r))
        //     .then((r) => r.json())
        //     .then((r) => {
        //       let resArray = r.data;
        //       let newFriendNotifications = [];
        //       for ( let i = 0; i < resArray.length; i++)
        //       {
        //         newFriendNotifications.append( { isFriend: true, name: resArray[ i], id: resArray[ i] } );
        //       }
        //       setNotifications(temp);
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //       toast.error("Error, could not reject party request!");
        //     });
    }
  };

  const getNotification = (notification) => {
    return (
      <div className={"card bg-light p-1 mt-2"}>
        <div className="row">
          <div className="col-6">
            <span className="h5" style={{ height: "30px", lineHeight: "30px" }}>
              {notification.isFriend ? "Friend: " : "Party: "}
            </span>
            {notification.name}
          </div>
          <div className="col-3">
            <button
              className="btn btn-success w-100"
              onClick={() => {
                handleYes(notification);
              }}
            >
              Y
            </button>
          </div>
          <div className="col-3">
            <button
              className="btn btn-danger w-100"
              onClick={() => {
                handleNo(notification);
              }}
            >
              N
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card className="text-center p-2" style={{ width: "30vw" }}>
        <h3 className="text-center h3">Invitations</h3>
        { notifications.length > 0 && notifications.map((notification) => getNotification(notification))}
        { notifications.length == 0 && <label>You do not have any new notifications</label>}
      </Card>
    </div>
  );
}
