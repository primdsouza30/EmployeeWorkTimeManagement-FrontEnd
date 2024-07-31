import { useDispatch } from "react-redux";

import Navbar from "./components/navbar";
import TaskList from "./components/taskList";
import { getTasks } from "../../store/action/tasks";
import { getNotification } from "../../store/action/notification";
import { useEffect } from "react";

function Employee(){
   
    const dispatch = useDispatch();
    dispatch(getTasks())
    dispatch(getNotification())

    return (
        <div>
            <Navbar/>
            <TaskList/>
         
        </div>
    )
}

export default Employee; 