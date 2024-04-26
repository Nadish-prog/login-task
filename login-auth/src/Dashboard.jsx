import React from 'react';
import { useLocation} from "react-router-dom";
import { Link } from 'react-router-dom';
import * as path from "node:path";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Axios from "axios";


function Dashboard(props) {
    const navigate=useNavigate();
    const location=useLocation();
    const user = location.state?.userData;
    console.log(user);

    const [scores, setScores] = useState({
        maths: '',
        physics: '',
        chemistry: '',
        electronics: '',
        electrical: '',
        computer: '',});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setScores({ ...scores, [name]: value });
    };
    const handleSubmit = () => {
        Axios.post('http://localhost:3001/updateScores', { ...scores, id: user.id })
            .then((response) => {
                console.log(response.data);
                // Fetch the updated data and display it
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
        <div>
            <h1>Dashboard</h1>
            <h3>Welcome to the Dashboard</h3>
               <h3>{user?.username}</h3>
            <h4>{user?.email}</h4>
        </div>

            <button onClick={()=>{ navigate('/profile', { state: { profile: location.state?.userData } })}}>Profile</button>

            <div>
                <h2>Maths</h2>
                <form onSubmit={handleSubmit}>
                    <input type="number" name="maths" placeholder="Maths" min="0" onChange={handleInputChange}/>
                    <input type="number" name="physics" placeholder="Physics" min="0" onChange={handleInputChange}/>
                    <input type="number" name="chemistry" placeholder="Chemistry" min="0" onChange={handleInputChange}/>
                    <input type="number" name="electronics" placeholder="Electronics" min="0"
                           onChange={handleInputChange}/>
                    <input type="number" name="electrical" placeholder="Electrical" min="0"
                           onChange={handleInputChange}/>
                    <input type="number" name="computer" placeholder="Computer" min="0" onChange={handleInputChange}/>



                    <button type="submit">Update Scores</button>
                </form>
            </div>


        </>
    );
}

export default Dashboard;