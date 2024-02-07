import {useEffect,useState} from 'react'
import axios from 'axios'
import "./stdStyle/ShowStudent.css"

const ShowStudent = () => {
  const [students, setStudents] = useState({});
  const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(()=>{

    const token = localStorage.getItem('token')
    const data = {
        token
    }
    if(!token){          
        alert('you are not logged in')
        window.location.href = ('/')
    }else{
        axios.post(`${backendUrl}/api/token`, data)
        .then((response)=>{
            if(response.data.status === 'ok'){
                setStudents(response.data.student)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    }, [])
    return (
      <div className='Show-ContainerIns'>
        <h1>Show Student</h1>
        <div className='Show-UnderlineIns'></div>
              <p>Reg no:  </p>
              <span>{students._id}</span>
              <p >Name: </p>
              <span>{students.name}</span>
              <p >Semester: </p>
              <span>{students.semester}</span>
              <p >Email: </p>
              <span>{students.email}</span>
              <p >Whatsapp: </p>
              <span>{students.whatsapp}</span>
      </div>
  )
}

export default ShowStudent
