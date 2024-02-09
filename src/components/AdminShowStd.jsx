import {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import "../stdPages/stdStyle/ShowStudent.css"

const AdminShowInstuctor = () => {
  const [students, setStudents] = useState({});
  const [loading, setLoading] =useState(false)
  const {id} = useParams()
  const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(()=>{
    setLoading(true)
    axios
      .get(`http://localhost:5000/students/${id}`)
      .then((response)=>{
        setStudents(response.data);
        // console.log('this',response.data)
        setLoading(false)
      })
      .catch((error)=>{
        console.log('this',error);
        setLoading(false);
      });
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
  
  export default AdminShowInstuctor