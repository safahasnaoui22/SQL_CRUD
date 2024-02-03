
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateStudent() {
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const navigate = useNavigate()
    function handleSubmit (event) {
        event.preventDefault()
        axios.post('http://localhost:8081/create' , {name , email})
        .then(res => {
            console.log(res);
            navigate('/');

        }).catch(err => console.log(err))
    }
  return (
    <div>
 <div className='d-flex vh-100 bg-primary justify-content-center align-items-center' >
        <div className='w-50 bg-white rounded p-3'>
   <form onSubmit={handleSubmit}>
    <h2>Add Student</h2>
    <div className='mb-2'>
        <label>Name</label>
        <input type='text' placeholder='Enter Name' className='form-control'
        onChange={e => setName(e.target.value)}
        />
    </div>

    <div className='mb-2'>
        <label>Email</label>
        <input type='email' placeholder='Enter Email' className='form-control'
        onChange={e => setEmail(e.target.value)}/>
    </div>
    <button className='btn btn-success'> Submit</button>
   </form>
          


           
            </div>


    </div>


    </div>
  )
}

export default CreateStudent