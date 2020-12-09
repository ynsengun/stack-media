import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function Settings() {
  const [allGenres, setAllGenres] = useState([]);
  const [myGenres, setMyGenres] = useState([]);

  useEffect(() => {
    // TODO fetch all-genres, my-genres, suggested-medias, medias
    setAllGenres(["Action", "Adventure", "Comedy", "Drama", "Horror"]);
    setMyGenres(["Action", "Drama"]);
  }, []);

  const getButtonClass = (genre) => {
    return myGenres.includes(genre)
      ? "btn btn-danger ml-3"
      : "btn btn-success ml-3";
  };

  const handleGenreClick = (genre) => {
    if (myGenres.includes(genre)) {
      // TODO fetch, delete this genre from user
      let temp = [];
      myGenres.forEach((g) => {
        if (g != genre) temp.push(g);
      });
      setMyGenres(temp);
    } else {
      // TODO fetch, add this genre from user
      setMyGenres([...myGenres, genre]);
    }
  };

  return (
    <Container>
      <div className="card bg-white p-5">
        <div className="card-body">
          <h3 className="h3">Settings</h3>
        </div>
      </div>

      <div className="card bg-white mt-5 p-5">
        <h3 className="h3">Preferences</h3>
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
      </div>
    </Container>
  );
}
