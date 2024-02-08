import {useEffect, useState} from 'react'
import axios from 'axios';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
const HomeCrs = () => {

  const [courses, setCourses] = useState([])
    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true);
    axios
      .get(`${backendUrl}/courses`)
      .then((response) =>{ 
        setCourses(response.data.course)
        console.log(response.data.course)
        setLoading(false);
      })
      .catch((error)=>{
        console.log(error);
        setLoading(false)
      })
  }, [])
  return (
    <div className='STD-Container'>
      <div>
        <h1>Course List</h1>
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
            <th className='Std-RegNo'>Course ID</th>
            <th className='Std-Name'>Name</th>
            <th className='Std-Semester'>Department</th>
            <th className='Std-WhatsApp'>Credit Hours</th>
            <th className='Std-Op'>Operations</th>
          </tr>
          </thead>
          <tbody>
            {

              courses.map((course, index)=>(
                <tr key={course._id} className='h-8'>

                <td >{index+1}</td>
                <td >{course._id}</td>
                <td >{course.name}</td>
                <td >{course.depID}</td>
                <td >{course.creditHr}</td>
                <td >
                  <div >
                    <Link to = {`show/${course._id}`}> 
                      <BsInfoCircle />
                    </Link>
                    <Link to={`edit/${course._id}`}>
                      <AiOutlineEdit />
                    </Link>
                    <Link to={`delete/${course._id}`}>
                      <MdOutlineDelete />
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
  )
}

export default HomeCrs
