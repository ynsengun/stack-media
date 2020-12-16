import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import MovieLogo from "../../images/MovieIcon.png";
import TVShowLogo from "../../images/TVShowIcon.png";

import "../../css/Media.css";
import { useHistory } from "react-router-dom";

export default function Media(props) {
  // pageType 0 = search page, 1 = only watch button, 2 = edit button
  const { mediaId, mediaType, mediaName, pageType } = props;

  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (pageType === 0) {
      // TODO fetch channels
      setChannels(["channel1", "channel2"]);
      setSelectedChannel("channel2");
    }
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.currentTarget;
    if (name === "channelsForAddingTo") {
      e.stopPropagation();
      console.log(value);
      setSelectedChannel(value);
    }
  };

  const handleChannelButton = () => {
    // TODO fetch, add media to channel
    console.log(mediaName, selectedChannel);
  };

  const option = (name, index) => {
    if (selectedChannel === name)
      return (
        <option key={index} value={"" + name} selected="selected">
          {name}
        </option>
      );
    return (
      <option key={index} value={"" + name}>
        {name}
      </option>
    );
  };

  return (
    <div className="card mt-4">
      <div className="row">
        <div className={pageType === 1 ? "col-1" : "col-2"} />
        <div className={pageType === 1 ? "col-4" : "col-3"}>
          <img
            src={mediaType == 0 ? MovieLogo : TVShowLogo}
            className="w-100"
          ></img>
        </div>
        <div className="col-2" />
        <div className="col-5">
          <h3 className="h3" style={{ marginTop: "30px", fontWeight: "600" }}>
            {mediaName}
          </h3>
          {pageType === 0 && ( // add to channel button
            <React.Fragment>
              <div
                className="mt-4 btn btn-primary"
                style={{ width: "60%" }}
                onClick={handleChannelButton}
              >
                <label className="mr-1 m-0">Add to Channel: </label>
                <select
                  name="channelsForAddingTo"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={handleChange}
                >
                  {channels.map((channel, index) => option(channel, index))}
                </select>
                <br style={{ height: "0px" }} />
              </div>
              <br style={{ height: "0px" }} />
            </React.Fragment>
          )}
          {(pageType === 0 || pageType === 1) && ( // watch button
            <button
              className="btn btn-primary mt-4"
              style={{ width: "60%" }}
              onClick={() => {
                history.push(`/media/${mediaName}`); // TODO give mediaId instead of mediaName? as db mostly works with mediaId
              }}
            >
              Watch
            </button>
          )}
          {pageType === 2 && ( // eddit button
            // TODO button onClick (ask yusuf if done?) I think it should be done if this connects to upload
            <button
              className="btn btn-warning mt-5"
              style={{ width: "60%" }}
              onClick={() => {
                history.push(`/edit/${mediaId}`);
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
