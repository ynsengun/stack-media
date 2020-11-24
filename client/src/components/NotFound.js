import React from "react";
import { Header, Container, Card } from "semantic-ui-react";

export default function NotFound() {
  return (
    <Container>
      <Card fluid className="my-5 py-5" raised>
        <Card.Content>
          <Header size="huge" textAlign="center">
            404 | Not Found
          </Header>
        </Card.Content>
      </Card>
    </Container>
  );
}
