import { useEffect, useState } from 'react';
import '../css/customer.css'
import axios from 'axios';

function Customer(){
    const [name,setName] = useState(null);
    const [contact,setContact] = useState(null);
    const [regionId,setRegionId] = useState(null);
    const [nameErr,setNameErr] = useState(null);
    const [contactErr,setContactErr] = useState(null);
    const [showAddBtn,setShowAddBtn] = useState(false);
    const [regions,setRegions] = useState([]);

    useEffect(()=>{
        if(name === null || contact === null)
            setShowAddBtn(false)
        else
        if((name === ''  || contact === '')) {
            setShowAddBtn(false)
        }
         else {
            setShowAddBtn(true)
            
        }

        if(name === '')
            setNameErr('Name is mandatory')
        else
            setNameErr('')
 
        if(contact === '')
            setContactErr('contact is mandatory')
        else
            setContactErr('')
        
       if(contact !== '' && contact?.length !== 10 && contact !== null)
            setContactErr('contact shd be 10 digit')
        else
            setContactErr('')


            axios.get('http://localhost:8081/api/region/getall')
            .then(function (response) {
              setRegions(response.data)
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .finally(function () {
              // always executed
            });
          
    },[name,contact]);

    const handleName = (e)=>{
        setName(e.target.value)
        
     }
    const handleContact = (e)=>{
        setContact(e.target.value)
        
     }
    const addEmployee=()=>{

        console.log(name)
        console.log(contact)
        console.log(regionId)
        let customer = {
            name: name,
            contact: contact
          }
        axios.post('http://localhost:8081/api/customer/add/' + regionId, customer)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const handleRegion = (e)=>{
        setRegionId(e.target.value)
    }
    return (
      <div className="customer-container">
        <div className="customer-form">
          <div className='form-content'>
            <h1>Add Customer</h1>
            <label>Enter Name: </label>
            <input type="text" onChange={(e)=>handleName(e) }/> 
            &nbsp;&nbsp; 
            <span className='error-msg'> {nameErr} </span>
            <br /><br />
            <label>Enter Contact: </label>
            <input type="number" onChange={(e)=>handleContact(e)}/>
            &nbsp;&nbsp; 
            <span className='error-msg'> {contactErr}</span>
            <br /><br />
            <label>Select Region: </label>
            <select onChange={(e)=> handleRegion(e)}>
                {
                    regions.map((e,index)=>(
                        <option key={index} value={e.id}>{e.regionName} -- {e.country.countryName}</option>
                    ))
                }
            </select>
            <br /><br />
            {
                showAddBtn === true? <span>
                    <button onClick={()=>addEmployee()}>Add Customer</button>
                </span> : <span>
                    <button  disabled>Add Employee</button>
                </span>
            }
          </div>
        </div>
      </div>
    );
}

export default Customer;