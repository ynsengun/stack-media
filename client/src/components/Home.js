import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { checkResponse } from "../util/ResponseUtil";
import { Grid } from "semantic-ui-react";
import { ContentType } from "../util/ContentTypes";

// Sides
import FriendsBar from "./MainPage/FriendsBar";
import MediaBar from "./MainPage/MediaBar";

// Center
import MovieContents from "./MainPage/MovieContents";
import ChannelContents from "./MainPage/ChannelContents";
import TVShowContents from "./MainPage/TVShowContents";

export default function Home() {
  const [content, setContent] = useState({ type: ContentType.MOVIE, name: "" });

  const changeContent = (type, name) => {
    setContent({ type, name });
    console.log(type, name);
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={3} style={{ padding: "0px", marginTop: "-29px" }}>
          <MediaBar changeContent={changeContent} />
        </Grid.Column>
        <Grid.Column width={10}>
          {content.type === ContentType.MOVIE && <MovieContents />}
          {content.type === ContentType.TVSHOW && <TVShowContents />}
          {content.type === ContentType.CHANNEL && (
            <ChannelContents channelName={content.name}></ChannelContents>
          )}
        </Grid.Column>
        <Grid.Column width={3} style={{ padding: "0px", marginTop: "-29px" }}>
          <FriendsBar />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
