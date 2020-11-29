import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {checkResponse} from "../util/ResponseUtil";
import {
  Card,
  Container,
  Button,
} from "semantic-ui-react";

import FriendsBar from  "./MainPage/FriendsBar";
import MediaBar from  "./MainPage/MediaBar";

export default function Home() {
  const [text, setText] = useState("Error");

  useEffect(() => {
    fetch("http://localhost:8000/ping")
      .then((r) => checkResponse(r))
      .then((r) => r.json())
      .then((response) => {
        setText(response.msg);
        toast.success("Request Successful");
      })
      .catch((err) => {
        toast.error("error");
      });
  }, []);

  const sendToast = () => {
    toast.warning("Here It Is");
  };

  return (
    <Container>
      <Card className="text-center w-100" raised>
          Test Server - Client
          <h1>{text}</h1>
          This page is used to present movies/episodes
      </Card>
      <Button
        primary
        className="mt-5 text-center w-100"
        onClick={sendToast}
      >
        Send Me Toast!
      </Button>
      <div>
        <MediaBar></MediaBar>
        <FriendsBar></FriendsBar>
      </div>
    </Container>
  );
}
