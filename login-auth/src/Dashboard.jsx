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

    const[marks,setMarks]=useState([
        {maths:0,physics:0,
            chemistry:0,
            electronics:0,electrical:0,computer:0}]);

    const [tempScores, setTempScores] = useState({ ...scores });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempScores({ ...tempScores, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setScores({ ...tempScores }); // Update the scores state with tempScores
        Axios.post('http://localhost:3001/updateScores', { ...tempScores, id: user.id })
            .then((response) => {
                console.log(response.data);
                // Fetch the updated data and display it
            })
            .catch((error) => {
                console.error('Axios error:', error.response);
            });
    };

    if(location.state?.userData){
        Axios.get('http://localhost:3001/user/'+user.id)
        .then((response) => {
            console.log(response.data);
            setMarks(response.data[0]);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <div>
                <h1>Dashboard</h1>
                <h3>Welcome to the Dashboard</h3>
                <h3>{user?.username}</h3>
                <h4>{user?.email}</h4>
            </div>
            <button onClick={() => { navigate('/profile', { state: { profile: location.state?.userData } }) }}>Profile</button>

            <div>
                <h2>Marks</h2>
                <form onSubmit={handleSubmit}>
                    <input type="number" name="maths" placeholder="Maths" min="0" max="100" onChange={handleInputChange}/>
                    <br/>
                    <input type="number" name="physics" placeholder="Physics" min="0" max="100" onChange={handleInputChange}/>
                    <br/>
                    <input type="number" name="chemistry" placeholder="Chemistry" min="0" max="100" onChange={handleInputChange}/>
                    <br/>
                    <input type="number" name="electronics" placeholder="Electronics" min="0" max="100" onChange={handleInputChange}/>
                    <br/>
                    <input type="number" name="electrical" placeholder="Electrical" min="0" max="100" onChange={handleInputChange}/>
                    <br/>
                    <input type="number" name="computer" placeholder="Computer" min="0" max="100" onChange={handleInputChange}/>
                     <br/>
                    <button type="submit">Update Scores</button>
                </form>
            </div>

            <div>
                <h2>Scores</h2>
                <h4>Maths: {marks.maths}</h4>
                <h4>Computer: {marks.computer}</h4>
                <h4>Physics: {marks.physics}</h4>
                <h4>Chemistry: {marks.chemistry}</h4>
                <h4>Electronics: {marks.electronics}</h4>
                <h4>Electrical: {marks.electrical}</h4>
            </div>

        </>
    );

}

export default Dashboard;