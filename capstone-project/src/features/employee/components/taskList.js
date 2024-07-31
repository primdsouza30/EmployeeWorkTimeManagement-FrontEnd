import { Column } from 'primereact/column';
import { useSelector } from "react-redux";
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from "react-bootstrap";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext'; 
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import Navbar from './navbar';
import axios from "axios";
import { Calendar } from 'primereact/calendar';
function TaskList(){

    const { list } = useSelector((state) => state.tasks);
    const [data, setData] = useState([...list]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState(null);
    const [tasks,setTasks] = useState([...list]);
    const [visibleTask, setVisibleTask] = useState(false);
    const [visibleLog, setVisibleLog] = useState(false);
    const [position, setPosition] = useState('center');
    const [date, setDate] = useState(null);
    const[taskId,setTaskId] = useState(null);
    const [logDetails, setLogDetails] = useState('');
  

    useEffect(() =>
        setLoading(false)
    
    );

    const onStatusUpdate = (tid,status) =>{
        console.log(tid)
        console.log(status)
        axios.get(`http://localhost:8081/capstone/task/update/${tid}/` + status,{
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        }).then(resp=>{
             let arry = [...tasks.filter(l=>l.id !== tid)]; 
             arry.push(resp.data)
             setTasks([...arry].sort((a,b)=>a.id - b.id))
        })
    };

    const recordLog =() => {
        let dateLog = new Date(date).toISOString().split("T")[0];
        let tid = taskId
        let data ={
            'logDetails': logDetails,
            'dateLog': dateLog
        };

        axios.post(`http://localhost:8081/capstone/record/employee/${tid}` , data,{
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setMsg("Log added successfully.");
        })
        .catch(err => {
            setMsg("Operation Failed, pls contact Admin");
        });

    };


    const headerTask = (
        <div>
            <h4>Task Header</h4>
        </div>
    )
    const headerLog = (
        <div>
            <h4>Log Header</h4>
        </div>
    )

    const footerContentLog = (
        <div>
            <Button label="Yes" icon="pi pi-times" onClick={() => {setVisibleLog(false); recordLog()} } className="p-button-text" />
           
        </div>
    );
    const footerContentTask = (
        <div>
            <Button label="Yes" icon="pi pi-times" onClick={() => {setVisibleTask(false); onStatusUpdate()}} className="p-button-text" />
            
        </div>
    );

    const show1 = (position) => {
        setPosition(position);
        setVisibleTask(true);
    };

    const show2 = (position) => {
        setPosition(position);
        setVisibleLog(true);
    };

    return(
        <div>
            <div className="container">
                {
                    tasks.map((t,index)=>(
                        <div className="row mt-4" key={index}>
                            <div className="col-lg-12"> 
                                <div className="card">
                                <div className="card-header">
                                        <span>Task</span>
                                       
                                        <br />
                                        <p>
                                            {t.taskDetails}
                                            <br/>
                                            Task Status : {t.taskStatus}
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-warning" onClick={()=>{ 
                                        
                                            onStatusUpdate(t.id,'IN_PROCESS')}}>IN_PROCESS</button>
                                        &nbsp;&nbsp;
                                        <button className="btn btn-danger" onClick={()=>onStatusUpdate(t.id,'COMPLETED')} >COMPLETED</button>
                                    
                                    <div className="footer flex flex-wrap justify-content-center gap-2 mb-2" >
                                    &nbsp;
                                    <Button label="Top" icon="pi pi-arrow-down" onClick={() =>{
                                        show2('top')
                                       setTaskId(t.id);
                                    }
                                    }
                                        className="p-button-warning" style={{ minWidth: '10rem' }} > Record Log</Button>
                                        &nbsp;
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                
                <Dialog header={headerLog} visible={visibleLog} position={position} style={{ width: '40vw' }} onHide={() => {if (!visibleLog) return; setVisibleLog(false); }} footer={footerContentLog} draggable={false} resizable={false}>
                <div className="mb-3">
                <Calendar value={date} onChange={(e)=> setDate(e.value) }/>
                        <FloatLabel>
                            <InputTextarea
                                id="description"
                                value={logDetails}
                                onChange ={(e) => setLogDetails(e.target.value)}
                                rows={5}
                                cols={50}
                            />
                            <label htmlFor="description">Enter Log details</label>
                        </FloatLabel>
                    </div>

                </Dialog>

                <Dialog header={headerTask} visible={visibleTask} position={position} style={{ width: '40vw' }} onHide={() => {if (!visibleTask) return; setVisibleTask(false); }} footer={footerContentTask} draggable={false} resizable={false}>
                
                </Dialog>

            </div>
        </div>)
}
export default TaskList