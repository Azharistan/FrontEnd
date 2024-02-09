import {useState, useEffect} from 'react'
import "../stdPages/stdStyle/EditStudent.css"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';


const AdminEditStudent = () => {

  const [_id, set_id] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [semester, setSemester] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:5000/students/${id}`)
    .then((response)=>{
      set_id(response.data._id);
      setName(response.data.name)
      setWhatsapp(response.data.whatsapp)
      setEmail(response.data.email)
      setPassword(response.data.password)
      setSemester(response.data.semester)
      setLoading(false)
    }).catch((error)=>{
      setLoading(false)
      alert('Error!! Please check Console')
      console.log(error)
    })
  }, []) 
  const handleEditStudent = () =>{
    const data = {
      _id,
      name,
      whatsapp,
      email,
      password,
      semester
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/students/${id}`, data)
      .then(() =>{
        setLoading(false);
        navigate('/');
      })
      .catch((error)=>{
        setLoading(false);
        alert('An error happend, Please check console')
        console.log(error);
      });
  }
  return(
    <div className="Edit-ContainerSTD">
    <div className='Edit-HeaderSTD'>
      <h1 className='Edit-TextSTD'>Edit Student</h1>
      <div className='Edit-UnderlineSTD'></div>
      </div>
      <form className='Edit-InputsSTD'>

          <input className='Edit-Attributes-STD' type='text' value={_id} onChange={(e) => set_id(e.target.value)}/>

          <input className='Edit-Attributes-STD' type='text' value={name} onChange={(e) => setName(e.target.value)}/>

          <input className='Edit-Attributes-STD' type='text' value={semester} onChange={(e) => setSemester(e.target.value)}/>

          <input className='Edit-Attributes-STD' type='text' value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}/>
          <input className='Edit-Attributes-STD' type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
        
        <button className='Edit-SubmitButton' onClick={handleEditStudent}>Save</button>
      </form>
    </div>
  )
}
  
export default AdminEditStudent
