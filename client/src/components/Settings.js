import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { checkResponse } from "../util/ResponseUtil";
import { getAuthName, getAuthToken } from "../util/AuthenticationUtil";

export default function Settings() {
  const [allGenres, setAllGenres] = useState([]);
  const [myGenres, setMyGenres] = useState([]);

  useEffect(() => {
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
    
      // fetch my-genres
    fetch("http://localhost:4000/api/user/getUserGenres", {
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
            setMyGenres( resArray);
        })
        .catch((err) => {
            console.log(err);
            toast.error("Error, could not fetch your previously recorded genre!");
        });
  }, []);

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
        fetch("http://localhost:4000/api/user/deleteGenre", {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                token: getAuthToken(),
                username: getAuthName(),    
                
                genreId: genre.genreId
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
            toast.error("Error, could not delete genre from your preference!");
        });
    } 
    else 
    {
        // fetch, add this genre from user
        fetch("http://localhost:4000/api/user/addGenre", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                token: getAuthToken(),
                username: getAuthName(),
                
                genreId: genre.genreId
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
            toast.error("Error, could not add your new genre preference!");
        });
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
              {genre.title}
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
}
