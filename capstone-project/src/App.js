import { Route, Routes } from "react-router";
import Login from "./auth/login";
import HR from "./features/hr/hr";
import EmployeeOnBoarding from "./features/hr/components/employeeonboarding";
import Manager from "./features/manager/manager";
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import { getEmployees } from "./store/action/employee";
import ManagerOnBoarding from "./features/hr/components/manageronboarding";
import CreateProject from "./features/manager/components/createProject";
import AssignProject from "./features/manager/components/assignProject";
import Employee from "./features/employee/employee";
import TaskList from "./features/employee/components/taskList";
import NotificationList from "./features/employee/components/notificationList";
import ProjectList from "./features/employee/components/projectList";

 
function App() {
  
   return(
    <div>
      <Provider store={store}>
      <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/hr" element={<HR />}></Route>
          <Route path="/employee-onboarding" element={<EmployeeOnBoarding />}></Route>
          <Route path = "/manager-onboarding" element={<ManagerOnBoarding />}></Route>
          <Route path="/manager" element={<Manager />}></Route>
          <Route path="/create-project" element={<CreateProject/>}></Route>
          <Route path="/assign-project" element={<AssignProject/>}></Route>
          <Route path="/employee" element={<Employee/>}></Route>
          <Route path="/view-tasks" element={<TaskList/>}></Route>
          <Route path="/view-notifications" element={<NotificationList/>}></Route>
          
          
          
      </Routes>
      </Provider>
    </div>
   )
}

export default App;