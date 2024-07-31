import axios from "axios";
import { useEffect, useState } from "react";
import '../css/hrlist.css'; // Ensure you have a CSS file for custom styles

function HrList() {
    const [data, setData] = useState([]);
    const [selectedManager, setSelectedManager] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/capstone/hr/manager/employee', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setData(resp.data);
        })
        .catch(err => {
            console.error("Error fetching data:", err);
        });
    }, []);

    const handleManagerClick = (manager) => {
        setSelectedManager(manager);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 col-lg-3 sidebar">
                    <div className="list-group">
                        <h4 className="list-header">Managers</h4>
                        {data.map((m, index) => (
                            <button
                                key={index}
                                className={`list-group-item list-group-item-action ${selectedManager === m ? 'active' : ''}`}
                                onClick={() => handleManagerClick(m)}
                            >
                                {m.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="col-md-8 col-lg-9 details">
                    {selectedManager && (
                        <div className="details-panel">
                            <h4>Manager Details</h4>
                            <div className="details">
                                <p><strong>Job Title:</strong> {selectedManager.jobTitle}</p>
                                <p><strong>Email:</strong> {selectedManager.email}</p>
                                <p><strong>Contact:</strong> {selectedManager.contact}</p>
                            </div>
                            <h4 className="mt-4">Employees Assigned</h4>
                            {selectedManager.employees.length > 0 ? (
                                selectedManager.employees.map((e, index) => (
                                    <div className="employee-card" key={index}>
                                        <p><strong>Name:</strong> {e.name}</p>
                                        <p><strong>Job Title:</strong> {e.jobTitle}</p>
                                        <p><strong>Salary:</strong> {e.salary}</p>
                                        <p><strong>City:</strong> {e.city}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No employees assigned.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HrList;
