import {useState, useEffect} from 'react'
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
  const token = localStorage.getItem('token')
  const [admin, setAdmin] = useState()
  const data = {
      token
  }
    useEffect(()=>{
      console.log('inside use effect')
      if(!token){
          alert('You are not logged in')
          window.location.href = ('/')
      }else{
          console.log('here')
          axios.post(`${backendUrl}/api/token`, data)
          .then((response)=>{
              if(response.data.status === 'ok'){
                  setAdmin(response.data.admin)
              }
          }).catch((error)=>{
              console.log('happy')
              console.log(error)
          })
      }
  },[])


  return (
    <>
      
    {admin? (

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
    :(<h1>You are not allowed here</h1>)}
    </>  
    )
}

export default DeleteDepartment
