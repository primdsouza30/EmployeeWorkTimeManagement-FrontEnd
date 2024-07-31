import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext'; 
import { FilterMatchMode } from "primereact/api";
import { Paginator } from 'primereact/paginator';
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Calendar } from 'primereact/calendar';
import axios from "axios";
import 'primereact/resources/themes/saga-blue/theme.css';  // or any theme you prefer
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function EmployeeList() {
    const { list } = useSelector((state) => state.employee);
    const [data, setData] = useState([...list]);
    const [projects, setProjects] = useState([]);
    const [filters] = useState({
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        salary : { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [visibleTasks, setVisibleTasks] = useState(false);
    const [visibleNotification, setVisibleNotifications] = useState(false);
    const [taskStatusVal, setTaskStatusVal] = useState("");
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [employee, setEmployee] = useState({});
    const [dates, setDates] = useState(null);
    const [taskDetails, setTaskDetails] = useState('');
    const [notificationDetails, setNotificationDetails] = useState('');
    const [projectId, setProjectId] = useState("");
    const [msg, setMsg] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [taskStatus, setTaskStatus] = useState([]);

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
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    const assignTask = () => {
        console.log(taskDetails);
        console.log(dates);
        let startDate = new Date(dates[0]).toISOString().split("T")[0];
        let endDate = new Date(dates[1]).toISOString().split("T")[0];
        let empId = employee.id; 
        //let projectId = project.id;
        let data = {
            'taskDetails': taskDetails,
            'startDate': startDate,
            'endDate': endDate,
         
        };

        axios.post(`http://localhost:8081/capstone/task/employee/${projectId}/` + empId, data, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setMsg("Task Assigned to " + employee.name + " successfully.");
        })
        .catch(err => {
            setMsg("Operation Failed, pls contact Admin");
        });
    };

    const sendNotification = () =>{
        let empId = employee.id; 
        let data ={
            'notificationDetails': notificationDetails
        };
        axios.post('http://localhost:8081/capstone/notification/employee/' + empId , data,{
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setMsg("Notication sent " + employee.name + " successfully.");
        })
        .catch(err => {
            setMsg("Operation Failed, pls contact Admin");
        });


    };

    const globalSearch = (val) => {
        if (val === '') {
            setData(list);
        } else {
            let temp = [...data.filter(row => row.name.toLowerCase().includes(val.toLowerCase()))];
            setData(temp);
        }
    };

    const renderHeader = () => {
        return (
            <div className="d-flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi-search" />
                    <InputText onChange={(e) => globalSearch(e.target.value)} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    };

    const showTask = (id) => {
        axios.get('http://localhost:8081/capstone/task/' + id, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setTasks(resp.data);
        });
    };

    const header = renderHeader();

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="d-flex align-items-center gap-2">
                <Button variant="info" onClick={() => {
                    setEmployee(rowData);
                    setVisibleTasks(true);
                    showTask(rowData.id);
                    setMsg(null);
                }}>Show Tasks</Button>
                <Button variant="warning" onClick={() => {
                    setEmployee(rowData);
                    setVisible(true);
                    setMsg(null);
                }}>Assign Task</Button>
                <Button variant="primary" onClick={() => {
                    setEmployee(rowData);
                    setVisibleNotifications(true);
                    setMsg(null);
                }}>Send Notification </Button>
            </div>
        );
    };

    const headerElement = (
        <div className="d-flex align-items-center justify-content-center gap-2">
            <span className="font-weight-bold">Assign task to {employee?.name}</span>
            {msg && <div className="alert alert-warning">{msg}</div>}
        </div>
    );

    const headerElementNotification = (
        <div className="d-flex align-items-center justify-content-center gap-2">
            <span className="font-weight-bold">Send notifictaion to {employee?.name}</span>
            {msg && <div className="alert alert-warning">{msg}</div>}
        </div>
    );

    const footerContent = (
        <div div className="d-flex align-items-center justify-content-center gap-2">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Button variant="warning" onClick={assignTask}>Assign</Button>
            <Button variant="danger" onClick={() => { setVisible(false); setVisibleTasks(false); }}>Cancel</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
    );

    const footerContentTask = (
        <div className="d-flex align-items-center justify-content-center gap-2">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <Button variant="danger" onClick={() => { setVisible(false); setVisibleTasks(false); }}>Cancel&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
    );

    const footerContentNotification = (
        <div className="d-flex align-items-center justify-content-center gap-3">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button variant="warning" size="small" onClick={sendNotification}>Send</Button>
            &nbsp;
            <Button variant="danger" size="small" onClick={() => { setVisible(false); setVisibleNotifications(false)}}>Cancel</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;
        </div>
    );

    const archiveTask = (tid) => {
        axios.get('http://localhost:8081/capstone/task/archive/' + tid, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setTasks([...tasks.filter(t => t.id !== tid)]);
            setMsg('Task Archived');
        })
        .catch(err => {
            setMsg('Operation Failed, Contact admin');
        });
    };

    return (
        <div className="container d-flex justify-content-center mt-4">
            <div >
            <h4 style={{textAlign:"center"}}>Employee List </h4>
            <div className="card" style={{ width: '100%', maxWidth: '1200px' }}>
                <DataTable
                    value={list}
                    paginator  rows={3}
                    dataKey="id"
                    totalRecords={12} rowsPerPageOptions={[2,4]} onPageChange={onPageChange}
                    filters={filters}
                    filterDisplay="row"
                    loading={loading}
                    //header={header}
                    emptyMessage="No employees found."
                >
                    
                    <Column field="id" header="System ID" style={{ minWidth: "8rem" }} />
                    <Column field="name" header="Name"  filter filterPlaceholder="Search by name" style={{ minWidth: "8rem" }} />
                    <Column field="city" header="City" style={{ minWidth: "8rem" }} filterPlaceholder="Search by City" />
                    <Column field="salary" header="Salary" filter style={{ minWidth: "8rem" }} filterPlaceholder="Search by Salary" />
                    <Column field="jobTitle" header="Job Title" filterPlaceholder="Search by job Title" style={{ minWidth: "12rem" }} />
                    <Column header="Action" body={actionBodyTemplate} />
                    <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
                    
                </DataTable>

                <Dialog
                    visible={visible}
                    modal
                    header={headerElement}
                    footer={footerContent}
                    style={{ width: "50rem"}}
                    onHide={() => { if (!visible) return; setVisible(false); }}
                >
                    <div className="card center">
                    <div className="mb-3" >
                        <FloatLabel>
                        <label htmlFor="description" style= {{align:"center"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enter task details:</label>
                       
                            <InputTextarea
                                id="description"
                                onChange={(e) => setTaskDetails(e.target.value)}
                                rows={5}
                                cols={50}
                            />
                            
                            <br/>
                        </FloatLabel>
                    </div>
                    <div className="mb-3 ">
                        <label>Enter Start and End Date for the task:</label>
                        <div className="card d-flex justify-content-center">
                            <Calendar
                                value={dates}
                                onChange={(e) => setDates(e.value)}
                                selectionMode="range"
                                readOnlyInput
                                hideOnRangeSelection
                            />
                        </div>
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
                            </div>
            
                </Dialog>
                <Dialog
                    visible={visibleNotification}
                    modal
                    header={headerElementNotification}
                    footer={footerContentNotification}
                    style={{ width: "35rem" }}
                    onHide={() => { if (!visibleNotification) return; setVisible(false); }}
                >
                    <div className="mb-3">
                        <FloatLabel>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <InputTextarea
                                id="description"
                                onChange={(e) => setNotificationDetails(e.target.value)}
                                rows={5}
                                cols={50}
                                style={{boxSizing:'border-box'}}
                            />
                            <label htmlFor="description">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enter Notification details</label>
                        </FloatLabel>
                    </div>
                    
                </Dialog>

                <Dialog
                    visible={visibleTasks}
                    modal
                    header={headerElement}
                    footer={footerContentTask}
                    style={{ width: "50rem" }}
                    onHide={() => { if (!visibleTasks) return; setVisibleTasks(false); }}
                >
                    {tasks.map((t, index) => (
                        <div className="row" key={index}>
                            <div className="col-lg-12">
                                <div className="card mt-2">
                                    <div className="card-header">
                                        <div>Start Date: {t.startDate} &nbsp;&nbsp;&nbsp;&nbsp; End Date: {t.endDate}</div>
                                    </div>
                                    <div className="card-body">
                                        <p style={{ fontSize: '1.3em', fontFamily: "monospace" }}>{t.taskDetails}</p>
                                        <p style={{ fontSize: '1.3em', fontFamily: "monospace" }}>Task Status : {t.taskStatus}</p>
                                    </div>
                                    <div className="card-footer">
                                        <Button variant="danger"  onClick={() => archiveTask(t.id)}>Archive</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Dialog>
            </div>
        </div>
        </div>
    );
}

export default EmployeeList;
