import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container, Divider } from "semantic-ui-react";
import Media from "./Media/Media";

import searchLogo from "../images/searchIcon.png";
import { checkResponse } from "../util/ResponseUtil";
import { getAuthName, getAuthToken, isAdmin } from "../util/AuthenticationUtil";

import "../css/Search.css";

export default function Search() {
  const [search, setSearch] = useState({
    text: "",
    genre: "Action",
    sortby: "",
  });
  const [mediaList, setMediaList] = useState([]);
  const [allGenres, setAllGenres] = useState([]);

  useEffect(() => {
    // fetch medias according to the search state
    if (search.text !== "") {
      fetch("http://localhost:4000/api/media/search", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getAuthToken(),
          username: getAuthName(),

          name: search.text,
          title: search.genre,
        }),
      })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
          let resArray = r.data[0];
          // console.log(resArray, " ---- ", resArray.length);
          setMediaList(resArray);
        })
        .catch((err) => {
          toast.error("Error, could not fetch media!");
        });
    } else {
      setMediaList([]);
    }
  }, [search]);

  useEffect(() => {
    // fetch genre for display!
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
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.currentTarget;
    setSearch({
      ...search,
      [name]: value,
    });
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="mr-4">
          <label className="mr-1">Sort By:</label>
          <select name="sortby" onChange={handleChange}>
            <option value="Date ascending">Date Ascending</option>
            <option value="Date desecending">Date Descending</option>
            <option value="Name ascending">Name Ascending</option>
            <option value="Name descending">Name Descending</option>
          </select>
        </div>

        <div className="mr-4">
          <label className="mr-1">Filter By: </label>
          <select name="genre" onChange={handleChange}>
            {allGenres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-1">Media Name: </label>
          <input
            type="text"
            name="text"
            value={search.text}
            onChange={handleChange}
          />
          <img src={searchLogo} width={30} height={30}></img>
        </div>
      </div>

      {mediaList.map((media, index) => (
        <Media
          key={index}
          mediaId={media.mediaId}
          mediaType={media.type}
          mediaName={media.name}
          pageType={isAdmin() ? 2 : 0}
        />
      ))}
    </Container>
  );
}
