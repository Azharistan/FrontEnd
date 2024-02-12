import {useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteInstuctor = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const {id }=useParams();
  const handleDeleteInstuctor=()=>{
    setLoading(true);
    axios
      .delete(`${backendUrl}/instructors/${id}`)
      .then(()=>{
        setLoading(false);
        navigate('/instructors');
      })
      .catch((error)=>{
        setLoading(false)
        alert("Error!!! Please Check Console")
        console.log(error)
      });

  };


  return (
    <div>
      {loading ? <Spinner /> : ''}
      <div className='container delete-container'>
        <div className='backbutton'>
              <BackButton/>
        </div>
        <h3 className='confirm-text'>Are you sure you want to delete this?</h3>
        <button className='delete-button' onClick={handleDeleteInstuctor}>Yes, Please</button>
      </div>
    </div>
  )
}

export default DeleteInstuctor
