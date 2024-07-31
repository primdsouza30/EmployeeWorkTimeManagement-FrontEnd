import { configureStore } from "@reduxjs/toolkit";
import employee from "./store/reducer/employee";
import tasks from "./store/reducer/tasks";
import notification from "./store/reducer/notification";


export default configureStore(
    {
        reducer :{employee,tasks,notification}  // all reducers entry goes here
    }
)
