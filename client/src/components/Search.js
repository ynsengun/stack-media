import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container, Divider } from "semantic-ui-react";
import Media from "./Media/Media";

import searchLogo from "../images/searchIcon.png";
import { checkResponse } from "../util/ResponseUtil";
import { getAuthName, getAuthToken, isAdmin } from "../util/AuthenticationUtil";

import "../css/Search.css";

export default function Search(props) {
  const { isParty, handleMediaSelect } = props;

  const [search, setSearch] = useState({
    text: "",
    genre: "Action",
    sortby: "",
    startDate: null,
    endDate: null,
  });
  const [mediaList, setMediaList] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    // fetch medias according to the search state
    console.log( search);
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
          timeStamp: search.startDate,
          endDate: search.endDate,
        }),
      })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
          let resArray = r.data;
          console.log(r.data);
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
    // fetch channels of the user
    fetch("http://localhost:4000/api/user/getChannels", {
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
        setChannels(resArray);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error, could not fetch your created channels!");
      });
  }, [channels]);

  useEffect(() => {
    // fetch genre for display!
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
        setAllGenres(resArray.map((x) => x.title));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error, could not fetch genres!");
      });
  }, []);

  function handleOrder(e) {
    console.log("test1" > "testtest1");
    let sortAlgos = {
      "Date Asc": orderByDateAsc,
      "Date Desc": orderByDateDesc,
      "Name Asc": orderByNameAsc,
      "Name Desc": orderByNameDesc,
    };

    let sortedMediaList = [...mediaList];
    sortedMediaList.sort(sortAlgos[e.target.value]);
    setMediaList(sortedMediaList);
  }

  function orderByDateAsc(m1, m2) {
    if (m1.timeStamp > m2.timeStamp) {
      return 1;
    }
    return -1;
  }

  function orderByDateDesc(m1, m2) {
    if (m1.timeStamp < m2.timeStamp) {
      return 1;
    }
    return -1;
  }

  function orderByNameAsc(m1, m2) {
    if (m1.name > m2.name) {
      return 1;
    }
    return -1;
  }

  function orderByNameDesc(m1, m2) {
    if (m1.name < m2.name) {
      return 1;
    }
    return -1;
  }

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
          <select name="sortby" onChange={handleOrder}>
            <option value="Date Asc">Date Ascending</option>
            <option value="Date Desc">Date Descending</option>
            <option value="Name Asc">Name Ascending</option>
            <option value="Name Desc">Name Descending</option>
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

        <div className="mr-4">
          <label className="mr-1">From:</label>
          <input type="date" id="date1" name="startDate" onChange={handleChange}></input>
          <label className="mr-1">To:</label>
          <input type="date" id="date2" name="endDate" onChange={handleChange}></input>
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
          channelList={channels}
          pageType={isParty === true ? 5 : isAdmin() ? 2 : 0}
          handleMediaSelect={handleMediaSelect}
          tvshowname={media.TVSerieName}
        />
      ))}
    </Container>
  );
}
