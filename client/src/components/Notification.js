import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container, Card } from "semantic-ui-react";

export default function Notification() {
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
        <Card className="text-center p-5">
            Hellooo world!
        </Card>
    </div>
  );
}


