import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const [navButtons, setNavButtons] = useState("")

	useEffect(() => {
		localStorage.getItem("token") ? setNavButtons(		
			<div className="ml-auto">
				<button onClick={handleClickLogOut} className="btn btn-primary">LogOut</button>
			</div>
		) : 
		setNavButtons(			
		<div className="row justify-content-center">
			<Link to="/login" className="btn btn-primary m-3 col">LogIn</Link>
			<Link to="/signup" className="btn btn-primary m-3 col">SingUp</Link>
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
