import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container, Divider } from "semantic-ui-react";
import Media from "./Media/Media";

import searchLogo from "../images/searchIcon.png";

import "../css/Search.css";

export default function Search(props) {
  const [search, setSearch] = useState({ text: "", genre: "", sortby: "" });
  const [mediaList, setMediaList] = useState([{}]);
  const [allGenres, setAllGenres] = useState([]);

  function handleMediaSearchBar(event) {
    console.log(event.target.value);
    setSearch(event.target.value);
  }

  useEffect(() => {
    // fetch medias according to the search state
    setMediaList([
      { name: "aaa", type: 0 },
      { name: "bbb", type: 1 },
      { name: "ccc", type: 0 },
    ]);
  }, [search]);

  useEffect(() => {
    // TODO fetch all genres
    setAllGenres(["Action", "Adventure", "Comedy", "Drama", "Horror"]);
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.currentTarget;
    console.log(value, name);
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
        <React.Fragment key={index}>
          <Divider />
          <Media mediaName={media.name} mediaType={media.type} pageType={0} />
        </React.Fragment>
      ))}
    </Container>
  );
}
