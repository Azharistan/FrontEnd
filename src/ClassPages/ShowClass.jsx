import {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import "./ClassStyle/ClassShow.css"
import Spinner from '../components/Spinner'

const ShowClass = () => {
  const [classes, setClasses] = useState({});
  const [instructor, setInstructor] = useState({})
  const [course, setCourse] = useState({})
  const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const {id} = useParams()
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    axios
      .get(`${backendUrl}/classes/${id}`)
      .then((response)=>{
        setClasses(response.data);


        setInstructor(response.data.instructor)
        setCourse(response.data.courseID)
        return(response.data)
      }).then((response)=>{
        axios.get(`${backendUrl}/instructors/${response.instructor}`)
        .then((res)=>{
          setInstructor(res.data)
          axios.get(`${backendUrl}/courses/${response.courseID}`)
          .then((res)=>{
            setCourse(res.data)
            setLoading(false)
          })
        })
      })
      .catch((error)=>{
        console.log('this',error);
        setLoading(false)

      });
    }, [])
    
    return (
      <div className='Show-ContainerIns'>
      {loading? <Spinner/>:(<>

        <h1 >Class Details</h1>
        <div className='Show-UnderlineIns'></div>
          <form className='Show-inputsIns'>
            
              <p>Professor :</p> {instructor.name}
            
              <p>section :</p>  {classes.section}
            
              <p>course :</p> {course.name}
          </form>

      </>)}
      </div>
  )
}

export default ShowClass
