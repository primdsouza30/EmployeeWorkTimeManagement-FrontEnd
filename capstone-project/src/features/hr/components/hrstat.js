import axios from "axios";
import { useEffect, useState } from "react";
import '../css/hrstat.css';

function HRStat() {
    const [countEmployee, setCountEmployee] = useState(0);
    const [countManager, setCountManager] = useState(0);

    useEffect(() => {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8081/capstone/hr/stat', {
            headers: {
                'Authorization': 'Basic ' + token
            }
        })
        .then(response => {
            setCountEmployee(response.data.count_employee);
            setCountManager(response.data.count_manager);
        })
        .catch(error => {
            console.error("Error fetching HR stats:", error);
        });
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card shadow-lg">
                        <div className="card-header">
                            <h4 className="header-style">Employee Count</h4>
                        </div>
                        <div className="card-body text-center">
                            <h2 className="count">{countEmployee}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card shadow-lg">
                        <div className="card-header">
                            <h4 className="header-style">Manager Count</h4>
                        </div>
                        <div className="card-body text-center">
                            <h2 className="count">{countManager}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HRStat;
