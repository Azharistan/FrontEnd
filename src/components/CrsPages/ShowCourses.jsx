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
      <div className='Show-ContainerIns'>
   
        <h1>Course Info</h1>
        <div className='Show-UnderlineIns'></div>
        {loading ? (
          <Spinner />
        ) : (
          <form className='Show-inputsIns'>
            
              <p >ID : </p>
              {courses._id}
            
              <p >Name : </p>
              {courses.name}
            
              <p >Department : </p>
              {courses.depID}
            
              <p >Credit Hours : </p>
              {courses.creditHr}
          </form>
        )}

      </div>
  )
}

export default ShowCourses
