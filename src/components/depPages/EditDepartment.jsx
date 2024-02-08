import {useState, useEffect} from 'react'
import BackButton from '../BackButton'
import Spinner from '../Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditDepartment = () => {

  const [_id, set_id] = useState('');
  const [name, setName] = useState('');
  const [dean, setDean] = useState('');
  const [hod, setHOD] = useState('');
    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const [loading, setLoading] = useState('');

  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(()=>{
    setLoading(true)
    axios.get(`${backendUrl}/departments/${id}`)
    .then((response)=>{
      set_id(response.data._id);
      setName(response.data.name)
      setDean(response.data.dean)
      setHOD(response.data.hod)
      setLoading(false)
    }).catch((error)=>{
      setLoading(false)
      alert('Error!! Please check Console')
      console.log(error)
    })
  }, []) 
  const handleEditDepartment = () =>{
    console.log("_id",_id )
    console.log("name",name )
    console.log("dean",dean )
    console.log("hod",hod )


    const data = {
      _id,
      name,
      dean,
      hod
    };
    setLoading(true);
    axios
      .put(`${backendUrl}/departments/${id}`, data)
      .then(() =>{
        setLoading(false);
        navigate('/HomeDep');
      })
      .catch((error)=>{
        setLoading(false);
        alert('An error happend, Please check console')
        console.log(error);
      });
  }
  return (
    <div className="Edit-ContainerSTD">
      {loading ? <Spinner/>: ''}
      <div className='Edit-HeaderSTD'>
      <h1 className='Edit-TextSTD'>Edit Department</h1>
      <div className='Edit-UnderlineSTD'></div>
      </div>
        <form className='Edit-InputsSTD'>
       
          <input className='Edit-Attributes-STD' type='text' value={_id} onChange={(e) => set_id(e.target.value)}/>
       
          <input className='Edit-Attributes-STD' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
       
          <input className='Edit-Attributes-STD' type='text' value={dean} onChange={(e) => setDean(e.target.value)}/>
       
          <input className='Edit-Attributes-STD' type='text' value={hod} onChange={(e) => setHOD(e.target.value)}/>
        <button className='Edit-SubmitButton' onClick={handleEditDepartment}>Save</button>
      </form>
    </div>
  )
}

export default EditDepartment
