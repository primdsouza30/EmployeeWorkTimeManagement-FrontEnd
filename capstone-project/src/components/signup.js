import { useState } from "react";

function Signup(){

    const[name,setName] = useState(null);
    const[username,setUsername] = useState(null);
    const[password,setPassword] = useState(null);
    const[role,setRole] = useState(null);

    const onSignup = () =>{
        console.log('name is '+ name)
        console.log('username is '+ username)
        console.log('passowrd is '+ password)
        console.log('role is '+ role)


    }

    return(
        <div style={{padding: '20px'}}>
            <h2>Signup</h2>
            <label>Enter Name: </label>
            <input type="text"  onChange={(e)=> setName(e.target.value)}/>
            <br/>
            <label>Enter Username: </label>
            <input type="text" onChange={(e)=> setUsername(e.target.value)}/>
            <br />
            <label>Enter Password: </label>
            <input type="text" onChange={(e)=> setPassword(e.target.value)} />
            <br />
            <label>Select Role: </label>
            <select onChange={(e) => setRole(e.target.value)}>
                <option value="HR">HR</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
            </select>
            <br/>
            <button onClick={()=> onSignup()}>Signup</button>

        </div>
    )
}

export default Signup;