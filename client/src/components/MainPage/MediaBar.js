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
  const [parties, setParties] = useState([{ partyName: "", partyId: "" }]);
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

    // fetch parties
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
        console.log( "My parties:");
        console.log( resArray);
        let myParties = [];
        for ( let i = 0; i < resArray.length; i++)
        {
            myParties.push( { partyName: resArray[i].name, partyId: resArray[i].partyId});
        }
        setParties( myParties);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error, could not fetch your created parties!");
      });
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
        //console.log(channels);
        setTextInput({ ...textInput, channel: "" });
        toast.success( "Successfully created channel!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error, could not create channel!");
      });
  };

  const handleNewParty = () => {
    
    if ( textInput.party === "")
    {
        toast.error( "Please specify a party name!");
        return;
    }
    
    // fetch, post request to add textInput.party
    fetch("http://localhost:4000/api/party/addParty", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                token: getAuthToken(),
                username: getAuthName(),
                
                name: textInput.party,
                creatorUsername: getAuthName(),
                description: "LOL what do you need this info for?",
            }),
        })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
            console.log( "New party:");
            console.log( r);
            let resArray = r.data;
            toast.success( "Successfuly created party!");
            setParties([
                ...parties,
                { partyName: textInput.party, partyId: r.data[0].partyId },
              ]);
            setTextInput({ ...textInput, party: "" });
        })
        .catch((err) => {
            console.log(err);
            toast.error("Error, party could not be created");
        });
  };

  const handleDeleteParty = (partyId) => {

    let temp = [];
    parties.forEach((party) => {
      if (partyId != party.partyId) temp.push(party);
    });

    //TODO fetch delete party => wait server
    fetch("http://localhost:4000/api/party/removeParty", {
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
        setParties(temp);
        toast.success("Successfully deleted party!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error, could not delete party!");
      });
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
              labelName={party.partyName}
              onClickEvent={changeContent}
              type={ContentType.PARTY}
              labelId={party.partyId}
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
