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
    mediaId: "",
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
        let mediaId = pagePath.substring(6);

        // fetch current info with the mediaName and set attributes (description, genres, type etc..)
        fetch("http://localhost:4000/api/media/getMedia", {
            method: "POST",
            mode: "cors",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: getAuthToken(),
                username: getAuthName(),

                mediaId: mediaId,
            }),
        })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
            let resArray = r.data[0];
            if ( resArray.length === 1)
            {
                let mediaObject = resArray[ 0];
                if ( mediaObject.type === 0) // movie;
                {
                    setMedia({
                        ...media,
                        type: "movie",
                        mediaId: mediaId,
                        name: mediaObject.name,
                        description: mediaObject.description,
                        tvShowName: "",
                        episodeNumber: -1,
                        seasonNumber: -1,
                    });
                }
                else //series
                {
                    setMedia({
                        ...media,
                        type: "series",
                        mediaId: mediaId,
                        name: mediaObject.name,
                        description: mediaObject.description,
                        tvShowName: mediaObject.TVSerieName,
                        episodeNumber: mediaObject.episodeNumber,
                        seasonNumber: mediaObject.seasonNumber,
                    });
                }
            }
            else
            {
                toast.error( "There are two media with identical ids!");
            }
        })
        .catch((err) => {
            toast.error("Error on fetching media information for edit!");
        });

        // fetch genre of the media
        fetch("http://localhost:4000/api/media/getMediaGenres", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                token: getAuthToken(),
                username: getAuthName(),    
                
                mediaId: mediaId,
            }),
        })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
            let resArray = r.data;
            setMyGenres( resArray);
        })
        .catch((err) => {
            console.log(err);
            toast.error("Error, could not fetch the genre for the movie!");
        });
    } 
    else 
    {
      setPageType("upload");
      setMyGenres([]);
      setMedia({
        type: "movie",
        mediaId: "",
        name: "",
        description: "",
        genres: [],
        tvShowName: "",
        episodeNumber: Number,
        seasonNumber: Number,
      });
    }

    // fetch all genres
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

        let match = false;
        myGenres.forEach( x => {
            if ( x.genreId === genre.genreId)
            {
                match = true;
            }
        });
        return match ? "btn btn btn-success ml-3" : "btn btn btn-danger ml-3";
    };

    const handleGenreClick = (genre) => {
        
        let match = false;
        myGenres.forEach( x => {
            if ( x.genreId === genre.genreId)
            {
                match = true;
            }
        });
        
        if (match) 
        {
            let temp = [];
            myGenres.forEach((g) => {
                if (g.genreId !== genre.genreId) temp.push(g);
            });
            
            if ( pageType == "edit")
            {
                // TODO fetch, delete this genre from channel
                console.log( "Deleting...");
            }
            setMyGenres(temp);
        } 
        else 
        {
            if ( pageType == "edit")
            {
                // TODO fetch, delete this genre from channel
                console.log( "Adding...");
            }

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

    function handleUploadButtonPress(event) 
    {
        if (myGenres.length === 0) {
            toast.warning("You need to specify at least one genre for the media!");
            return;
        }
        // TODO: add tv series name
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
            TVSerieName: media.tvShowName,
            seasonNumber: media.type === "movie" ? null : parseInt(media.seasonNumber),
            episodeNumber: media.type === "movie" ? null : parseInt(media.episodeNumber),
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

    function filterBySelection(genre) {
        for (let i = 0; i < myGenres.length; i++) {
        if (genre.genreId === myGenres[i].genreId) {
            console.log(
            "Genre title: " + genre.title + " selected genre: " + myGenres[i]
            );
            return true;
        }
        }
        return false;
    }

    function handleDeleteButtonPress( event)
    {
        if ( media.mediaId != null && media.mediaId != "")
        {
            // delete this media
            fetch("http://localhost:4000/api/media/delete", {
                method: "DELETE",
                mode: "cors",
                    headers: {
                    "Content-Type": "application/json",
                    },
                body: JSON.stringify({
                    token: getAuthToken(),
                    username: getAuthName(),

                    mediaId: media.mediaId,
                }), 
            })
            .then((r) => checkResponse(r))
            .then((r) => r.json())
            .then((r) => {
                // update history or state
                setPageType("upload");
                setMyGenres([]);
                setMedia({
                    type: "movie",
                    mediaId: "",
                    name: "",
                    description: "",
                    genres: [],
                    tvShowName: "",
                    episodeNumber: Number,
                    seasonNumber: Number,
                });
            })
            .catch((err) => {
                toast.error("Error on deleting the media!");
            });
        }
    }

    function handleEditButtonPress( event)
    {
        // TODO: make  update request for the edited media!
        console.log( "Edit button pressed!");
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
            className={getButtonClass(genre)}
            onClick={() => {
              handleGenreClick(genre);
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
              onClick={handleDeleteButtonPress}
            >
              Delete Media
            </button>
            <button
              className="btn btn-warning w-50"
              onClick={handleEditButtonPress}
            >
              Edit Media
            </button>
          </React.Fragment>
        )}
      </div>
    </Container>
  );
}
