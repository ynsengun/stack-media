import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Media from "../Media/Media";

import { checkResponse } from "../../util/ResponseUtil";
import { getAuthName, getAuthToken } from "../../util/AuthenticationUtil";

export default function ChannelContents() {
  const [channelId, setChannelId] = useState("");

  const [allGenres, setAllGenres] = useState([]);
  const [myGenres, setMyGenres] = useState([]);
  const [medias, setMedias] = useState([]);
  const [suggestedMedias, setSuggestedMedias] = useState([]);

  const history = useHistory();

  useEffect(() => {
    setChannelId(history.location.pathname.substring(10));
    console.log( channelId);

    const unListen = history.listen(() => {
      setChannelId(history.location.pathname.substring(10));
      window.scrollTo(0, 0);
    });

    return () => {
      unListen();
    };
  }, []);

    useEffect(() => {
        if ( channelId != "")
        {
            // fetch all-genres
            fetch("http://localhost:4000/api/genre/getGenres", {
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
                setAllGenres( resArray);
              })
              .catch((err) => {
                console.log(err);
                toast.error("Error, could not fetch all available genres!");
              });
            
            // fetch channel my-genres
            fetch("http://localhost:4000/api/channel/getGenres", {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: getAuthToken(),
                username: getAuthName(),

                channelId: channelId,
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
                toast.error("Error, could not fetch channel's genres!");
              });

            // fetch channel medias
            fetch("http://localhost:4000/api/channel/getMedias", {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: getAuthToken(),
                username: getAuthName(),

                channelId: channelId,
              }),
            })
              .then((r) => checkResponse(r))
              .then((r) => r.json())
              .then((r) => {
                setMedias( r.data);
              })
              .catch((err) => {
                console.log(err);
                toast.error("Error, could not fetch medias for the channel!");
              });
        }
    }, [channelId]);

    useEffect(() => {
        if ( channelId != "")
        {
            // fetch suggested-medias
            fetch("http://localhost:4000/api/channel/getSuggestion", {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: getAuthToken(),
                username: getAuthName(),

                channelId: channelId,
              }),
            })
            .then((r) => checkResponse(r))
            .then((r) => r.json())
            .then((r) => {
                //console.log( r.data);
                setSuggestedMedias( r.data);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error, could not fetch suggested medias for the channel!");
            });
        }
    }, [channelId, myGenres]);

  const getButtonClass = (genre) => {
    
    let match = false;
    myGenres.forEach( x => {
        if ( x.genreId === genre.genreId)
        {
            match = true;
        }
    });
    return match ? "btn btn-success ml-3" : "btn btn-danger ml-3";
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
        if ( myGenres.length === 1)
        {
            toast.error( "You must have at least 1 genre preference.");
            return;
        }

        let temp = [];
        myGenres.forEach((g) => {
            if (g.genreId != genre.genreId) temp.push(g);
        });

        // fetch, delete this genre from user
        fetch("http://localhost:4000/api/channel/deleteGenre", {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                token: getAuthToken(),
                username: getAuthName(),

                channelId: channelId,
                genreId: genre.genreId,
            }),
        })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
            toast.success( "Genre " + genre.title + " is successfully deleted from your preferences.");
            setMyGenres(temp);
        })
        .catch((err) => {
            console.log(err);
            toast.error("Error, could not delete genre from channel!");
        });
    } 
    else 
    {
        // fetch, add this genre from user
        fetch("http://localhost:4000/api/channel/addGenre", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                token: getAuthToken(),
                username: getAuthName(),
                
                channelId: channelId,
                genreId: genre.genreId,
            }),
        })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
            toast.success( "Genre " + genre.title + " is successfully added to your preferences.");
            setMyGenres([...myGenres, genre]);
        })
        .catch((err) => {
            console.log(err);
            toast.error("Error, could not add genre to channel!");
        });
    }
  };

    const handleDeleteFromChannel = (mediaId) => {
        
        // fetch, delete this media from the channel
        fetch("http://localhost:4000/api/channel/deleteMedia", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                token: getAuthToken(),
                username: getAuthName(),
                
                channelId: channelId,
                mediaId: mediaId,
            }),
        })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
            toast.success( "Media is successfully deleted!");
            let newMediaList = medias.filter( x => x.mediaId != mediaId);
            setMedias( newMediaList);
        })
        .catch((err) => {
            console.log(err);
            toast.error("Error, could not delete media from the channel!");
        });
    };


  return (
    <Container>
      <h1 className="text-center">Channel {channelId}</h1>

      <div className="my-4">
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
      </div>

      <a
        className="btn btn-primary w-100"
        onClick={() => {
          history.push("/search");
        }}
      >
        Add to channel
      </a>

      <h1 className="mt-4">My Media</h1>
      <hr></hr>
      <div>
        {medias.map((media, index) => (
          <div key={index} className="mt-4">
            <Media 
                key={index}
                mediaName={media.name} 
                mediaId={media.mediaId}
                mediaType={ media.episodeNumber == null ? 0 : 1} 
                channelList={[ { channelId: channelId, channelName: "" }]} 
                deleteFromChannel={handleDeleteFromChannel}
                pageType={4} />
          </div>
        ))}
      </div>

      <h1 className="mt-4">Suggestion</h1>
      <hr></hr>
      <div>
        {suggestedMedias.map((media, index) => (
          <Media key={index} mediaName={media.name} mediaType={media.episodeNumber === null ? 0 : 1} pageType={1} />
        ))}
      </div>
    </Container>
  );
}
