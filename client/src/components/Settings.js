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
    // fetch all-genres, my-genres, suggested-medias, medias
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
        setAllGenres(resArray.map((x) => x.title));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error, could not fetch genres!");
      });
    
    // TODO WAIT FOR SERVER to implement getUserGenrePreference => than set my genres in the response
    // fetch("http://localhost:4000/api/channel/create", {
    //         method: "POST",
    //         mode: "cors",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(
    //         {
    //             token: getAuthToken(),
    //             username: getAuthName(),
            
            
    //         }),
    //     })
    //     .then((r) => checkResponse(r))
    //     .then((r) => r.json())
    //     .then((r) => {
    //         console.log( r);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         toast.error("error");
    //     });

    setMyGenres(["Action", "Drama"]);
  }, []);

  const getButtonClass = (genre) => {
    return myGenres.includes(genre)
      ? "btn btn-danger ml-3"
      : "btn btn-success ml-3";
  };

  const handleGenreClick = (genre) => {
    if (myGenres.includes(genre)) 
    {
        // TODO fetch, delete this genre from user
        

        let temp = [];
        myGenres.forEach((g) => {
            if (g != genre) temp.push(g);
        });
        setMyGenres(temp);
    } else {
        // TODO fetch, add this genre from user

        fetch("http://localhost:4000/api/channel/create", {
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
                console.log( r);
            })
            .catch((err) => {
                console.log(err);
                toast.error("error");
            });

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
