import {useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import "./stdStyle/DeleteStudent.css"

const DeleteStudent = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const {id }=useParams();
  const handleDeleteStudent=()=>{
    setLoading(true);
    axios
      .delete(`${backendUrl}/students/${id}`)
      .then(()=>{
        setLoading(false);
        navigate('/students');
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
      <h3 className='confirm-text'>Are you sure you want to delete {id}?</h3>
      <button className='delete-button' onClick={handleDeleteStudent}>
        Yes, Please
      </button>
    </div>
  </div>
);
};
export default DeleteStudent
