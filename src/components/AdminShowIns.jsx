import {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ShowInstuctor = () => {
  const [instructors, setinstructors] = useState({});
  const [dep, setDep] = useState();
  const {id} = useParams()
  const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(()=>{
    axios
      .get(`${backendUrl}/instructors/${id}`)
      .then((response)=>{
        setinstructors(response.data);
        console.log('this',response.data)
        return(response.data)
      }).then((res)=>{
        axios.get(`${backendUrl}/departments/${res.department}`)
        .then((response) => {    
            setDep(response.data.name)
          })
      })
      .catch((error)=>{
        console.log('this',error);
      });
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
  