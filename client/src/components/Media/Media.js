import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import MovieLogo from "../../images/MovieIcon.png";
import TVShowLogo from "../../images/TVShowIcon.png";

import "../../css/Media.css";
import { useHistory } from "react-router-dom";

export default function Media(props) {
  // pageType 0 = search page, 1 = only watch button, 2 = edit button
  const { mediaType, mediaName, pageType } = props;

  const [channels, setChannels] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (pageType === 0) {
      // TODO fetch channels
      setChannels(["channel1", "channel2"]);
    }
  }, []);

  return (
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
        <h3 className="h3" style={{ marginTop: "70px", fontWeight: "600" }}>
          {mediaName}
        </h3>
        {pageType === 0 && (
          <div className="mt-4">
            <label className="mr-1">Add to Channel:</label>
            <select name="channelsForAddingTo">
              {channels.map((channel, index) => (
                <option key={index} value={channel}>
                  {channel}
                </option>
              ))}
            </select>
            <br style={{ height: "0px" }} />
          </div>
        )}
        {(pageType === 0 || pageType === 1) && (
          <button
            className="btn btn-primary btn-lg mt-4"
            onClick={() => {
              history.push(`/media/${mediaName}`);
            }}
          >
            Watch
          </button>
        )}
        {pageType === 2 && (
          <button className="btn btn-warning btn-lg mt-5">Edit</button>
        )}
      </div>
    </div>
  );
}
