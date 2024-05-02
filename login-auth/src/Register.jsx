import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function Register() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(""); // New state for email validation

    const validateEmail = (email) => {
        // Simple email validation using regex
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
    };
    const handleRegister = () => {
        // Validate email
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }
        // Validate other fields (not null)
        if (!username || !email || !password) {
            alert("Please fill in all required fields.");
            return;
        }
        // If all validations pass, proceed with registration
        Axios.post("http://localhost:3001/register", {
            username: username,
            email: email,
            password: password
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="login">
            <h1>Register</h1>
            <input
                type="text"
                placeholder="Name"
                onChange={(e) => setUserName(e.target.value)}
                required
            /><br />
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(""); // Clear email error when user types
                }}
                required
            /><br />
            {emailError && <p className="error-message">{emailError}</p>} {/* Display email error */}
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br />
            <button onClick={handleRegister}>Register</button>
            <h3><Link to="/">Login.</Link></h3>
        </div>
    );
}
export default Register;
