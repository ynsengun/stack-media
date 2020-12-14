import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container, Form, Button } from "semantic-ui-react";

import { checkResponse } from "../util/ResponseUtil";
import { getAuthName, getAuthToken } from "../util/AuthenticationUtil";

export default function Upload() {
  const [pageType, setPageType] = useState("");

  const [media, setMedia] = useState({
    type: "",
    name: "",
    description: "",
    genres: [],
    tvShowName: "",
    episodeNumber: Number,
    seasonNumber: Number,
  });
  const [allGenres, setAllGenres] = useState([]);
  const [myGenres, setMyGenres] = useState([]);
  const [pagePath, setPagePath] = useState("");

  // const [mediaName, setMediaName] = useState("");
  // const [mediaDescription, setMediaDescription] = useState("");
  // const [mediaGenres, setMediaGenres] = useState([]);
  // const [selectedGenre, setSelectedGenre] = useState([]);
  // const [mediaTVShowName, setMediaTVShowName] = useState(null);
  // const [mediaEpisodeNumber, setMediaEpisodeNumber] = useState(-1);
  // const [mediaSeasonNumber, setMediaSeasonNumber] = useState(-1);

  const history = useHistory();

  useEffect(() => {
    let path = history.location.pathname;
    setPagePath(path);

    const unListen = history.listen(() => {
      let path = history.location.pathname;
      setPagePath(path);

      window.scrollTo(0, 0);
    });

    return () => {
      unListen();
    };
  }, []);

  useEffect(() => {
    let path = pagePath.substring(1, 5);

    if (path === "edit") {
      setPageType("edit");
      let mediaName = pagePath.substring(6);
      setMedia({ ...media, name: mediaName });

      // TODO fetch current info with the mediaName and set attributes (description, genres, type etc..)
      setMyGenres(["Action", "Drama"]);
    } else {
      setPageType("upload");
      setMyGenres([]);
      setMedia({
        type: "movie",
        name: "",
        description: "",
        genres: [],
        tvShowName: "",
        episodeNumber: Number,
        seasonNumber: Number,
      });
    }

    // TODO fetch all genres
    fetch("http://localhost:4000/api/media/getGenres", {
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
        setAllGenres(resArray);
      })
      .catch((err) => {
        toast.error("Error on fetching genre for Upload page!");
      });
  }, [pagePath]);

  const getButtonClass = (genre) => {
    return myGenres.includes(genre)
      ? "btn btn btn-danger ml-3"
      : "btn btn btn-success ml-3";
  };

  const handleGenreClick = (genre) => {
    if (myGenres.includes(genre)) {
      // TODO fetch, delete this genre from channel
      let temp = [];
      myGenres.forEach((g) => {
        if (g != genre) temp.push(g);
      });
      setMyGenres(temp);
    } else {
      // TODO fetch, add this genre from channel
      setMyGenres([...myGenres, genre]);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.currentTarget;
    setMedia({
      ...media,
      [name]: value,
    });
  };

  function handleUploadButtonPress(event) {
    if (myGenres.length === 0) {
      toast.warning("You need to specify at least one genre for the media!");
      return;
    }

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
        name: media.name,
        description: media.description,
        path: "https://www.youtube.com/channel/UC-lHJZR3Gqxm24_Vd_AJ5Yw",
        uploadDate: Date.now(),
        duration: -1,
        oscarAward: null,
        seasonNumber: media.type === "movie" ? null : media.seasonNumber,
        episodeNumber: media.type === "movie" ? null : media.episodeNumber,
        emmyAward: null,

        genres: allGenres.filter(filterBySelection),
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

  // function handleGenreSelection(event) {
  //   var selectedGenres = [];
  //   var options = event.target.options;
  //   var opt;

  //   for (var i = 0, iLen = options.length; i < iLen; i++) {
  //     opt = options[i];
  //     if (opt.selected) {
  //       selectedGenres.push(opt.value);
  //     }
  //   }
  //   setSelectedGenre(selectedGenres);
  // }

  function filterBySelection(genre) {
    for (let i = 0; i < myGenres.length; i++) {
      if (genre.title === myGenres[i]) {
        console.log(
          "Genre title: " + genre.title + " selected genre: " + myGenres[i]
        );
        return true;
      }
    }
    return false;
  }

  return (
    <Container>
      <h1 className="h1 text-center">Media Information</h1>
      <button
        className="btn btn-primary w-100 my-5"
        onClick={() => {
          let tmp = "";
          if (media.type == "series") tmp = "movie";
          else tmp = "series";
          setMedia({ ...media, type: tmp });
        }}
      >
        {media.type}
      </button>
      <Form>
        <Form.Field>
          <label>Media Name:</label>
          <Form.Input
            type="text"
            name="name"
            value={media.name}
            onChange={handleChange}
          />
        </Form.Field>

        <Form.Field>
          {/* id="mediaNameInputID"
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
        <div> */}
          <label>Description:</label>
          <Form.Input
            type="text"
            name="description"
            value={media.description}
            onChange={handleChange}
          />
        </Form.Field>

        {media.type == "series" && (
          <React.Fragment>
            <Form.Field>
              <label>TV-Serie Name:</label>
              <Form.Input
                type="text"
                name="tvShowName"
                value={media.tvShowName}
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Season:</label>
              <Form.Input
                type="text"
                name="seasonNumber"
                value={media.seasonNumber}
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Episode:</label>
              <Form.Input
                type="text"
                name="episodeNumber"
                value={media.episodeNumber}
                onChange={handleChange}
              />
            </Form.Field>
          </React.Fragment>
        )}

        <label className="mr-3">Genres:</label>
        {allGenres.map((genre) => (
          <button
            className={getButtonClass(genre.title)}
            onClick={() => {
              handleGenreClick(genre.title);
            }}
          >
            {genre.title}
          </button>
        ))}
      </Form>

      <div className="mt-5">
        {pageType === "upload" ? (
          <button
            className="btn btn-primary w-100"
            onClick={handleUploadButtonPress}
          >
            Upload Media
          </button>
        ) : (
          <React.Fragment>
            <button
              className="btn btn-danger w-50"
              onClick={() => {
                console.log("empty delete");
              }}
            >
              Delete Media
            </button>
            <button
              className="btn btn-warning w-50"
              onClick={() => {
                console.log("empty edit");
              }}
            >
              Edit Media
            </button>
          </React.Fragment>
        )}
      </div>
    </Container>
  );
}
