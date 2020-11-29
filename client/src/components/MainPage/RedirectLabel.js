import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "../../css/MainPage/MediaBar.css";

export default function RedirectLabel(props) {
  
    return (
    <Container>
        <div className="ScrollBarLabels">
             <label className="ClickableLabel" onClick={ () => { props.onClickEvent() } }>{ props.labelName}</label>
        </div>
    </Container>
  );
}
