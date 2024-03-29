import {useState, useEffect} from 'react'
import "./stdStyle/EditStudent.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const EditStudent = () => {
  var token = localStorage.getItem('token')
  var tt = {
    token
  }

  const [_id, set_id] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [semester, setSemester] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const navigate = useNavigate();
  useEffect(()=>{
    axios.post(`${backendUrl}/api/token`, tt)
    .then((response)=>{
      set_id(response.data.student._id);
      setName(response.data.student.name)
      setWhatsapp(response.data.student.whatsapp)
      setEmail(response.data.student.email)
      setPassword(response.data.student.password)
      setSemester(response.data.student.semester)
    }).catch((error)=>{
      alert('Error!! Please check Console')
      console.log(error)
    })
  }, []) 
  function handleEditStudent(e){
    e.preventDefault()
    const data = {
      _id,
      name,
      whatsapp,
      email,
      password,
      semester
    };
      axios
      .put(`${backendUrl}/students/${_id}`, data)
      .then((response)=>{
        if(response.data.token){
        token = response.data.token
        tt = {
          token
        }
        localStorage.setItem('token', response.data.token)
      }else{
          alert('Something went wrong please try again')
        }
        axios.post(`${backendUrl}/api/token`, tt)
        .then((res)=>{
          set_id(res.data.student._id);
          setName(res.data.student.name)
          setWhatsapp(res.data.student.whatsapp)
          setEmail(res.data.student.email)
          setPassword(res.data.student.password)
          setSemester(res.data.student.semester)
          navigate('/stdpage')
        }).catch((error)=>{
          alert('Error!! Please check Console')
          console.log(error)
        })
      }).catch((error)=>{
        alert('Error!! Please check Console')
        console.log(error)
      })
  }
  return (
    <div className="Edit-ContainerSTD">
    <div className='Edit-HeaderSTD'>
      <h1 className='Edit-TextSTD'>Edit Student</h1>
      <div className='Edit-UnderlineSTD'></div>
      </div>
      <form className='Edit-InputsSTD'>

          <input className='Edit-Attributes-STD' placeholder='User ID' type='text' value={_id} disabled onChange={(e) => set_id(e.target.value)}/>

          <input className='Edit-Attributes-STD' placeholder='Name' type='text' value={name} disabled onChange={(e) => setName(e.target.value)}/>

          <input className='Edit-Attributes-STD' placeholder='Semester' type='text' value={semester} disabled onChange={(e) => setSemester(e.target.value)}/>

          <input className='Edit-Attributes-STD' placeholder='Whatsapp' type='text' value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}/>
          <input className='Edit-Attributes-STD' placeholder='Email' type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
        
        <button className='Edit-SubmitButton' onClick={handleEditStudent}>Save</button>
      </form>
    </div>
  )
}

export default EditStudent
