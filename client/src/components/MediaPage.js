import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";

import WatchedMediaImage from "../images/mediaToWatch.png";

import Comment from "./Media/Comment";
import MediaBox from "./MediaBox";

export default function MediaPage() {
  const [progress, setProgress] = useState(0);
  const [buttonActive, setButtonActive] = useState({
    watch: true,
    finish: false,
  });
  const [mediaName, setMediaName] = useState();
  const [nextMedia, setNextMedia] = useState(null);
  const [suggestedMedias, setSuggestedMedias] = useState([{}]);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([{}]);
  const [commentText, setCommentText] = useState("");

  const history = useHistory();

  useEffect(() => {
    let path = history.location.pathname.substring(7);
    setMediaName(path);

    const unListen = history.listen(() => {
      let path = history.location.pathname.substring(7);
      setMediaName(path);

      window.scrollTo(0, 0);
    });

    return () => {
      unListen();
    };
  }, []);

  useEffect(() => {
    // TODO fetch progress and set button actives accordingly
    // TODO fetch suggested and next(if series) media, rating
    // TODO fetch comments

    setProgress(0);
    setButtonActive({ watch: true, finish: false });
    setRating(3);
    setSuggestedMedias([
      { name: "aaa", type: 0 },
      { name: "bbb", type: 1 },
    ]);
    setNextMedia({ name: "sss", type: 0 });
    setComments([
      {
        commentId: "",
        username: "cevat",
        text: "slm ben cvt, proje cok eglenceli",
        subComments: [
          {
            commentId: "",
            username: "yusuf",
            text: "@_@",
            subComments: [],
            parentId: "",
          },
        ],
        parentId: null,
      },
      {
        commentId: "",
        username: "talha",
        text: "<3",
        subComments: [
          {
            commentId: "",
            username: "hakan",
            text: "<3",
            subComments: [],
            parentId: "",
          },
        ],
        parentId: null,
      },
    ]);
  }, [mediaName]);

  useEffect(() => {
    if (progress === 3) {
      // TODO fetch, update progress
      setButtonActive({ watch: false, finish: true });
    }
    if (progress === 4) {
      // TODO fetch, update finish
      setButtonActive({ watch: false, finish: false });
    }
  }, [progress]);

  const progressBar = (index) => {
    return (
      <div
        style={{
          display: "inline-block",
          width: index === 3 ? "34%" : "33%",
          height: "100%",
          backgroundColor: progress < index ? "gray" : "#303030",
          border: "1px black solid",
        }}
      />
    );
  };

  const option = (index) => {
    if (rating === index)
      return (
        <option value={"" + index} selected="selected">
          {index}
        </option>
      );
    return <option value={"" + index}>{index}</option>;
  };

  const handleChange = (e) => {
    const { value, name } = e.currentTarget;
    if (name === "mediaRating") {
      // TODO fetch, value for rating
      setRating(value);
      console.log(value);
    }
    if (name === "commentText") {
      setCommentText(value);
    }
  };

  const getComments = (comments, depth) => {
    console.log("------ ", comments, depth);
    if (comments == undefined || comments.length === 0) return;
    console.log("here");
    return comments.map((comment) => {
      return (
        <React.Fragment>
          <Comment depth={depth} content={comment} />
          {getComments(comment.subComments, depth + 1)}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="row">
      <div className="col-9" style={{ borderRight: "2px solid black" }}>
        <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
          <div className="card bg-secondary">
            <h1 className="h1 text-center mt-5 text-white">{mediaName}</h1>
            <div
              style={{
                height: "40vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "-50px",
              }}
            >
              <button
                className={`btn btn-success btn-lg p-5 w-25 ${
                  !buttonActive.watch && "disabled"
                }`}
                onClick={() => {
                  if (progress < 3) setProgress(progress + 1);
                }}
              >
                Watch
              </button>
              <button
                className={`btn btn-danger btn-lg p-5 w-25 ${
                  !buttonActive.finish && "disabled"
                }`}
                onClick={() => {
                  if (progress === 3) setProgress(progress + 1);
                }}
              >
                Finish
              </button>
            </div>
            <div style={{ height: "20px" }}>
              {progressBar(1)}
              {progressBar(2)}
              {progressBar(3)}
            </div>
          </div>

          <div
            className={`mt-4 ${
              (buttonActive.watch != false || buttonActive.finish != false) &&
              "d-none"
            }`}
          >
            <label className="mr-1">Rating:</label>
            <select name="mediaRating" onChange={handleChange}>
              {option(1)}
              {option(2)}
              {option(3)}
              {option(4)}
              {option(5)}
              {option(6)}
              {option(7)}
              {option(8)}
              {option(9)}
              {option(10)}
            </select>
          </div>

          <div className="mt-4">
            <div className="card bg-white p-5">
              <h3>Comments</h3>
              <hr />
              <div>
                <textarea
                  className="w-100"
                  value={commentText}
                  onChange={handleChange}
                  name="commentText"
                />
                <button className="btn btn-sm btn-success w-100 my-2">
                  Send
                </button>
              </div>
              {getComments(comments, 0)}
            </div>
          </div>
        </div>
      </div>
      <div className="col-3">
        {nextMedia && (
          <React.Fragment>
            <h3 className="h3" style={{ fontWeight: "700" }}>
              Next Episode
            </h3>
            <MediaBox mediaType={nextMedia.type} mediaName={nextMedia.name} />
            <div className="mb-5"></div>
          </React.Fragment>
        )}
        <h3 className="h3" style={{ fontWeight: "700" }}>
          Suggestions
        </h3>
        {suggestedMedias.map((media, index) => (
          <MediaBox key={index} mediaType={media.type} mediaName={media.name} />
        ))}
      </div>
    </div>
  );
}
