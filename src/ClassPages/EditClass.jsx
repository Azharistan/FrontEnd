import {useState, useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import "./ClassStyle/ClassEdit.css"

const EditClass = () => {

  const [_id, set_id] = useState('');
  const [classID, setClassID] = useState('');
  const [depID, setDepID] = useState('');
  const [instuctor, setInstructor] = useState('');
  const [section, setSection] = useState([]);
    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const [loading, setLoading] = useState('');

  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(()=>{
    setLoading(true)
    axios.get(`${backendUrl}/classes/${id}`)
    .then((response)=>{
      set_id(response.data._id);
      setClassID(response.data.classID)
      setDepID(response.data.depID)
      setInstructor(response.data.instuctor)
      setLoading(false)
    }).catch((error)=>{
      setLoading(false)
      alert('Error!! Please check Console')
      console.log(error)
    })
  }, []) 
  const handleEditClass = () =>{
    console.log("_id",_id )
    console.log("classID",classID )
    console.log("dean",depID )
    console.log("instructor",instuctor )


    const data = {
      _id,
      classID,
      depID,
      instuctor
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
      {loading ? <Spinner/>: ''}
      <div className='Edit-HeaderSTD'>
      <h1 className='Edit-TextSTD'>Edit Class</h1>
      <div className='Edit-UnderlineSTD'></div>
      </div>
      <form className='Edit-InputsSTD'>
          <input className='Edit-Attributes-STD' type='text' value={_id} onChange={(e) => set_id(e.target.value)}/>
          <input className='Edit-Attributes-STD' type='text' value={name} onChange={(e) => setClassID(e.target.value)}/>
          <input className='Edit-Attributes-STD' type='text' value={depID} onChange={(e) => setDepID(e.target.value)}/>
          <input className='Edit-Attributes-STD' type='text' value={section} onChange={(e) => setSection(e.target.value)}/>
          <input className='Edit-Attributes-STD' type='text' value={instuctor} onChange={(e) => setInstructor(e.target.value)}/>
        <button className='Edit-SubmitButton' onClick={handleEditClass}>Save</button>
      </form>
    </div>
  )
}

export default EditClass
