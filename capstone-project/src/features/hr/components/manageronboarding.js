// ManagerOnBoarding.jsx
import React, { useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import '../css/manageronboarding.css';

function ManagerOnBoarding() {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState(null);

    const addManager = () => {
        const data = {
            name,
            email,
            contact,
            userInfo: {
                username,
                password
            }
        };

        axios.post('http://localhost:8081/capstone/manager/add/', data, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            console.log(resp);
            setMsg('Employee Onboarded Successfully..');
        })
        .catch(err => {
            console.log(err);
            setMsg('Employee Onboarding Failed.. please contact IT Admin');
        });

        window.scrollTo(0, 0);
    };

    return (
        <div>
            <Navbar />
            <section className="container">
                <div className="card shadow-lg">
                    <div className="card-body">
                        <h2 className="text-center fw-bold mb-4">Manager Onboarding</h2>
                        {msg && (
                            <div className="alert alert-primary" role="alert">
                                {msg}
                            </div>
                        )}
                        <div className="form-container">
                            <div className="form-group mb-3">
                                <label htmlFor="name">Enter Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    placeholder="Enter full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Enter Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="contact">Enter Contact:</label>
                                <input
                                    type="text"
                                    id="contact"
                                    className="form-control"
                                    placeholder="Enter contact"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <h4 className="fw-bold">Manager Credentials</h4>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="username">Enter Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password">Enter Password:</label>
                                <input
                                    type="text"
                                    id="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary" onClick={addManager}>Add Manager</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ManagerOnBoarding;
