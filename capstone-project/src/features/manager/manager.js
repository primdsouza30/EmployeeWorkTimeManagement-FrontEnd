
import { useEffect } from "react";
import EmployeeList from "./components/employeeList";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../store/action/employee";
import Navbar from "./components/navbar";

function Manager(){
    const dispatch = useDispatch();
    dispatch(getEmployees())
    return (
        <div>
            <Navbar/>
            <EmployeeList />
        </div>
    )
}

export default Manager; 