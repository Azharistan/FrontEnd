import {useEffect, useState} from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

import { AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
const HomeClass = () => {
  const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const [classs, setClasss] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true);
    axios
      .get(`${backendUrl}/classes`)
      .then((response) =>{ 
        console.log(response.data)
        setClasss(response.data.class1)
        console.log(response.data.class1)
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
              classs.map((Class, index)=>(
                <tr key={Class._id} className='h-8'>

                <td >{index+1}</td>
                <td >{Class._id}</td>
                <td>{Class.depID}</td>
                <td>{Class.className}</td>
                <td>{Class.instructor}</td>
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
  )
}

export default HomeClass
