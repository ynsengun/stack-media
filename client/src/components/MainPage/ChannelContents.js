import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Media from "../Media/Media";

export default function ChannelContents() {
  const [channelName, setChannelName] = useState("");

  const [allGenres, setAllGenres] = useState([]);
  const [myGenres, setMyGenres] = useState([]);
  const [medias, setMedias] = useState([]);
  const [suggestedMedias, setSuggestedMedias] = useState([]);

  const history = useHistory();

  useEffect(() => {
    setChannelName(history.location.pathname.substring(10));

    const unListen = history.listen(() => {
      setChannelName(history.location.pathname.substring(10));
      window.scrollTo(0, 0);
    });

    return () => {
      unListen();
    };
  }, []);

  useEffect(() => {
    // TODO fetch my-genres, suggested-medias, medias
    // // fetch all-genres
    // fetch("http://localhost:4000/api/genre/getGenres", {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     token: getAuthToken(),
    //     username: getAuthName(),
    //   }),
    // })
    //   .then((r) => checkResponse(r))
    //   .then((r) => r.json())
    //   .then((r) => {
    //     let resArray = r.data;
    //     setAllGenres( resArray);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast.error("Error, could not fetch all available genres!");
    //   });
    setAllGenres(["Action", "Adventure", "Comedy", "Drama", "Horror"]); //TODO => wait for server to implement getChannelGenres
    setMyGenres(["Action", "Drama"]); //TODO => wait for server to implement getChannelGenres


    setMedias(["cevat", "cevat", "cevat"]);
    setSuggestedMedias(["yusuf"]);
  }, [channelName]);

  const getButtonClass = (genre) => {
    
    // let match = false; //TODO => wait for server to implement getChannelGenres
    // myGenres.forEach( x => {
    //     if ( x.genreId === genre.genreId)
    //     {
    //         match = true;
    //     }
    // });
    // return match ? "btn btn-success ml-3" : "btn btn-danger ml-3";
    
    return myGenres.includes(genre)
      ? "btn btn-sm btn-danger ml-3"
      : "btn btn-sm btn-success ml-3";
  };

  const handleGenreClick = (genre) => {
    
    // let match = false; //TODO => wait for server to implement getChannelGenres
    // myGenres.forEach( x => {
    //     if ( x.genreId === genre.genreId)
    //     {
    //         match = true;
    //     }
    // });

    // if (match) 
    // {
    //     if ( myGenres.length === 1)
    //     {
    //         toast.error( "You must have at least 1 genre preference.");
    //         return;
    //     }

    //     let temp = [];
    //     myGenres.forEach((g) => {
    //         if (g.genreId != genre.genreId) temp.push(g);
    //     });

    //     // fetch, delete this genre from user
    //     fetch("http://localhost:4000/api/channel/deleteGenre", {
    //         method: "DELETE",
    //         mode: "cors",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(
    //         {
    //             token: getAuthToken(),
    //             username: getAuthName(),    
                
    //             genreId: genre.genreId
    //         }),
    //     })
    //     .then((r) => checkResponse(r))
    //     .then((r) => r.json())
    //     .then((r) => {
    //         toast.success( "Genre " + genre.title + " is successfully deleted from your preferences.");
    //         setMyGenres(temp);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         toast.error("Error, could not delete genre from your preference!");
    //     });
    // } 
    // else 
    // {
    //     // fetch, add this genre from user
    //     fetch("http://localhost:4000/api/channel/addGenre", {
    //         method: "POST",
    //         mode: "cors",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(
    //         {
    //             token: getAuthToken(),
    //             username: getAuthName(),
                
    //             genreId: genre.genreId
    //         }),
    //     })
    //     .then((r) => checkResponse(r))
    //     .then((r) => r.json())
    //     .then((r) => {
    //         toast.success( "Genre " + genre.title + " is successfully added to your preferences.");
    //         setMyGenres([...myGenres, genre]);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         toast.error("Error, could not add your new genre preference!");
    //     });
    // }
    
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

  return (
    <Container>
      <h1 className="text-center">Channel {channelName}</h1>

      <div className="my-4">
        <label className="mr-3">Genres:</label>
        {allGenres.map((genre) => (
          <button
            className={getButtonClass(genre)}
            onClick={() => {
              handleGenreClick(genre);
            }}
          >
            {genre}
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
        {medias.map((movie, index) => (
          <div key={index} className="mt-4">
            <Media mediaName={movie} mediaType={1} pageType={1} />
          </div>
        ))}
      </div>

      <h1 className="mt-4">Suggestion</h1>
      <hr></hr>
      <div>
        {suggestedMedias.map((movie, index) => (
          <Media key={index} mediaName={movie} mediaType={1} pageType={1} />
        ))}
      </div>
    </Container>
  );
}
