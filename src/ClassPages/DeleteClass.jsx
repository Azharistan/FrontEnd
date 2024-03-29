import {useState, useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteClass = () => {
    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id }=useParams();

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

  const handleDeleteClass=()=>{
    setLoading(true);
    axios
      .delete(`${backendUrl}/classes/${id}`)
      .then(()=>{
        setLoading(false);
        navigate('/classes');
      })
      .catch((error)=>{
        setLoading(false)
        alert("Error!!! Please Check Console")
        console.log(error)
      });

  };

  return (
    <>
      
    {admin? (

    <div>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Class</h1>
      {loading ? <Spinner/>: (

      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteClass}>Yes, Please</button>
      </div>
      )}
    </div>
  ):(<h1>You are not allowed here</h1>)}
  
  </>
  )
}

export default DeleteClass
