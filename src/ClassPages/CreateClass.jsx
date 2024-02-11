import {useState} from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./ClassStyle/CreateClass.css"
import Spinner from '../components/Spinner'

function CreateClass(){

  const [courseID, setCourseID] = useState('');
  const [instructor, setInstructor] = useState();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false)
  const [section, setSection] = useState([]);
  const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;


    const token = localStorage.getItem('token')
    const data = {
        token
    }
    function getinst(){
      setLoading(true)
      if(!token){
        alert('You are not logged in')
      setLoading(false)

        window.location.href = ('/')
      }else{
        axios.post(`${backendUrl}/api/token`, data)
        .then((response)=>{
          if(response.data.status === 'ok'){
            setInstructor(response.data.instructor)
            setLoading(false)
          }
        }).catch((error)=>{
          console.log(error)
        })
      }
    }
    useEffect(()=>{
      getinst();
    }, [])

  const navigate = useNavigate();
  useEffect(()=>{
    setLoading(true)
    axios
      .get(`${backendUrl}/courses`)
      .then((response) =>{ 
        setCourse(response.data.course)
        setLoading(false)

      })
      .catch((error)=>{
        console.log(error);
        setLoading(false)
      })
  }, [instructor])
  const handleSaveClass = () =>{
    event.preventDefault()
    setLoading(true)


    const data = {
      courseID,
      to: "ADMINS",
      instructor: instructor._id,
      section,
    };
    axios
      .post(`${backendUrl}/approvals`, data)
      .then(() =>{
        setLoading(false)

        navigate('/inspage');
      })
      .catch((error)=>{
        alert('An error happend, Please check console')
        setLoading(false)
        console.log(error);
      });
  }

  function Exist(c){
    if(instructor)
    return instructor.department == c.depID
    else
    return true
  }
  return (
    <div className='Create-containerStd'>
    {loading? <Spinner/>:
      (
        <>
          
    <div className='headerStd'>
      <h1> Create Class</h1>
      <div className='underlineStd'></div>
    </div>
    <div className='inputsStd'>
      
        <div className='Class-Button'>
        <h3>Select Course:</h3>
          <select onChange={(e) => setCourseID(e.target.value)}>
            <option  className='' value='0' defaultChecked >
            Choose a course
            </option>
            {course.map((course) => (
              Exist(course) ? 
              <option onChange={(e) => setCourseID(e.target.value)} key={course._id} value={course._id}>
                {course._id} - {course.name}
              </option> : null             
              
              ))}
          </select>
        </div>
        <div className='inputStd'>
        <input className="class-attributes" placeholder='Section' min={1} max={5} type='Number'  value={section} onChange={(e) => setSection(e.target.value)}/>
        </div>
      <button className='class-submit' onClick={handleSaveClass}>Save</button>
    </div>
              
        </>
 )
 
 }
  </div>
 )
}

export default CreateClass
