import Navbar from "./navbar"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Calendar } from 'primereact/calendar';
function AssignProject(){

    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);

    const [employeeVal, setEmployeeVal] = useState("");
    const [projectVal, setProjectVal] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const[projectId,setProjectId] = useState("");
    const [dates, setDates] = useState(null);

    const [msg, setMsg] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/capstone/manager/employee', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setEmployees(resp.data);
        });

        axios.get('http://localhost:8081/capstone/project/all', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setProjects(resp.data);
        });
    }, []);


    const assignProject = () =>{
        console.log(dates)
        let startDate = new Date(dates).toISOString().split("T")[0];
        console.log(startDate)
        /*.toISOString().split("T")[0];
        //let empId = employee.id;
        //let projId = project.id;*/
        const data = {

            "dateofAssign": startDate
            
        };

        axios.post(`http://localhost:8081/capstone/employee/project/assign/${employeeId}/${projectId}`, data, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setMsg('Project Assign Successfully..');
        })
        .catch(err => {
            setMsg('Employee Onboarding Failed.. please contact IT Admin');
        });

        window.scrollTo(0, 0);


    }
    return(
        <div>
            <Navbar />
            <section className="container">
                <div className="card shadow-lg">
                    <div className="card-body">
                        <h2 className="text-center fw-bold mb-4">Assign Project</h2>
                        {msg && (
                            <div className="alert alert-primary" role="alert">
                                {msg}
                            </div>
                        )}
                        <div className="form-container">
                            <div className="form-group mb-3">
                                <label className="form-label">Select Employee</label>
                                <select className="form-select"
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}>
                                <option value="">Select Employee</option>
                                    {employees.map((employee, index) => (
                                        <option value={employee.id} key={index}>{employee.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Select Project:</label>
                                <select
                                    className="form-select"
                                    value={projectId}
                                    onChange={(e) => setProjectId(e.target.value)}
                                >
                                    <option value="">Select Project</option>
                                    {projects.map((project, index) => (
                                        <option value={project.id} key={index}>{project.title}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <br />
                            <button className="btn btn-primary" onClick={assignProject}>Assign Project </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default AssignProject;