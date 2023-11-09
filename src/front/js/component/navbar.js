import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const [navButtons, setNavButtons] = useState("")

	useEffect(() => {
		localStorage.getItem("token") ? setNavButtons(		
			<div className="ml-auto">
				<Link to="/private" className="btn btn-primary m-3 col">Private</Link>
				<button onClick={handleClickLogOut} className="btn btn-danger">Logout</button>
			</div>
		) : 
		setNavButtons(			
		<div className="row justify-content-center">
			<Link to="/login" className="btn btn-primary m-3 col">Login</Link>
			<Link to="/signup" className="btn btn-primary m-3 col">Singup</Link>
		</div>)
	}, [localStorage.getItem("token")])

	const handleClickLogOut = async () => {
		await localStorage.removeItem("token")
		location.reload()
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				{
					navButtons
				}
			</div>
		</nav>
	);
};
