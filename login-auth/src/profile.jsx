import React from 'react';
import{useLocation} from "react-router-dom";
import { useEffect } from 'react';
import Axios from 'axios';
import {useState} from "react";

function Profile(props) {
    const location=useLocation();
    const profile = location.state?.profile;
    console.log(location.state);
    console.log(profile);

    const [users, setUsers]=useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/users')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (!profile) {
        // Redirect to Dashboard or show a message
        return <p>No profile data found. Please go back to the dashboard.</p>;
    }else {
        return (
            <>
                <div>
                    <h1>Profile</h1>
                    <h3>{profile?.username}</h3>
                    <h4>{profile?.email}</h4>
                </div>

                <div>
                    <h1>Profile</h1>
                    <table>
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default Profile;