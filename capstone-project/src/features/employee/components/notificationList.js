import { Column } from 'primereact/column';
import { useSelector } from "react-redux";
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext'; 
import Navbar from './navbar';
import axios from 'axios';

function NoticationList(){
    const { list } = useSelector((state) => state.notification);
    const [notification, setNotification] = useState([...list]);

    const [data, setData] = useState([...list]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState(null);
    
    useEffect(() =>{
        setLoading(false);
        
},[]);

    const archiveNotification = (nid) => {
        axios.get('http://localhost:8081/capstone/notification/archive/' + nid, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setNotification([...notification.filter(n => n.id !== nid)]);
            setMsg('Task Archived');
        })
        .catch(err => {
            setMsg('Operation Failed, Contact admin');
        });
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                {
                    notification.map((n,index)=>(
                        <div className="row mt-4" key={index}>
                            <div className="col-lg-12"> 
                                <div className="card">
                                <div className="card-header">
                                        <span>New Notification</span>
                                    </div>
                                    <div className="card-body">
                                       
                                        <br />
                                        <p>
                                            {n.notificationDetails}
                                        </p>
                                    </div>
                                    <div className="footer">
                                        <button className="btn btn-warning" onClick={()=> archiveNotification(n.id)}>Archive</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default NoticationList