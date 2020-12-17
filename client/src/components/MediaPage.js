import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";

import WatchedMediaImage from "../images/mediaToWatch.png";
import { checkResponse } from "../util/ResponseUtil";
import { getAuthName, getAuthToken } from "../util/AuthenticationUtil";
import Comment from "./Media/Comment";
import MediaBox from "./MediaBox";

export default function MediaPage() {
  const [progress, setProgress] = useState(0);
  const [buttonActive, setButtonActive] = useState({
    watch: true,
    finish: false,
  });
  const [mediaId, setmediaId] = useState("");
  const [nextMedia, setNextMedia] = useState(null);
  const [suggestedMedias, setSuggestedMedias] = useState([{}]);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([{}]);
  const [commentText, setCommentText] = useState("");
  const [commentFlag, setCommentFlag] = useState(false);

  const history = useHistory();

  useEffect(() => {
    let path = history.location.pathname.substring(7);
    setmediaId(path);

    const unListen = history.listen(() => {
      let path = history.location.pathname.substring(7);
      setmediaId(path);

      window.scrollTo(0, 0);
    });

    return () => {
      unListen();
    };
  }, []);

  useEffect(() => {
    if ( mediaId != "")
    {
        // TODO fetch progress and set button actives accordingly
        fetch("http://localhost:4000/api/media/getWatch", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: getAuthToken(),
              username: getAuthName(),
    
              mediaId: mediaId,
            }),
          })
            .then((r) => checkResponse(r))
            .then((r) => r.json())
            .then((r) => {
              let resArray = r.data;
              if ( resArray.length == 0) // first time being watched
              {
                    setProgress(0);
                    setButtonActive({ watch: true, finish: false });
                  // initialize watch fetch
                  fetch("http://localhost:4000/api/media/initializeWatch", {
                        method: "POST",
                        mode: "cors",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                        token: getAuthToken(),
                        username: getAuthName(),
                
                        mediaId: mediaId,
                        }),
                    })
                        .then((r) => checkResponse(r))
                        .then((r) => r.json())
                        .then((r) => {
                            toast.success( "First time starting to watch!");
                        })
                    .catch((err) => {
                        console.log(err);
                        toast.error("Error, could not initialize first watch!");
                    });
              }
              else // it is watched in the past, update status accordingly
              {
              }
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error, could not get watch status!");
            });

        // TODO fetch rating (WE CANNOT) wait for server
        // fetch("http://localhost:4000/api/media/getWatch", {
        //     method: "POST",
        //     mode: "cors",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       token: getAuthToken(),
        //       username: getAuthName(),
    
        //       mediaId: mediaId,
        //     }),
        //   })
        //     .then((r) => checkResponse(r))
        //     .then((r) => r.json())
        //     .then((r) => {
        //       let resArray = r.data;
        //       if ( resArray.length == 0) // first time being watched
        //       {
        //             setProgress(0);
        //             setButtonActive({ watch: true, finish: false });
        //       }
        //       else // it is watched in the past, update status accordingly
        //       {
        //       }
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //       toast.error("Error, could not get watch status!");
        //     });

        // TODO fetch suggested and next(if series) media

        setRating(3);
        setSuggestedMedias([
        { name: "aaa", type: 0 },
        { name: "bbb", type: 1 },
        ]);
        setNextMedia({ name: "sss", type: 0 });

    }
  }, [mediaId]);

  useEffect(() => {
   
    // fetch comments
    if (mediaId != null && mediaId != "") {
      fetch("http://localhost:4000/api/media/getComments", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getAuthToken(),
          username: getAuthName(),

          mediaId: mediaId,
        }),
      })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
          setComments(r.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error, could not get comments!");
        });
    }
  }, [mediaId, commentFlag]);

  useEffect(() => {
    if (progress % 4 !== 0) 
    {
        setButtonActive({ watch: false, finish: true }); // watch
    }
    else
    {
        setButtonActive({ watch: false, finish: false }); // finish watching
    }
  }, [progress]);

  const handleProgressBarPress = () => {

    // make progress, watch fetch
    fetch("http://localhost:4000/api/media/watch", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getAuthToken(),
          username: getAuthName(),

          mediaId: mediaId,
        }),
      })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
            setProgress( progress + 1);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error, media cannot be watched!");
        });
  };    

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

  const handleCommentSend = (comment, commentText) => {
    if (comment == null) {
      // to media directly
      // fetch post comment
      console.log(commentText, mediaId);
      fetch("http://localhost:4000/api/user/addComment", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getAuthToken(),
          username: getAuthName(),

          mediaId: mediaId,
          text: commentText,
          timeStamp: Date.now(),
          parentId: null,
        }),
      })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
          toast.success("Successfully posted comment!");
          // fetch after this point, fetching all the comments will be easier I think instead of arranging the comments array  :/
          setCommentFlag(!commentFlag);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error, Could not post comment!");
        });
    } else {
      // to a comment, u can find all info inside the comment parameter
      // fetch post comment
      console.log(commentText, comment);
      fetch("http://localhost:4000/api/user/addComment", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getAuthToken(),
          username: getAuthName(),

          mediaId: mediaId,
          text: commentText,
          timeStamp: Date.now(),
          parentId: comment.commentId,
        }),
      })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
          toast.success("Successfully posted sub comment!");
          // fetch after this point, fetching all the comments will be easier I think instead of arranging the comments array  :/
          setCommentFlag(!commentFlag);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error, Could not post sub comment!");
        });
    }
  };

  const getComments = (comments, depth) => {
    if (comments == undefined || comments.length === 0) return;
    return comments.map((comment) => {
      return (
        <React.Fragment>
          <Comment
            depth={depth}
            content={comment}
            sendEvent={handleCommentSend}
          />
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
            <h1 className="h1 text-center mt-5 text-white">{mediaId}</h1>
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
                    handleProgressBarPress();
                  //if (progress < 3) setProgress(progress + 1);
                }}
              >
                Watch
              </button>
              <button
                className={`btn btn-danger btn-lg p-5 w-25 ${
                  !buttonActive.finish && "disabled"
                }`}
                onClick={() => {
                    handleProgressBarPress();
                  //if (progress === 3) setProgress(progress + 1);
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
                <button
                  className="btn btn-sm btn-success w-100 my-2"
                  onClick={() => {
                    handleCommentSend(null, commentText);
                    setCommentText("");
                  }}
                >
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
