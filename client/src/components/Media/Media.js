import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import MovieLogo from "../../images/MovieIcon.png";
import TVShowLogo from "../../images/TVShowIcon.png";

import "../../css/Media.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { checkResponse } from "../../util/ResponseUtil";
import { getAuthName, getAuthToken } from "../../util/AuthenticationUtil";

export default function Media(props) {
  // pageType 0 = search page, 1 = only watch button, 2 = edit button
  const { mediaId, mediaType, mediaName, channelList, pageType } = props;

  const [selectedChannel, setSelectedChannel] = useState( "");

  const history = useHistory();

  useEffect(() => {
    if (pageType === 0) 
    {
        // Set default channel
        setSelectedChannel( channelList.length > 0 ? channelList[0].channelName : "");
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
    
    // Find the selected channel
    let channel = channelList.filter( x => x.channelName === selectedChannel);
    if ( channel != null && channel.length === 1 )
    {
        // add media to channel
        fetch("http://localhost:4000/api/channel/addMedia", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                token: getAuthToken(),
                username: getAuthName(), 
                
                channelId: channel[0].channelId,
                mediaId: mediaId,
            }),
        })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
            toast.success( "Successfully added media to the channel!");
        })
        .catch((err) => {
            console.log(err);
            toast.error("Error, could not add media to the channel!");
        });
    }
    else
    {
        toast.error( "There is not any channel selected that you can add media!");
    }
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
                  {channelList.map((channel, index) => option(channel.channelName, index))}
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
