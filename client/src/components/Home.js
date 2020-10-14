import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Container,
  Button,
} from "reactstrap";

export default function Home() {
  const [text, setText] = useState("Error");

  useEffect(() => {
    fetch("http://localhost:8000/ping")
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
      <Card color="primary" className="text-center shadow">
        <CardBody>
          <CardTitle>Test Server - Client</CardTitle>
          <CardText>
            <h1>{text}</h1>
          </CardText>
        </CardBody>
      </Card>
      <Button
        color="danger"
        className="mt-5 text-center w-100 shadow"
        onClick={sendToast}
      >
        Send Me Toast!
      </Button>
    </Container>
  );
}
