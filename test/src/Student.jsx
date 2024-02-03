import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Student = () => {
    const [student , setStudent] = useState([])
    useEffect(()=> {
axios.get('http://localhost:8081/')
.then(res => setStudent(res.data)) 
.catch(err => console.log(err))
    } , [])
    const handleDelete = async (id) => {
        try {
            axios.delete('http://localhost:8081/student/'+id)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center' >
        <div className='w-50 bg-white rounded p-3'>
           <Link to="/create" className='btn btn-success'>Add +</Link>
           <table className='table'>
            
            <thead>
                <tr>

                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
                </tr>
                
            </thead>

<tbody>
    {
        student.map((data , i) => (
            <tr key={i}>
                <td> {data.Name}</td>
                <td> {data.Email}</td>
                <td><Link to={`update/${data.ID}`} className='btn btn-primary'>Update</Link>

                    <button className='btn btn-danger ms-2' onClick={e => handleDelete(data.ID)}>Delete</button>
                </td>
            </tr>
        ))
    }
</tbody>

           </table>
           
            </div>


    </div>
  )
}

export default Student