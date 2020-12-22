import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";

import WatchedMediaImage from "../images/mediaToWatch.png";
import { checkResponse } from "../util/ResponseUtil";
import { getAuthName, getAuthToken } from "../util/AuthenticationUtil";
import Comment from "./Media/Comment";
import MediaBox from "./MediaBox";
import Search from "./Search";

import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:4000";

export default function PartyPage() {
  const [progress, setProgress] = useState(0);
  const [buttonActive, setButtonActive] = useState({
    watch: true,
    finish: false,
  });
  const [partyId, setpartyId] = useState("");
  const [partyName, setpartyName] = useState("");
  const [commentText, setCommentText] = useState(""); // this is chat text to send
  const [participants, setParticipants] = useState([]);
  const [chat, setChat] = useState([]); // this is complete chat
  const [participantText, setParticipantText] = useState("");
  const [isCreator, setCreator] = useState(false);
  const [mediaSelectActive, setMediaSelectActive] = useState(false);
  const [mediaId, setmediaId] = useState("");
  const [mediaName, setmediaName] = useState("");
  const [msg, setNewMsg] = useState(null);

  const history = useHistory();

  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    let path = history.location.pathname.substring(7);
    setpartyId(path);

    const unListen = history.listen(() => {
      let path = history.location.pathname.substring(7);
      setpartyId(path);

      window.scrollTo(0, 0);
    });

    return () => {
      unListen();
    };
  }, []);

  useEffect(() => {
    if (partyId != "") {
      // fetch the party name
      fetch("http://localhost:4000/api/party/getParties", {
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
          for (let i = 0; i < resArray.length; i++) {
            if (resArray[i].partyId === partyId) {
              setpartyName(resArray[i].name);
              break;
            }
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error, could not fetch your created parties!");
        });

      // fetch party participants
      fetch("http://localhost:4000/api/party/getParticipants", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getAuthToken(),
          username: getAuthName(),

          partyId: partyId,
        }),
      })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
          setParticipants(r.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error, could not get party members!");
        });

      socket.emit("join", {
        partyId: partyId,
        username: getAuthName(),
        token: getAuthToken(),
      });

      socket.on("hello-world", (data) => {
        console.log("sockett", socket);
        console.log("hellooooo", data);
      });

      socket.on("watch-response", (data) => {
        if (data.response.status == 200 && data.partyId == partyId) {
          console.log("watch-response", data);
          setProgress(data.response.data.progress);
        }
      });

      socket.on("join-response", (data) => {
        if (data.response.status == 200 && data.partyId == partyId) {
          console.log("join-response", data);
          // TODO welcome message
          setNewMsg( { name: "", text: `${data.response.data.username} joined party`, } );
        //   let temp = [...chat];
        //   temp.push({
        //     name: "",
        //     text: `${data.response.data.username} joined party`,
        //   });
        //   setChat(temp);
        }
      });

      socket.on("set-media-response", (data) => {
        if (data.response.status == 200 && data.partyId == partyId) {
          console.log("set-media-response", data);
          setmediaId(data.response.data.mediaId);
        }
      });

      socket.on("send-message-response", (data) => {
        console.log("send-message-response", data);
        if (data.response.status == 200 && data.partyId == partyId) {
          console.log("send-message-response", data);
          console.log("chattttt ", chat);
          
          setNewMsg( { name: data.response.data.username, text: data.response.data.message, } );
          /*let temp = [...chat];
          temp.push({
            name: data.response.data.username,
            text: data.response.data.message,
          });
          setChat(temp);*/
        }
      });

      socket.on("take-out-response", (data) => {
        console.log("take-out-response", data);
        if (data.response.status == 200 && data.partyId == partyId) {
            
            setNewMsg( { name: "", text: `${data.response.data.otherUsername} has been kicked out`, } );
            //setNewMsg( data.response.data);
            /*let temp = [...chat];
          temp.push({
            name: "",
            text: `${data.response.data.otherUsername} has been kicked out`,
          });
          setChat(temp);*/
        }
      });

      // setProgress(0);
      setButtonActive({ watch: true, finish: false });
    }
  }, [partyId]);

  useEffect(() => {
    console.log("chchchchhchchhch", chat); // ?????????
  }, [chat]);

  useEffect(() => {
      if ( msg !== null)
      {
        let temp = [...chat];
        temp.push( msg );
        setChat(temp);
      }
  }, [msg]);


  useEffect(() => {
    if (progress === 3) {
      // TODO fetch, update progress when how movie will be set determined!
      setButtonActive({ watch: false, finish: true });
    }
    if (progress === 4) {
      // TODO fetch, update finish when how movie will be set determined!
      setButtonActive({ watch: false, finish: false });
    }
  }, [progress]);

  useEffect(() => {
    for (let i = 0; i < participants.length; i++) {
      if (
        participants[i].username == getAuthName() &&
        participants[i].role === "ROLE_CREATOR"
      ) {
        setCreator(true);
        socket.emit("watch", {
          token: getAuthToken(),
          partyId: partyId,
          username: getAuthName(),
          progress: 0,
        });
      }
    }
  }, [participants]);

  const progressBar = (index) => {
    return (
      <div
        style={{
          display: "inline-block",
          width: index === 3 ? "34%" : "33%",
          height: "100%",
          backgroundColor: progress < index ? "gray" : "#303030",
          border: "1px black solid",
        }}
      />
    );
  };

  const handleChange = (e) => {
    const { value, name } = e.currentTarget;
    if (name === "commentText") {
      setCommentText(value);
    }
    if (name === "participantText") {
      setParticipantText(value);
    }
  };

  const handleCommentSend = () => {
    socket.emit("send-message", {
      partyId: partyId,
      username: getAuthName(),
      message: commentText,
      token: getAuthToken(),
    });
    // setChat([...chat, { name: getAuthName(), text: commentText }]);
  };

  const handleNewParticipant = () => {
    // fetch party participants
    fetch("http://localhost:4000/api/party/inviteParticipant", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getAuthToken(),
        username: getAuthName(),

        invitedUsername: participantText,
        partyId: partyId,
      }),
    })
      .then((r) => checkResponse(r))
      .then((r) => r.json())
      .then((r) => {
        setParticipantText("");
        toast.success("User successfully invited to the party!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error, could not invite the user to the party!");
      });
  };

  const handleDeleteParticipant = (clicked) => {
    // TODO take-out when kick out
    console.log(clicked);
    socket.emit("take-out", {
      token: getAuthToken(),
      partyId: partyId,
      username: getAuthName(),
      participantUsername: clicked.username,
    });

    // let temp = [];
    // participants.forEach((participant) => {
    //   if (clicked != participant) temp.push(participant);
    // });
    // setParticipants(temp);
  };

  const handleMediaSelect = (mediaId, mediaName) => {
    console.log(mediaId);

    socket.emit("set-media", {
      partyId: partyId,
      username: getAuthName(),
      mediaId: mediaId,
      token: getAuthToken(),
    });

    setMediaSelectActive(false); // TODO
    // setmediaId(mediaId);
    // setmediaName(mediaName);
  };

  return (
    <div className="row">
      <div className="col-9" style={{ borderRight: "2px solid black" }}>
        <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
          <h1 className="h1 text-center mb-4 text-black">Party: {partyName}</h1>
          <div className="card bg-secondary">
            <h1 className="h1 text-center mt-5 text-white">{mediaId}</h1>
            <div
              style={{
                height: "40vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "-50px",
              }}
            >
              <button
                className={`btn btn-success btn-lg p-5 w-25 ${
                  !buttonActive.watch && "disabled"
                }`}
                onClick={() => {
                  if (isCreator && progress < 3)
                    socket.emit("watch", {
                      token: getAuthToken(),
                      partyId: partyId,
                      username: getAuthName(),
                      progress: progress + 1,
                    });
                }}
              >
                Watch
              </button>
              <button
                className={`btn btn-danger btn-lg p-5 w-25 ${
                  !buttonActive.finish && "disabled"
                }`}
                onClick={() => {
                  if (isCreator && progress === 3)
                    socket.emit("watch", {
                      token: getAuthToken(),
                      partyId: partyId,
                      username: getAuthName(),
                      progress: progress + 1,
                    });
                }}
              >
                Finish
              </button>
            </div>
            <div style={{ height: "20px" }}>
              {progressBar(1)}
              {progressBar(2)}
              {progressBar(3)}
            </div>
          </div>

          {isCreator &&
            (mediaSelectActive ? (
              <div className="mt-4">
                <Search isParty={true} handleMediaSelect={handleMediaSelect} />
              </div>
            ) : (
              <button
                className="mt-4 btn btn-primary w-100"
                onClick={() => {
                  setMediaSelectActive(true);
                }}
              >
                Choose Media
              </button>
            ))}

          <div className="mt-4">
            <div className="card bg-white p-5">
              <h3>Chat</h3>
              <div
                className="border p-3"
                style={{ height: "25vh", overflowY: "scroll" }}
              >
                {chat.map((entry) => (
                  <div className="mt-1">
                    <span className="h5">
                      {entry.name == "" ? "" : entry.name + ": "}
                    </span>
                    <span>{entry.text}</span>
                    <br />
                  </div>
                ))}
              </div>
              <div>
                <textarea
                  className="w-100 mt-4"
                  value={commentText}
                  onChange={handleChange}
                  name="commentText"
                />
                <button
                  className="btn btn-sm btn-success w-100 my-2"
                  onClick={() => {
                    handleCommentSend();
                    setCommentText("");
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-3 p-4">
        <h1 className="h1">Participants</h1>
        <hr />
        {participants.map((participant) => (
          <h3 className="h3 w-75">
            {participant.username}{" "}
            {isCreator && participant.username !== getAuthName() && (
              <button
                className="btn btn-danger btn-sm float-right"
                onClick={() => {
                  handleDeleteParticipant(participant);
                }}
              >
                x
              </button>
            )}
            {participant.role == "ROLE_CREATOR" && <label>Creator</label>}
          </h3>
        ))}
        <input
          value={participantText}
          onChange={handleChange}
          className="w-75 mt-3"
          name="participantText"
        />
        <button
          className="btn btn-primary w-75 mt-2"
          onClick={handleNewParticipant}
        >
          Add participant
        </button>
      </div>
    </div>
  );
}
