import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { checkResponse } from "../util/ResponseUtil";
import { Card, Container, Button } from "semantic-ui-react";

// Sides
import FriendsBar from "./MainPage/FriendsBar";
import MediaBar from "./MainPage/MediaBar";

// Center
import MovieContents from "./MainPage/MovieContents";
import ChannelContents from "./MainPage/ChannelContents";
import TVShowContents from "./MainPage/TVShowContents";

const ContentType = {
    TVSHOW: 0,
    MOVIE: 1,
	CHANNEL: 2,
};

export default function Home() {
	const [ text, setText] = useState( "Error");
	const [ contentFlag, setMainContent] = useState( ContentType.MOVIE);
    const [ movieInformation, setMovieInformation] = useState( [ "CS353", "CS342", "CS465", "CS491"]);
    const [ tvShowInformation, setTVShowInformation] = useState( []);
    const [ channelInformation, setChannelInformation] = useState({
        name: "Cevo!",
        genres: ["Action", "Drama"],
        movieContents: ["CS353", "DB", "Project"],
        suggestedMedia: ["CS491"],
    });

    function loadPartyPage() 
    {
		console.log("Loading clicked party page...");
	};

    function loadChannelContent() 
    {
		setMainContent(ContentType.CHANNEL);
	};

    function loadMediaContent(mediaFlag) 
    {
		// MOVIE
        if (mediaFlag) 
        {
			setMainContent(ContentType.MOVIE);
		}
        else // TV show
        {
			setMainContent(ContentType.TVSHOW);
		}
	};

	useEffect(() => {
		fetch("http://localhost:8000/ping")
			.then((r) => checkResponse(r))
			.then((r) => r.json())
			.then((response) => {
				setText(response.msg);
				toast.success("Request Successful");
			})
      .catch((err) => 
      {
				toast.error("error");
			});
	}, []);

	useEffect(() => {
		// Make ajax calls
        if (contentFlag === ContentType.MOVIE) 
        {
            // Get movie data by ajax call

            //TODO: maybe put this logic directly into MovieContents.js?
            
            // Set the new state!
            setMovieInformation(
                [ "CS353", "CS342", "CS465", "CS491"]
            );
        } 
        else if (contentFlag === ContentType.TVSHOW) 
        {
            // Get TV SHOW data by ajax call
            
            //TODO: maybe put this logic directly into TVShowContents.js?
            
            // Set the new state!
            setTVShowInformation(
                [ "Talha", "Hakan", "Cevat", "Yusuf"]
            );
        } 
        else if (contentFlag === ContentType.CHANNEL) 
        {
			// Get Channel data by ajax call
            
            // Set the new state!
            // setChannelInformation( {
            // });
		}
	}, [contentFlag]);

	const sendToast = () => {
	    toast.warning("Here It Is");
	};

	return (
		<Container>
			<div>
				<MediaBar
				    onMediaClickEvent={loadMediaContent}
					onChannelClickEvent={loadChannelContent}
					onPartyClickEvent={loadPartyPage}
				></MediaBar>
				{ contentFlag === ContentType.MOVIE && (
                    <MovieContents
                        contentArgs={movieInformation}
                    ></MovieContents>
				)}
                { contentFlag === ContentType.TVSHOW && (
                    <TVShowContents
                        contentArgs={tvShowInformation}
                    ></TVShowContents>
                )}
				{ contentFlag === ContentType.CHANNEL && (
                    <ChannelContents 
                        contentArgs={channelInformation}
                    ></ChannelContents>
				)}
				<FriendsBar></FriendsBar>
			</div>
		</Container>
    );
    
    /*
    			<Card className="text-center w-100" raised>
				Test Server - Client
				<h1>{text}</h1>
				This page is used to present movies/episodes
			</Card>
			<Button primary className="mt-5 text-center w-100" onClick={sendToast}>
				Send Me Toast!
			</Button>
    */
}
