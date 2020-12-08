import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Media from "../Media/Media";

export default function ChannelContents(props) {
  const { channelName } = props;

  const [allGenres, setAllGenres] = useState([]);
  const [myGenres, setMyGenres] = useState([]);
  const [medias, setMedias] = useState([]);
  const [suggestedMedias, setSuggestedMedias] = useState([]);

  useEffect(() => {
    // TODO fetch all-genres, my-genres, suggested-medias, medias
    setAllGenres(["Action", "Adventure", "Comedy", "Drama", "Horror"]);
    setMyGenres(["Action", "Drama"]);
    setMedias(["cevat", "cevat", "cevat"]);
    setSuggestedMedias(["yusuf"]);
  }, [channelName]);

  const getButtonClass = (genre) => {
    return myGenres.includes(genre)
      ? "btn btn-sm btn-danger ml-3"
      : "btn btn-sm btn-success ml-3";
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

      <a className="btn btn-primary w-100" href="/search">
        Add to channel
      </a>

      <h1 className="mt-4">My Media</h1>
      <hr></hr>
      <div>
        {medias.map((movie, index) => (
          <Media key={index} mediaName={movie} mediaType={1} pageType={1} />
        ))}
      </div>

      <h1 className="mt-2">Suggestion</h1>
      <hr></hr>
      <div>
        {suggestedMedias.map((movie, index) => (
          <Media key={index} mediaName={movie} mediaType={1} pageType={1} />
        ))}
      </div>
    </Container>
  );
}
