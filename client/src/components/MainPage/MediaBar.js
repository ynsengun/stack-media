import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "../../css/MainPage/MediaBar.css";
import { ContentType } from "../../util/ContentTypes";

import RedirectLabel from "./RedirectLabel";

export default function MediaBar(props) {
  const { changeContent } = props;

  const [channels, setChannels] = useState([]);
  const [parties, setParties] = useState([]);
  const [textInput, setTextInput] = useState({ channel: "", party: "" });

  useEffect(() => {
    // TODO fetch channels and parties
    setChannels(["Hello", "Hello", "Hello", "Hello", "Hello"]);
    setParties(["SLM", "SLM", "SLM", "SLM", "SLM"]);
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.currentTarget;
    setTextInput({
      ...textInput,
      [name]: value,
    });
  };

  const handleNewChannel = () => {
    // TODO fetch, post request to add textInput.channel
    setChannels([...channels, textInput.channel]);
    setTextInput({ ...textInput, channel: "" });
  };

  const handleNewParty = () => {
    // TODO fetch, post request to add textInput.party
    setParties([...parties, textInput.party]);
    setTextInput({ ...textInput, party: "" });
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
              labelName={channel}
              onClickEvent={changeContent}
              type={ContentType.CHANNEL}
              index={index}
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
              labelName={party}
              onClickEvent={changeContent}
              type={ContentType.PARTY}
              index={index}
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
