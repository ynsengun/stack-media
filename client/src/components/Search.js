import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Media from "./Movie/Media";

export default function Search(props) {
  /*
  state {
    searchText: "search me"
  };

  [searchText,] = useState("");
  [photo, setPhote] = useSatte("");

  function handleMediaSearch(event) {
    console.log( "Lan");
    setSearchTex(event.target.value);
  };

  useEffect(() => {

  }, [searchText]);
  */
  return (
    <Container>
        <label>First name:</label>
        <input type="text" id="fname" name="fname"></input>
        
    </Container>
  );
}
