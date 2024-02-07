import {useState} from 'react'
import BackButton from '../BackButton'
import Spinner from '../Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteCourse = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const {id }=useParams();
  const handleDeleteCourse=()=>{
    setLoading(true);
    axios
      .delete(`${backendUrl}/courses/${id}`)
      .then(()=>{
        setLoading(false);
        navigate('/courses');
      })
      .catch((error)=>{
        setLoading(false)
        alert("Error!!! Please Check Console")
        console.log(error)
      });

  };


  return (
    <div>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Course</h1>
      {loading ? <Spinner/>: ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteCourse}>Yes, Please</button>
      </div>
    </div>
  )
}

export default DeleteCourse