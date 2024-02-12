import {useState, useEffect} from 'react'
import "../stdPages/stdStyle/EditStudent.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const EditInstuctor = () => {
  var token = localStorage.getItem('token')
  var tt = {
    token
  }

  const [_id, set_id] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const [password, setPassword] = useState('');

  const navigate = useNavigate();
  useEffect(()=>{
    axios.post(`${backendUrl}/api/token`, tt)
    .then((response)=>{
      set_id(response.data.instructor._id);
      setName(response.data.instructor.name)
      setWhatsapp(response.data.instructor.whatsapp)
      setEmail(response.data.instructor.email)
      setPassword(response.data.instructor.password)
      setDepartment(response.data.instructor.department)
    }).catch((error)=>{
      alert('Error!! Please check Console')
      console.log(error)
    })
  }, []) 
  const handleEditInstuctor = (event) =>{
    event.preventDefault()
    const data = {
      _id,
      name,
      whatsapp,
      email,
      password,
      department
    };
    axios
    .put(`${backendUrl}/instructors/${_id}`, data)
    .then((response) =>{
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
        set_id(res.data.instructor._id)
        setName(res.data.instructor.name)
        setWhatsapp(res.data.instructor.whatsapp)
        setEmail(res.data.instructor.email)
        setPassword(res.data.instructor.password)
        setDepartment(res.data.instructor.department)
        navigate('/inspage')
      }).catch((error)=>{
        alert('Error!! Please check Console')
        console.log(error)
      })
    }).catch((error)=>{
      alert('Error Check console')
      console.log(error)
    })
  }
  return (
    <div className="Edit-ContainerSTD">
    <div className='Edit-HeaderSTD'>
      <h1 className='Edit-TextSTD'>Edit Profile</h1>
      <div className='Edit-UnderlineSTD'></div>
      </div>
      <form className='Edit-InputsSTD'>
          <input className='Edit-Attributes-STD' placeholder='Prof ID' type='text' value={_id} disabled onChange={(e) => set_id(e.target.value)}/>
          <input className='Edit-Attributes-STD' placeholder='Name' type='text' value={name} disabled onChange={(e) => setName(e.target.value)}/>
          <input className='Edit-Attributes-STD' placeholder='Department' type='text' value={department} disabled onChange={(e) => setDepartment(e.target.value)}/>
          <input className='Edit-Attributes-STD' placeholder='Whatsapp' type='text' value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}/>
          <input className='Edit-Attributes-STD' placeholder='Email' type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
        
        <button className='Edit-SubmitButton' onClick={handleEditInstuctor}>Save</button>

      </form>
    </div>
  )
}

export default EditInstuctor
