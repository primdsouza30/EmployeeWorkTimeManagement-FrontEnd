import Navbar from "./navbar"
import axios from "axios";
import React, { useEffect, useState } from "react";

function CreateProject(){
    const [title, setTitle] = useState("");
    const [msg, setMsg] = useState(null);

    const addProject = () => {
        const data = {
            title,
        };

        axios.post('http://localhost:8081/capstone/project/add', data, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setMsg('Project Added Successfully..');
        })
        .catch(err => {
            setMsg('project Onboarding Failed.. please contact IT Admin');
        });

        window.scrollTo(0, 0);
    };

    

    return(
        <div>
            <Navbar />
            <section className="container">
                <div className="card shadow-lg">
                    <div className="card-body">
                        <h2 className="text-center fw-bold mb-4">Create Project</h2>
                        {msg && (
                            <div className="alert alert-primary" role="alert">
                                {msg}
                            </div>
                        )}
                        <div className="form-container">
                            <div className="form-group mb-3">
                                <label className="form-label">Enter Title:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter full name"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary" onClick={addProject}>Create Project </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default CreateProject