import Navbar from "./navbar";
import axios from 'axios';
import { useEffect, useState } from "react";

import { Column } from 'primereact/column';
import { DataTable } from "primereact/datatable";
import "../css/projectList.css"
function ProjectList(){
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
        axios.get('http://localhost:8081/capstone/project/all',{
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setProjects(resp.data);
        });
    }, []);

        return(
            <div>
                <Navbar/>
              <br/>
                <div className="center">Project List </div>
                <div className="container d-flex justify-content-center mt-4" style={{}}>
                    <div className="card d-flex justify-content-center mt-0" style={{ width: '100%' }}>
                    <DataTable
                    value={projects}
                    paginator
                    rows={10}
                    dataKey="id"
                    //filters={filters}
                    filterDisplay="row"
                    loading={loading}
                    //header={header}
                    emptyMessage="No employees found."
                >
                    <Column field="id" header="System ID" style={{ minWidth: "8rem" }} />
                    <Column field="title" header="Name" filterPlaceholder="Search by name" style={{ minWidth: "8rem" }} />
                </DataTable>

                </div>
                </div>
            </div>
        )
}
export default ProjectList;