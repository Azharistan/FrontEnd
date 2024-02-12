import {useEffect, useState} from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

import { AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
const HomeClass = () => {
  const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const [detailedClass, setDetails] = useState([])
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem('token')
    const [admin, setAdmin] = useState()
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
    setLoading(true)
    axios
      .get(`${backendUrl}/classes`)
      .then((response) =>{
        fetchClassDetails(response.data.class1)
        setLoading(false)
      })
      .catch((error)=>{
        console.log(error);
        setLoading(false)
      })
  }, [])

  const fetchClassDetails = (classs)=>{
    const promises = classs.map((Class) => {
      const coursePromise = axios.get(`${backendUrl}/courses/${Class.courseID}`)
      const instructorPromise = axios.get(`${backendUrl}/instructors/${Class.instructor}`)
      return Promise.all([coursePromise,instructorPromise])
      .then((responses)=>{
        const [courseResponse, instructorResponse] = responses
        return {
          _id: Class._id,
          courseName: courseResponse.data.name,
          course: courseResponse.data._id,
          instructorName: instructorResponse.data.name,
          instructor: instructorResponse.data._id,
          section: Class.section,
          stdList: Class.stdList
        }
      }).catch((error)=>{
        console.log(error)
      })
    })

    Promise.all(promises)
    .then((detailedClass) => {
      setDetails(detailedClass.filter(Boolean))
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  return (
    <>
      
    {admin? (

      <div className='STD-Container'>
      <div>
        <BackButton/>
        <h1>Class List</h1>
        <div className='STD-underline'></div>
        <Link to='create'>
          <MdOutlineAddBox className='Add-Button'/>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ):(
        <table className='table-container'>
          <thead className='StdHeadings'>

          <tr>
            <th className='Std-No'>No</th>
            <th className='Std-No'>Course Code</th>
            <th className='Std-No'>Class ID</th>
            <th className='Std-No'>Course Name</th>
            <th className='Std-No'>Instructor Name</th>
            <th className='Std-No'>Section</th>
            <th className='Std-No'>Operations</th>
          </tr>
          </thead>
          <tbody>
            {
              detailedClass.map((Class, index)=>(
                <tr key={Class._id} className='h-8'>

                <td >{index+1}</td>
                <td >{Class.course}</td>
                <td>{Class._id}</td>
                <td>{Class.courseName}</td>
                <td>{Class.instructorName}</td>
                <td>{Class.section}</td>
                <td>
                  <div>
                    <Link to = {`/classes/show/${Class._id}`}> 
                      <BsInfoCircle className='info'/>
                    </Link>
                    <Link to={`/classes/edit/${Class._id}`}>
                      <AiOutlineEdit className='Edit'/>
                    </Link>
                    <Link to={`/classes/delete/${Class._id}`}>
                      <MdOutlineDelete className='dlt'/>
                    </Link>
                  </div>
                </td>

                </tr>
              ))
            }
          </tbody>
        </table>
      )
      }
    </div>
  ):(<h1>You are not allowed here</h1>)}
  
  </>
  )
}

export default HomeClass
