import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import '../css/employeeonboarding.css';

function EmployeeOnBoarding() {
    const [jobTitles, setJobTitles] = useState([]);
    const [managers, setManagers] = useState([]);

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [salary, setSalary] = useState("");
    const [jobTitleVal, setJobTitleVal] = useState("");
    const [managerId, setManagerId] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/capstone/jobtype', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setJobTitles(resp.data);
        });

        axios.get('http://localhost:8081/capstone/manager/all', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setManagers(resp.data);
        });
    }, []);

    const addEmployee = () => {
        const data = {
            name,
            city,
            salary,
            jobTitle: jobTitleVal,
            userInfo: {
                username,
                password
            }
        };

        axios.post(`http://localhost:8081/capstone/employee/add/${managerId}`, data, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setMsg('Employee Onboarded Successfully..');
        })
        .catch(err => {
            setMsg('Employee Onboarding Failed.. please contact IT Admin');
        });

        window.scrollTo(0, 0);
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="card shadow-lg">
                    <div className="card-header">
                        <h4>Onboard Employee</h4>
                    </div>
                    <div className="card-body">
                        {msg && (
                            <div className="alert alert-primary" role="alert">
                                {msg}
                            </div>
                        )}
                        <div className="form-container">
                            <h4 className="mb-3">Personal Info</h4>
                            <div className="form-group mb-3">
                                <label className="form-label">Enter Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Enter City:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Enter Salary:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter salary"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Select Job Title:</label>
                                <select
                                    className="form-select"
                                    value={jobTitleVal}
                                    onChange={(e) => setJobTitleVal(e.target.value)}
                                >
                                    <option value="">Select Job Title</option>
                                    {jobTitles.map((title, index) => (
                                        <option value={title} key={index}>{title}</option>
                                    ))}
                                </select>
                            </div>
                            <h4 className="mb-3">Assign Manager</h4>
                            <div className="form-group mb-3">
                                <label className="form-label">Select Manager:</label>
                                <select
                                    className="form-select"
                                    value={managerId}
                                    onChange={(e) => setManagerId(e.target.value)}
                                >
                                    <option value="">Select Manager</option>
                                    {managers.map((manager, index) => (
                                        <option value={manager.id} key={index}>{manager.name}</option>
                                    ))}
                                </select>
                            </div>
                            <h4 className="mb-3">Employee Credentials</h4>
                            <div className="form-group mb-3">
                                <label className="form-label">Enter Username:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Enter Password:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary" onClick={addEmployee}>Add Employee</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeOnBoarding;
