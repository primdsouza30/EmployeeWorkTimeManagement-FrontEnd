import axios from "axios"

export const getTasks=()=>(dispatch)=>{
    //call the api 
    axios.get('http://localhost:8081/capstone/task/employee',{
        headers: {
            'Authorization': 'Basic ' + localStorage.getItem('token')
        }
    })
    
    .then(response=>{
        let action = {
            type: 'GET_ALL_TASKS',
            payload: response.data
        };

        dispatch(action)
    })
}