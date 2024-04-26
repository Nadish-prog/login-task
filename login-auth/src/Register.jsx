import React from 'react';
import {useState} from "react";
import './Register.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';
function Register(props) {

    const [username,setUserName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const register =()=>{
        Axios.post("http://localhost:3001/register",{
            username:username,
            email:email,
            password:password
        }).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        });
    };

    return (
        <div className="login">
            <h1>Register</h1>
            <input type="text" placeholder="Name" onChange={(e)=>setUserName(e.target.value)} /><br/>
            <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/><br/>
            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/><br/>
            <button onClick={register}>Register</button>
            <h3><Link to="/">Login.</Link></h3>
        </div>
    );
}

export default Register;