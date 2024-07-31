import axios from "axios"

export const getNotification=()=>(dispatch)=>{
    //call the api 
    axios.get('http://localhost:8081/capstone/employee/notification/all',{
        headers: {
            'Authorization': 'Basic ' + localStorage.getItem('token')
        }
    })
    
    .then(response=>{
        let action = {
            type: 'GET_ALL_NOTIFICATION',
            payload: response.data
        };

        dispatch(action)
    })
}