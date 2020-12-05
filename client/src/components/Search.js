import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import MediaSearchContainer from "./Media/MediaSearchContainer";

import searchLogo from "../images/searchIcon.png";

import "../css/Search.css";

export default function Search(props) {

  const [searchText, setSearchText] = useState("Search...");
  const [mediaList, setMediaList] = useState( []);

  function handleMediaSearchBar(event) 
  {
    console.log( event.target.value);
    setSearchText( event.target.value);
  };

  useEffect(() => {
    
  }, [searchText]);

  return (
    <Container>
      <div>
        <label>Sort By:</label>
        <select name="Sort by" id="sortByDropdownInput">
          <option value="Date ascending">Date Ascending</option>
          <option value="Date desecending">Date Descending</option>
          <option value="Name ascending">Name Ascending</option>
          <option value="Name descending">Name Descending</option>
        </select>
        <label>Filter By: </label>
        <select name="Filter by Genre" id="filterByGenreDropdownInput">
          <option value="actionGenre">Action</option>
          <option value="adventureGenre">Adventure</option>
          <option value="comedyGenre">Comedy</option>
          <option value="dramaGenre">Drama</option>
          <option value="horrorGenre">Horror</option>
        </select>
        <label>Media Name: </label>
        <input type="text" id="searchMediaInputID" onChange={handleMediaSearchBar}></input>
        <img src={ searchLogo} width={30} height={30}></img>
      </div>
      <hr></hr>
      <MediaSearchContainer
        mediaType={0}
        mediaName={"Cevat learning React"}
      ></MediaSearchContainer>
            <MediaSearchContainer
        mediaType={1}
        mediaName={"Yusuf learning React"}
      ></MediaSearchContainer>
      <MediaSearchContainer
        mediaType={0}
        mediaName={"Nobody actually learns React"}
      ></MediaSearchContainer>
            <MediaSearchContainer
        mediaType={0}
        mediaName={"Nobody actually learns React"}
      ></MediaSearchContainer>
            <MediaSearchContainer
        mediaType={0}
        mediaName={"Nobody actually learns React"}
      ></MediaSearchContainer>
            <MediaSearchContainer
        mediaType={0}
        mediaName={"Nobody actually learns React"}
      ></MediaSearchContainer>
            <MediaSearchContainer
        mediaType={0}
        mediaName={"Nobody actually learns React"}
      ></MediaSearchContainer>
    </Container>
  );
}
