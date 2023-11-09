import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const SignUp = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleInputChange = e => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const signupFetch =(e) => {
        e.preventDefault();
        fetch(`${process.env.BACKEND_URL}api/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        })
        .then (() => {
            console.log("Registration successful!");
            alert("Registration successful!")
        })
        .then(() => {
            navigate("/login")
        })
        .catch ((err) => {
            console.error("Registration failed", err);
            alert("Registration failed")
        })
        

    };

    return (
        <div className="text-center mt-5">
            <img src={rigoImageUrl} alt="Rigo Baby" />
            <h1>Sign Up</h1>
            <form className="container my-4 py-4 shadow rounded" onSubmit={signupFetch}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        onChange={handleInputChange}
                        value={formData.email}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={handleInputChange}
                        value={formData.password}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>

            This boilerplate comes with lots of documentation:{" "}
            <a href="https://start.4geeksacademy.com/starters/react-flask">
                Read documentation
            </a>
        </div>
    );
};