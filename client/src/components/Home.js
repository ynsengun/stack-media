import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { checkResponse } from "../util/ResponseUtil";
import { Grid } from "semantic-ui-react";
import { ContentType } from "../util/ContentTypes";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import NotFound from "./NotFound";

// Sides
import FriendsBar from "./MainPage/FriendsBar";
import MediaBar from "./MainPage/MediaBar";

// Center
import MovieContents from "./MainPage/MovieContents";
import ChannelContents from "./MainPage/ChannelContents";
import TVShowContents from "./MainPage/TVShowContents";

export default function Home() {
  const history = useHistory();

  const changeContent = (type, name) => {
    console.log(type, name);

    let path = "";
    if (type == ContentType.MOVIE) path = "/movies";
    else if (type == ContentType.TVSHOW) path = "/series";
    else if (type == ContentType.CHANNEL) path = `/channels/${name}`;
    history.push(path);
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={3} style={{ padding: "0px", marginTop: "-29px" }}>
          <MediaBar changeContent={changeContent} />
        </Grid.Column>

        <Grid.Column width={10}>
          {/* prettier-ignore */}
          <Switch>
            <Route exact path="/movies"><MovieContents /></Route>
            <Route exact path="/series"><TVShowContents /></Route>
            <Route exact path="/channels/:name"><ChannelContents></ChannelContents></Route>
            <Route path="*"><NotFound /></Route>
          </Switch>
          {/* {content.type === ContentType.MOVIE && <MovieContents />}
          {content.type === ContentType.TVSHOW && <TVShowContents />}
          {content.type === ContentType.CHANNEL && (
            <ChannelContents channelName={content.name}></ChannelContents>
          )} */}
        </Grid.Column>

        <Grid.Column width={3} style={{ padding: "0px", marginTop: "-29px" }}>
          <FriendsBar />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
