import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const AdminEditInstuctor = () => {

  const [_id, set_id] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');

  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:5000/instructors/${id}`)
    .then((response)=>{
      set_id(response.data._id);
      setName(response.data.name)
      setWhatsapp(response.data.whatsapp)
      setEmail(response.data.email)
      setPassword(response.data.password)
      setDepartment(response.data.department)
      setLoading(false)
    }).catch((error)=>{
      setLoading(false)
      alert('Error!! Please check Console')
      console.log(error)
    })
  }, []) 
  const handleEditInstuctor = () =>{
    console.log("_id",_id )
    console.log("name",name )
    console.log("department",department )
    console.log("whatsapp",whatsapp )
    console.log("email",email )
    console.log("password",password )


    const data = {
      _id,
      name,
      whatsapp,
      email,
      password,
      department
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/instructors/${id}`, data)
      .then(() =>{
        setLoading(false);
        navigate('/HomeIns');
      })
      .catch((error)=>{
        setLoading(false);
        alert('An error happend, Please check console')
        console.log(error);
      });
  }
  
  return (
    <div className="Edit-ContainerSTD">
    <div className='Edit-HeaderSTD'>
      <h1 className='Edit-TextSTD'>Edit Profile</h1>
      <div className='Edit-UnderlineSTD'></div>
      </div>
      <form className='Edit-InputsSTD'>
 
          <input className='Edit-Attributes-STD' type='text' value={_id} onChange={(e) => set_id(e.target.value)}/>

          <input className='Edit-Attributes-STD' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
 
          <input className='Edit-Attributes-STD' type='text' value={department} onChange={(e) => setDepartment(e.target.value)}/>
 
          <input className='Edit-Attributes-STD' type='text' value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}/>
 
          <input className='Edit-Attributes-STD' type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
        
        <button className='Edit-SubmitButton' onClick={handleEditInstuctor}>Save</button>

      </form>
    </div>
  )
}

export default AdminEditInstuctor
