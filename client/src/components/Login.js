import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "../css/Login.css";

import { checkResponse } from "../util/ResponseUtil";
import { saveAuth, isAdmin } from "../util/AuthenticationUtil";

export default function Login() {
  const history = useHistory();
  const loadMainPage = () => {
    if (isAdmin()) history.push("/upload");
    else history.push("/movies");
  };

  const [allGenres, setAllGenres] = useState([]);
  const [myGenres, setMyGenres] = useState([]);

  // states for login
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //states for register
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordCheck, setRegisterPassswordCheck] = useState("");
  const [registerUserType, setRegisterUserType] = useState(false);

  useEffect(() => {

    // fetch all genres
    fetch("http://localhost:4000/api/genre/getGenres", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      }),
    })
      .then((r) => checkResponse(r))
      .then((r) => r.json())
      .then((r) => {
        let resArray = r.data;
        setAllGenres(resArray);
      })
      .catch((err) => {
        toast.error("Error on fetching genre for register page!");
      });
  }, []);

  function handleLoginButtonPress(event) {
    if (loginUsername === "") {
      toast.error("Please write your login username");
      return;
    }
    if (loginPassword === "") {
      toast.error("Please write your login password");
      return;
    }
    login(loginUsername, loginPassword);
  }

  function handleRegisterButtonPress(event) {
    if (registerEmail === "") {
      toast.error("Please write down your email");
      return;
    }
    if (registerUsername === "") {
      toast.error("Please write down your username");
      return;
    }
    if (registerPassword === "" || registerPasswordCheck === "") {
      toast.error("Please fill your password!");
      return;
    }
    if (registerPasswordCheck !== registerPassword) {
      toast.error("Check your password! Your passwords do not match...");
      return;
    }

    if ( !registerUserType && myGenres.length == 0)
    {
        toast.error( "You must specify at least one genre!");
        return;
    }
    register();
  }

  function login(nameArg, passArg) {
    console.log(loginUsername + " " + loginPassword);
    fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: nameArg,
        password: passArg,
      }),
    })
      .then((r) => checkResponse(r))
      .then((r) => r.json())
      .then((r) => {
        let res = {
          username: r.data.username,
          userType: r.data.userType,
          token: r.data.token,
        };
        saveAuth(res);
        console.log(res.token);
        loadMainPage();
      })
      .catch((err) => {
        console.log(err);
        toast.error("error");
      });
  }

  function register() {
    fetch("http://localhost:4000/api/user/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: registerUsername,
        password: registerPassword,
        email: registerEmail,
        userType: registerUserType ? "ROLE_ADMIN" : "ROLE_USER",

        genres: allGenres.filter(filterBySelection),
      }),
    })
      .then((r) => checkResponse(r))
      .then((r) => r.json())
      .then((r) => {
        login(registerUsername, registerPassword);
      })
      .catch((err) => {
        console.log(err);
        toast.error("error");
      });
  }

  const getButtonClass = (genre) => {

    let match = false;
    myGenres.forEach( x => {
        if ( x.genreId === genre.genreId)
        {
            match = true;
        }
    });
    return match ? "btn btn btn-success ml-3" : "btn btn btn-danger ml-3";
};

const handleGenreClick = (genre) => {
        
    let match = false;
    myGenres.forEach( x => {
        if ( x.genreId === genre.genreId)
        {
            match = true;
        }
    });
    
    if (match) 
    {
        let temp = [];
        myGenres.forEach((g) => {
            if (g.genreId !== genre.genreId) temp.push(g);
        });
        
        setMyGenres(temp);
    } 
    else 
    {
        setMyGenres([...myGenres, genre]);
    }
};

function filterBySelection(genre) {
    for (let i = 0; i < myGenres.length; i++) {
    if (genre.genreId === myGenres[i].genreId) {
        console.log(
        "Genre title: " + genre.title + " selected genre: " + myGenres[i]
        );
        return true;
    }
    }
    return false;
}

  return (
    <Container>
      <div className="DivWrapper">
        <div className="LoginPageSection">
          <h1>Login</h1>
          <div>
            <label>Username:</label>
          </div>
          <div>
            <input
              className="TextInput"
              type="text"
              id="usernameLoginInputID"
              onInput={(e) => setLoginUsername(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label>Password:</label>
          </div>
          <div>
            <input
              className="TextInput"
              type="password"
              id="passwordLoginInputID"
              onInput={(e) => setLoginPassword(e.target.value)}
              required
            ></input>
          </div>
          <div className="CenterButton">
            <button onClick={handleLoginButtonPress}>Login</button>
          </div>
        </div>
        <div className="VerticalLine"></div>
        <div className="LoginPageSection">
          <h1>Register</h1>
          <div>
            <label>Email:</label>
          </div>
          <div>
            <input
              className="TextInput"
              type="text"
              id="emailRegisterInputID"
              onInput={(e) => setRegisterEmail(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label>Username:</label>
          </div>
          <div>
            <input
              className="TextInput"
              type="text"
              id="usernameRegisterInputID"
              onInput={(e) => setRegisterUsername(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label>Password:</label>
          </div>
          <div>
            <input
              className="TextInput"
              type="password"
              id="passwordRegisterInputID"
              onInput={(e) => setRegisterPassword(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label>Password (Repeat):</label>
          </div>
          <div>
            <input
              className="TextInput"
              type="password"
              id="passwordRegisterInput2ID"
              onInput={(e) => setRegisterPassswordCheck(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label className="mr-3">Genres:</label>
            {allGenres.map((genre) => (
            <button
                className={getButtonClass(genre)}
                onClick={() => {
                handleGenreClick(genre);
                }}
            >
                {genre.title}
            </button>
            ))}
          </div>
          <div>
            <input
              type="checkbox"
              id="companyUserInputID"
              onInput={(e) => setRegisterUserType(e.target.value)}
            ></input>
            <label>I am a company user</label>
          </div>
          <div className="CenterButton">
            <button onClick={handleRegisterButtonPress}>Register</button>
          </div>
        </div>
      </div>
    </Container>
  );
}
