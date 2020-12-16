import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Checkbox, Container } from "semantic-ui-react";

export default function Comment(props) {
  const { depth, content } = props;

  const [commentText, setCommentText] = useState("");
  const [replyBox, setReplyBox] = useState(false);
  const [upvoted, setUpvoted] = useState(false);

  useEffect(() => {
    // TODO fetch upvoted
  }, []);

  function handleUpvote(event) {
    console.log("Pressed upvote checkbox");
    setUpvoted(!upvoted);
  }

  const handleChange = (e) => {
    const { value, name } = e.currentTarget;
    if (name === "commentText") {
      setCommentText(value);
    }
  };

  return (
    <div
      className={depth === 0 ? "card bg-light mt-4" : "card bg-light mt-2"}
      style={{ marginLeft: depth * 30 }}
    >
      <div className="row">
        <div className="col-10">
          <div className="card-body">
            <label className="h4 w-100">{content.username}</label>
            {content.text}
          </div>
        </div>
        <div className="col-2">
          <button
            className={
              upvoted
                ? "btn btn-success h-50 float-right"
                : "btn btn-dark h-50 float-right"
            }
            style={{ borderRadius: 0, width: "80px" }}
            onClick={handleUpvote}
          >
            Upvote
          </button>
          <button
            className="btn btn-primary h-50 float-right"
            style={{ borderRadius: 0, width: "80px" }}
            onClick={() => {
              setReplyBox(!replyBox);
            }}
          >
            Reply
          </button>
        </div>
      </div>
      {replyBox && (
        <div>
          <textarea
            className="w-100"
            value={commentText}
            onChange={handleChange}
            name="commentText"
          />
          <button
            className="btn btn-sm btn-success w-100"
            style={{ marginTop: "-10px" }}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
