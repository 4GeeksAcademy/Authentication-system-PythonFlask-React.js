import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const getToken = (event) => {
		event.preventDefault();
		console.log("About to fetch");
		fetch("https://ominous-acorn-j7vgq445q4j2r5x-3001.app.github.dev/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"email": email,
				"password": password,
			})
		})
		.then((resp) => {
			console.log("Just to fetched, on first .then")
			if (resp.status !== 200) {
				console.error(`The status code was: ${resp.status} when getting token.`);
				return
			} else {
				console.log(`Response status was 200!: ${resp.status}`)
				return resp.json();
			}
		})
		//.then((data) => {})
		.catch((e) => {
			console.error(`Error catched while getting token: ${e}`);
		})
	}
	
	return (
		<div className="w-80 mt-5">
			<h1>Login</h1>
			<form onSubmit={getToken}>
			<div className="form-group">
				<label htmlFor="emailInput">Enter Email</label>
				<input type="text" className="form-control" id="emailInput" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
			</div>
			<div className="form-group">
				<label htmlFor="passwordInput">Enter Password</label>
				<input type="password" className="form-control" id="passwordInput" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
			</div>
				<button type="submit" className="btn btn-primary">Login</button>
			</form>
		</div>
	);
};



