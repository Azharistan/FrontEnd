import {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../BackButton'
import Spinner from '../Spinner'

const ShowCourses = () => {
  const [courses, setCourses] = useState({});
  const [loading, setLoading] =useState(false)
  const {id} = useParams()
  const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(()=>{
    setLoading(true)
    axios
      .get(`${backendUrl}/courses/${id}`)
      .then((response)=>{
        setCourses(response.data);
        console.log('this',response.data)
        setLoading(false)
      })
      .catch((error)=>{
        console.log('this',error);
        setLoading(false);
      });
    }, [])
    return (
      <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'>Show Courses</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>ID : </span>
              <span>{courses._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Name : </span>
              <span>{courses.name}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Department : </span>
              <span>{courses.depID}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Credit Hours : </span>
              <span>{courses.creditHr}</span>
            </div>
          </div>
        )}

      </div>
  )
}

export default ShowCourses