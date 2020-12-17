import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "../../css/MainPage/MediaBar.css";
import { ContentType } from "../../util/ContentTypes";

import RedirectLabel from "./RedirectLabel";
import { checkResponse } from "../../util/ResponseUtil";
import { getAuthName, getAuthToken } from "../../util/AuthenticationUtil";

export default function MediaBar(props) {
  const { changeContent } = props;

  const [channels, setChannels] = useState([
    { channelName: "", channelId: "" },
  ]);
  const [parties, setParties] = useState([{ name: "", id: "" }]);
  const [textInput, setTextInput] = useState({ channel: "", party: "" });

  useEffect(() => {
    // fetch channels of the user
    fetch("http://localhost:4000/api/user/getChannels", {
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
        setChannels(resArray);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error, could not fetch your created channels!");
      });

    // TODO fetch parties
    setParties([
      { name: "S3L4M", id: "234" },
      { name: "S52L4M", id: "3546346" },
      { name: "SL4M", id: "345345ewr" },
      { name: "SLAA4AM", id: "76tdgwe" },
    ]);
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.currentTarget;
    setTextInput({
      ...textInput,
      [name]: value,
    });
  };

  const handleNewChannel = () => {
    // check if not empty name
    if (textInput.channel === "") {
      toast.error("You cannot create channel with an empty name!");
      return;
    }

    // fetch, post request to add textInput.channel
    fetch("http://localhost:4000/api/channel/create", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getAuthToken(),
        username: getAuthName(),

        title: textInput.channel,
      }),
    })
      .then((r) => checkResponse(r))
      .then((r) => r.json())
      .then((r) => {
        setChannels([
          ...channels,
          { channelName: textInput.channel, channelId: r.data },
        ]);
        console.log(channels);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error, could not create channel!");
      });

    setTextInput({ ...textInput, channel: "" });
  };

  const handleNewParty = () => {
    // TODO fetch, post request to add textInput.party

    /*
    fetch("http://localhost:4000/api/channel/create", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                token: getAuthToken(),
                username: getAuthName(),
                
                title: textInput.party,
            
            }),
        })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
            console.log( r);
        })
        .catch((err) => {
            console.log(err);
            toast.error("error");
        });*/

    setParties([...parties, { name: textInput.party, id: "" }]); // TODO fetch id need to be returned from post and set here
    setTextInput({ ...textInput, party: "" });
  };

  const handleDeleteParty = (partyId) => {
    //TODO fetch delete party

    let temp = [];
    parties.forEach((party) => {
      if (partyId != party.id) temp.push(party);
    });
    setParties(temp);
  };

  const handleDeleteChannels = (channelId) => {
    let temp = [];
    channels.forEach((channel) => {
      if (channelId != channel.channelId) temp.push(channel);
    });

    // fetch delete channel
    fetch("http://localhost:4000/api/channel/delete", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getAuthToken(),
        username: getAuthName(),

        channelId: channelId,
      }),
    })
      .then((r) => checkResponse(r))
      .then((r) => r.json())
      .then((r) => {
        setChannels(temp);
        toast.success("Successfully deleted channel!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error, could not delete channel!");
      });
  };

  return (
    <div className="MediaBar">
      <div className="MediaSection">
        <div className="MediaChoiceContainer">
          <h3
            className="ClickableHeader3"
            onClick={() => {
              changeContent(ContentType.MOVIE);
            }}
          >
            Movies
          </h3>
        </div>

        <div className="MediaChoiceContainer">
          <h3
            className="ClickableHeader3"
            onClick={() => {
              changeContent(ContentType.TVSHOW);
            }}
          >
            TV-Series
          </h3>
        </div>

        <div className="MediaChoiceContainer">
          <h3>My Channels</h3>
        </div>
        <div className="ChannelScrollBar">
          {channels.map((channel, index) => (
            <RedirectLabel
              key={index}
              labelName={channel.channelName}
              onClickEvent={changeContent}
              type={ContentType.CHANNEL}
              labelId={channel.channelId}
              handleDelete={handleDeleteChannels}
            ></RedirectLabel>
          ))}
        </div>

        <div className="MediaChoiceContainer">
          <input
            className="w-75 mx-auto"
            type="text"
            name="channel"
            value={textInput.channel}
            onChange={handleChange}
          />
          <button onClick={handleNewChannel} className="w-75 mx-auto mt-1">
            Add Channel
          </button>
        </div>

        <div className="MediaChoiceContainer">
          <h3>My Parties</h3>
        </div>
        <div className="ChannelScrollBar">
          {parties.map((party, index) => (
            <RedirectLabel
              key={index}
              labelName={party.name}
              onClickEvent={changeContent}
              type={ContentType.PARTY}
              labelId={party.id}
              handleDelete={handleDeleteParty}
            ></RedirectLabel>
          ))}
        </div>

        <div className="MediaChoiceContainer">
          <input
            className="w-75 mx-auto"
            type="text"
            name="party"
            value={textInput.party}
            onChange={handleChange}
          />
          <button onClick={handleNewParty} className="w-75 mx-auto mt-1">
            Add Party
          </button>
        </div>
      </div>
    </div>
  );
}
