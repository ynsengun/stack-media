import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "../css/Login.css";

export default function Login() {
	function handleLoginButtonPress(event) {
		//TODO: validation of input
		//TODO: send login request
	}

	function handleRegisterButtonPress(event) {
		//TODO: validation of input
		//TODO: send register request
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
							id="passwordRegisterInputID"
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
