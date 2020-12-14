import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { checkResponse } from "../util/ResponseUtil";
import { getAuthName, getAuthToken } from "../util/AuthenticationUtil";

export default function Upload() {
<<<<<<< HEAD
  const [pageType, setPageType] = useState("");
  const [mediaName, setMediaName] = useState("");
  const [mediaDescription, setMediaDescription] = useState("");
  const [mediaGenres, setMediaGenres] = useState([]);
  const [mediaTVShowName, setMediaTVShowName] = useState(null);
  const [mediaEpisodeNumber, setMediaEpisodeNumber] = useState(-1);
  const [mediaSeasonNumber, setMediaSeasonNumber] = useState(-1);

  const history = useHistory();

  useEffect(() => {
    let path = history.location.pathname.substring(1, 5);

    if (path == "edit") {
      setPageType("edit");
      setMediaName(history.location.pathname.substring(6));

      // TODO fetch current info with the mediaName and set attributes
    } else {
      setPageType("upload");
    }
  }, []);

  function handleUploadButtonPress(event) {
    fetch("http://localhost:4000/api/media/createMedia", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getAuthToken(),
        username: getAuthName(),
        publishUsername: getAuthName(),
        name: mediaName,
        description: mediaDescription,
        path: "https://www.youtube.com/channel/UC-lHJZR3Gqxm24_Vd_AJ5Yw",
        updateDate: Date.now(),
        duration: -1,
        oscarAward: null,
        seasonNumber: mediaSeasonNumber < 0 ? null : mediaSeasonNumber,
        episodeNumber: mediaEpisodeNumber < 0 ? null : mediaEpisodeNumber,
        emmyAward: null,
      }),
    })
      .then((r) => checkResponse(r))
      .then((r) => r.json())
      .then((r) => {
        toast.success("Upload complete...");
      })
      .catch((err) => {
        console.log(err);
        toast.error("error");
      });
  }

  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        <h1>Media Information</h1>
        <div>
          <label>Media Name:</label>
          <input
            type="text"
            id="mediaNameInputID"
            onInput={(e) => setMediaName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Channel Genre:</label>
          <select name="mediaGenre" id="mediaGenreSelectorID" multiple>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="horror">Horror</option>
          </select>
        </div>
        <div>
          <label>Description:</label>
          <textarea
            id="mediaDescriptionInputID"
            rows="3"
            cols="30"
            onInput={(e) => setMediaDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>TV-Serie Name (left blank if not serie):</label>
          <input
            type="text"
            id="mediaTVSerieNameInputID"
            onInput={(e) => setMediaTVShowName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Season (left blank if not serie):</label>
          <input
            type="number"
            id="mediaSeasonInputID"
            onInput={(e) => setMediaSeasonNumber(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Episode (left blank if not serie):</label>
          <input
            type="number"
            id="mediaEpisodeInputID"
            onInput={(e) => setMediaEpisodeNumber(e.target.value)}
          ></input>
        </div>
        <div>
          <button onClick={handleUploadButtonPress}>Upload Media</button>
          <button
            onClick={() => {
              console.log("empty delete");
            }}
          >
            Delete Media
          </button>
          <button
            onClick={() => {
              console.log("empty edit");
            }}
          >
            Edit Media
          </button>
=======
    
    const [mediaName, setMediaName] = useState("");
    const [mediaDescription, setMediaDescription] = useState("");
    const [mediaGenres, setMediaGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState([]);
    const [mediaTVShowName, setMediaTVShowName] = useState(null);
    const [mediaEpisodeNumber, setMediaEpisodeNumber] = useState(-1);
    const [mediaSeasonNumber, setMediaSeasonNumber] = useState(-1);

    useEffect(() => {
        // fetch genres to display on ui
        fetch("http://localhost:4000/api/media/getGenres", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                token: getAuthToken(),
                username: getAuthName(),
            }),
        })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
            let resArray = r.data;
            setMediaGenres( resArray);
        })
        .catch((err) => {
            toast.error("Error on fetching genre for Upload page!");
        });
      }, []);

    function handleGenreSelection(event)
    {
        var selectedGenres = [];
        var options = event.target.options;
        var opt;

        for (var i = 0, iLen = options.length; i < iLen; i++) 
        {
            opt = options[i];
            if ( opt.selected) 
            {
                selectedGenres.push(opt.value);
            }
        }
        setSelectedGenre( selectedGenres);
    }

    function filterBySelection( genre)
    {
        for ( let i = 0; i < selectedGenre.length; i++)
        {
            if ( genre.title === selectedGenre[ i])
            {
                console.log( "Genre title: " + genre.title + " selected genre: " + selectedGenre[ i]);
                return true;    
            }
        }
        return false;
    }

    function handleUploadButtonPress(event)
    {
        if ( selectedGenre.length === 0)
        {
            toast.warning( "You need to specify at least one genre for the media!");
            return;
        }

        fetch("http://localhost:4000/api/media/createMedia", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
        {
            token: getAuthToken(),
            username: getAuthName(),
            publishUsername: getAuthName(),
            name: mediaName,
            description: mediaDescription,
            path: "https://www.youtube.com/channel/UC-lHJZR3Gqxm24_Vd_AJ5Yw",
            uploadDate: Date.now(),
            duration: -1,
            oscarAward: null,
            seasonNumber: mediaSeasonNumber < 0 ? null : mediaSeasonNumber,
            episodeNumber: mediaEpisodeNumber < 0 ? null : mediaEpisodeNumber,
            emmyAward: null,

            genres: mediaGenres.filter( filterBySelection),
        }),
        })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
            toast.success("Upload complete...");
        })
        .catch((err) => {
            toast.error("Error on uploading media fetch.");
        });
    };
    
    return (
    <Container>
        <div style={ {textAlign: "center"}}>
		    <h1>Media Information</h1>
			<div>
                <label>Media Name:</label>
				<input
					type="text"
                    id="mediaNameInputID"
                    onInput={(e) => setMediaName(e.target.value)}
				></input>
			</div>
            <div>
                <label>Channel Genre:</label>
                <select name="mediaGenre" id="mediaGenreSelectorID" onChange={handleGenreSelection} multiple>
                    {
                        mediaGenres.map( (genre) => (
                        <option key={genre.id} value={genre.title}>{genre.title}</option>
                        ))
                    }
                </select>
            </div>
			<div>
				<label>Description:</label>
                <textarea id="mediaDescriptionInputID" rows="3" cols="30" onInput={(e) => setMediaDescription(e.target.value)}></textarea>
			</div>
            <div>
                <label>TV-Serie Name (left blank if not serie):</label>
                <input
					type="text"
                    id="mediaTVSerieNameInputID"
                    onInput={(e) => setMediaTVShowName(e.target.value)}
				></input>
            </div>
            <div>
                <label>Season (left blank if not serie):</label>
                <input
                   type="number"
                    id="mediaSeasonInputID"
                    onInput={(e) => setMediaSeasonNumber(e.target.value)}
                ></input>
            </div>
            <div>
                <label>Episode (left blank if not serie):</label>
                <input
                   type="number"
                    id="mediaEpisodeInputID"
                    onInput={(e) => setMediaEpisodeNumber(e.target.value)}
                ></input>
            </div>
			<div>
				<button onClick={handleUploadButtonPress}>Upload Media</button>
                <button onClick={() => {console.log("empty delete");}}>Delete Media</button>
                <button onClick={() => {console.log("empty edit");}}>Edit Media</button>
			</div>
>>>>>>> Partly integrate search
        </div>
      </div>
    </Container>
  );
}
