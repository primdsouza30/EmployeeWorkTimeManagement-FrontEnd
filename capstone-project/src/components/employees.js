import { useEffect, useState } from "react";

function Employees(){
    const [empArry,setEmplArry] = useState([]);

    useEffect(()=>{
        let e1={
            name: 'harry',
            salary: 90000
        }
        let e2={
            name: 'ron',
            salary: 55567
        }
        let e3={
            name: 'hermione',
            salary: 55666
        }
        let temp=[];
        temp.push(e1);
        temp.push(e2);
        temp.push(e3);
        setEmplArry([...temp])
    },[])
    return(
        <div>
            {
                empArry.map((e,index)=>(
                    <div key={index}>
                        {e.name} :---- {e.salary}
                    </div>
                ))
            }
        </div>
    )
}

export default Employees;
