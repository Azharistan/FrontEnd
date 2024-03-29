import {useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
const HomeIns = () => {

  const [instructors, setinstructors] = useState([])

    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const [admin, setAdmin] = useState()
  const token = localStorage.getItem('token')
  const data = {
      token
  }
  useEffect(()=>{
    console.log('inside use effect')
    if(!token){
      alert('You are not logged in')
      window.location.href = ('/')
    }else{
      console.log('here')
      axios.post(`${backendUrl}/api/token`, data)
      .then((response)=>{
        console.log(response.data)
        if(response.data.status === 'ok'){
          setAdmin(response.data.admin)
        }
      }).catch((error)=>{
        console.log('happy')
        console.log(error)
      })
    }
  },[])

  useEffect(()=>{
    axios
      .get(`${backendUrl}/instructors`)
      .then((response) =>{ 
        setinstructors(response.data.instructors)
        console.log(response.data.instructors)
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [])
  return (
    <div>

    {admin ?
    (<div className='STD-Container'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Instructor List</h1>
        <div className='STD-underline'></div>
        <Link to='create'>
          <MdOutlineAddBox className='Add-Button'/>
        </Link>
      </div>
        <table className='table-container'>
          <thead className='StdHeadings'>

          <tr>
            <th className='Std-No'>No</th>
            <th className='Std-RegNo'>ProfID</th>
            <th className='Std-Name'>Name</th>
            <th className='Std-Semester'>Department</th>
            <th className='Std-WhatsApp'>WhatsApp</th>
            <th className='Std-Email'>Email</th>
            <th className='Std-Op'>Operations</th>
          </tr>
          </thead>
          <tbody>
            {
              instructors.map((instructor, index)=>(
                <tr key={instructor._id} className='h-8'>

                <td >{index+1}</td>
                <td >{instructor._id}</td>
                <td>{instructor.name}</td>
                <td>{instructor.department}</td>
                <td>{instructor.whatsapp}</td>
                <td>{instructor.email}</td>
                <td>
                  <div>
                    <Link to = {`/instructors/show/${instructor._id}`}> 
                      <BsInfoCircle className='text-2xl text-green-800'/>
                    </Link>
                    <Link to={`/instructors/edit/${instructor._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600'/>
                    </Link>
                    <Link to={`/instructors/delete/${instructor._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-600'/>
                    </Link>
                  </div>
                </td>

                </tr>
              ))
            }
          </tbody>
        </table>
    </div>): <h1>You are not Allowed in this page</h1>}
    </div>
  )
}

export default HomeIns
