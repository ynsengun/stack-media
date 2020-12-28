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
  // pageType 0 = search page, 1 = only watch button, 2 = edit button, 4 = channelContents, 5 = party
  const {
    mediaId,
    mediaType,
    mediaName,
    channelList,
    pageType,
    deleteFromChannel,
    handleMediaSelect,
    tvshowname,
  } = props;

  const [selectedChannel, setSelectedChannel] = useState("");

  const history = useHistory();

  useEffect(() => {
    console.log("pageType:   ", pageType);
    if (pageType === 0) {
      // Set default channel
      setSelectedChannel(
        channelList.length > 0 ? channelList[0].channelName : ""
      );
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

  const handleWatchButtonClick = () => {
    // if tv serie, fetch information, find episode id, than load next page!
    if (mediaType != 0) {

        if ( mediaId != null && mediaId != undefined && mediaId != "")
        {
            history.push(`/media/${mediaId}`);
            return;
        }

        var mediaNameToUse = mediaName;
      // run shitty algorithm to find last episode mediaName = tv show name
      if ( tvshowname !== null && tvshowname !== undefined && tvshowname != "")
      {
          mediaNameToUse = tvshowname;
      }
      foundAndLoadLastWatchedEpisode( mediaNameToUse);
    } else {
      history.push(`/media/${mediaId}`);
    }
  };

  function foundAndLoadLastWatchedEpisode( mediaNameToUse) {
    // fetch TV SHOWS
    fetch("http://localhost:4000/api/media/getSerie", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getAuthToken(),
        username: getAuthName(),

        TVSerieName: mediaNameToUse,
      }),
    })
      .then((r) => checkResponse(r))
      .then((r) => r.json())
      .then((r) => {
        let resArray = r.data;
        console.log("FOUND TV SERIE EPISODES WATCHED:");
        console.log(resArray);

        if (resArray.length == 0) {
          loadFirstTimeTvSerie(mediaNameToUse);
        } else {
          loadLastWatchedEpisode(resArray, mediaNameToUse);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error, could not get TV-Serie specific topics!");
      });
  }

  function loadFirstTimeTvSerie(mediaNameToUse) {
    // load the first episode of the tv serie
    // fetch TV SHOWS
    fetch("http://localhost:4000/api/media/getSeriesWithPreference", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getAuthToken(),
        username: getAuthName(),

        TVSerieName: mediaNameToUse,
      }),
    })
      .then((r) => checkResponse(r))
      .then((r) => r.json())
      .then((r) => {
        let resArray = r.data;
        console.log("FOUND TV SERIE EPISODES WITHOUT WATCHED:");
        console.log(resArray);
        if (resArray.length == 0) {
          toast.error("No episode for the TV show could be found!");
        } else {
          history.push(`/media/${resArray[0].mediaId}`);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error, could not get TV-Serie specific topics!");
      });
  }

  function loadLastWatchedEpisode(resArray, mediaNameToUse) {
    let lastWatchedEpisode = resArray[0];
    if (
      lastWatchedEpisode.Progress < 4 ||
      lastWatchedEpisode.Progress % 4 != 0
    ) {
      // this is the last watched and not finished
      history.push(`/media/${lastWatchedEpisode.mediaId}`);
    } // find the next episode as this is last watched but finished
    else {
      loadNextEpisode(lastWatchedEpisode, mediaNameToUse);
    }
  }

  function loadNextEpisode(lastEpisode, mediaNameToUse) {
    fetch("http://localhost:4000/api/media/getSeriesWithPreference", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getAuthToken(),
        username: getAuthName(),

        TVSerieName: mediaNameToUse,
      }),
    })
      .then((r) => checkResponse(r))
      .then((r) => r.json())
      .then((r) => {
        let resArray = r.data;
        console.log("FOUND TV SERIE EPISODES WITHOUT WATCHED:");
        console.log(resArray);
        if (resArray.length == 0) {
          toast.error("No episode for the TV show could be found!");
        } else {
          for (let i = 0; i < resArray.length; i++) {
            if (
              (resArray[i].episodeNumber === lastEpisode.episodeNumber + 1 &&
                resArray[i].seasonNumber === lastEpisode.seasonNumber) ||
              (resArray[i].seasonNumber === lastEpisode.seasonNumber + 1 &&
                resArray[i].episodeNumber === 1)
            ) {
              history.push(`/media/${resArray[i].mediaId}`);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error, could not get TV-Serie specific topics!");
      });
  }

  const handleChannelButton = () => {
    // Find the selected channel
    let channel = channelList.filter((x) => x.channelName === selectedChannel);
    if (channel != null && channel.length === 1) {
      // add media to channel
      fetch("http://localhost:4000/api/channel/addMedia", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getAuthToken(),
          username: getAuthName(),

          channelId: channel[0].channelId,
          mediaId: mediaId,
        }),
      })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
          toast.success("Successfully added media to the channel!");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error, could not add media to the channel!");
        });
    } else {
      toast.error("There is not any channel selected that you can add media!");
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
                  {channelList.map((channel, index) =>
                    option(channel.channelName, index)
                  )}
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
              onClick={handleWatchButtonClick}
            >
              Watch
            </button>
          )}
          {pageType === 4 && ( // channel contents page
            <div>
              <button // watch button
                className="btn btn-primary mt-4"
                style={{ width: "60%" }}
                onClick={() => {
                  history.push(`/media/${mediaId}`);
                }}
              >
                Watch
              </button>
              <button // delete button
                className="btn btn-danger mt-4"
                style={{ width: "60%" }}
                onClick={() => deleteFromChannel(mediaId)}
              >
                Delete
              </button>
            </div>
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
          {pageType === 5 && (
            <button
              className="btn btn-primary mt-5"
              style={{ width: "60%" }}
              onClick={() => {
                handleMediaSelect(mediaId, mediaName);
              }}
            >
              Watch
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
