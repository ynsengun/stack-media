import React from "react";
import { Container, Divider, Header } from "semantic-ui-react";

export default function Footer() {
  return (
    <Container className="py-5">
      <Divider />
      <Header size="tiny" textAlign="center">
        &copy; 2020, Stack Media, Penta Core
      </Header>
    </Container>
  );
}
