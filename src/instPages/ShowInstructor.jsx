import {useEffect,useState} from 'react'
import axios from 'axios'
import "../stdPages/stdStyle/ShowStudent.css"


const ShowInstuctor = () => {
  const [instructors, setinstructors] = useState({});
  const [dep, setDep] = useState()
  const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(()=>{
    const token = localStorage.getItem('token')
    const data = {
      token
    }
    if(!token){
      alert("You are not logged in")
      window.location.href= ('/login')
    }else{
      axios.post(`${backendUrl}/api/token`, data)
      .then((response)=>{
        if(response.data.status === 'ok'){
          setinstructors(response.data.instructor)
          return(response.data.instructor)
        }
      }).then((res)=>{
        axios.get(`${backendUrl}/departments/${res.department}`)
        .then((response) => {    
            setDep(response.data.name)
          })
      })
      
      .catch((error)=>{
        alert("Something went wrong please try again")
        console.log(error)
      })
    }
  }, [])
  
    return (
      <div className='Show-ContainerIns'>
        <h1>Details</h1>
        <div className='Show-UnderlineIns'></div>
        
        <form className='Show-inputsIns'>
              <p>Prof ID:  </p>
              <span>{instructors._id}</span>
              <p >Name: </p>
              <span>{instructors.name}</span>
              <p >Department: </p>
              <span>{dep ? dep : instructors.department}</span>
              <p >Email: </p>
              <span>{instructors.email}</span>
              <p >Whatsapp: </p>
              <span>{instructors.whatsapp}</span>
          </form>
      </div>
  )
}

export default ShowInstuctor
