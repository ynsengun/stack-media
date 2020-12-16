import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "../../css/MainPage/MediaBar.css";

export default function RedirectLabel(props) {
  const { onClickEvent, labelName, type, labelId, handleDelete } = props;

  return (
    <Container>
      <div className="ScrollBarLabels">
        <label
          className="ClickableLabel"
          onClick={() => {
            onClickEvent(type, labelId);
          }}
        >
          {labelName}
        </label>
        <button
          className="btn btn-danger btn-sm float-right"
          onClick={() => {
            handleDelete(labelId);
          }}
        >
          x
        </button>
      </div>
    </Container>
  );
}
