import {useState} from 'react'
import BackButton from '../BackButton'
import Spinner from '../Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteDepartment = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const {id }=useParams();
  const handleDeleteDepartment=()=>{
    setLoading(true);
    axios
      .delete(`${backendUrl}/departments/${id}`)
      .then(()=>{
        setLoading(false);
        navigate('/departments');
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
        <button className='delete-button' onClick={handleDeleteDepartment}>Yes, Please</button>
      </div>
    </div>
  )
}

export default DeleteDepartment
