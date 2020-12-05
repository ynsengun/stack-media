import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "../css/Login.css";

import { checkResponse } from "../util/ResponseUtil";

export default function Login() {
	async function handleLoginButtonPress(event) {
		//TODO: validation of input
        //TODO: send login request
        
        const response = await fetch("http://localhost:4000/api/user/login", 
        {
            method: 'POST',
            body: {
                username: "aykan",
                password: "1234567890",
            }
        }).then( (r) => checkResponse(r) )
        .then( (r) => console.log( r.json() ) )
        .catch( (err) => 
        {
                  toast.error("error");
        })

        // do something with myJson
	}

	function handleRegisterButtonPress(event) {
		//TODO: validation of input
        let emailText = document.getElementById( "emailRegisterInputID").value;
        let usernameText = document.getElementById( "usernameRegisterInputID").value;
        let passwordText = document.getElementById( "passwordRegisterInputID").value;
        let passwordCheckText = document.getElementById( "passwordRegisterInput2ID").value;
        let userTypeBool = document.getElementById( "companyUserInputID").value;

        if ( emailText === "")
        {
            toast.error( "Please write down your email");
        }
        if ( usernameText === "")
        {
            toast.error( "Please write down your username");
        }
        if ( passwordText === "" || passwordCheckText === "")
        {
            toast.error( "Please fill your password!");
        }
        if ( passwordText !== passwordCheckText)
        {
            toast.error( "Check your password! Your passwords do not match...");
        }

        //TODO: send register request
        fetch("http://localhost:4000/api/user/register", 
        {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( 
                {
                    username: usernameText,
                    password: passwordText,
                    email: emailText,
                    userType: "admin",
                }
            ),
        }).then( (r) =>
            checkResponse( r))
        .then( (r) => r.json() )
        .then( (r) => console.log( r))
        .catch( (err) => 
        {
            console.log( err);
            toast.error("error");
        });
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
						></input>
					</div>
					<div>
						<label>Password:</label>
					</div>
					<div>
						<input
							className="TextInput"
							type="text"
							id="passwordLoginInputID"
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
						></input>
					</div>
					<div>
						<label>Password:</label>
					</div>
					<div>
						<input
							className="TextInput"
							type="text"
							id="passwordRegisterInputID"
						></input>
					</div>
					<div>
						<label>Password (Repeat):</label>
					</div>
					<div>
						<input
							className="TextInput"
							type="text"
							id="passwordRegisterInput2ID"
						></input>
					</div>
					<div>
						<input type="checkbox" id="companyUserInputID"></input>
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
