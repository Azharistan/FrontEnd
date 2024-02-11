import {useState, useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import "./ClassStyle/ClassEdit.css"

const EditClass = () => {

  const [_id, set_id] = useState('');
  const [courseID, setCourseID] = useState('');
  const [section, setSection] = useState('');
  const [instructor, setInstructor] = useState('');
  const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(()=>{
    setLoading(true)
    axios.get(`${backendUrl}/classes/${id}`)
    .then((response)=>{
      console.log(response.data)
      set_id(response.data._id);
      setCourseID(response.data.courseID)
      setInstructor(response.data.instructor)
      setSection(response.data.section)
      setLoading(false)
    }).catch((error)=>{
      setLoading(false)
      alert('Error!! Please check Console')
      console.log(error)
    })
  }, []) 
  const handleEditClass = () =>{
    const data = {
      _id,
      courseID,
      section,
      instructor
    };
    setLoading(true);
    axios
      .put(`${backendUrl}/classes/${id}`, data)
      .then(() =>{
        setLoading(false);
        navigate('/HomeClass');
      })
      .catch((error)=>{
        setLoading(false);
        alert('An error happend, Please check console')
        console.log(error);
      });
  }
  return (
    <div className='Edit-ContainerSTD'>
      {loading ? <Spinner/>: (
        <>
      <div className='Edit-HeaderSTD'>
      <h1 className='Edit-TextSTD'>Edit Class</h1>
      <div className='Edit-UnderlineSTD'></div>
      </div>
      <form className='Edit-InputsSTD'>
          <input className='Edit-Attributes-STD' type='text' value={_id} onChange={(e) => set_id(e.target.value)}/>
          <input className='Edit-Attributes-STD' type='text' value={courseID} onChange={(e) => setCourseID(e.target.value)}/>
          <input className='Edit-Attributes-STD' type='text' value={section} onChange={(e) => setSection(e.target.value)}/>
          <input className='Edit-Attributes-STD' type='text' value={instructor} onChange={(e) => setInstructor(e.target.value)}/>
        <button className='Edit-SubmitButton' onClick={handleEditClass}>Save</button>
      </form>
      </>
      )}
    </div>
  )
}

export default EditClass
