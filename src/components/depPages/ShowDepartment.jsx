import {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../BackButton'
import Spinner from '../Spinner'

const ShowDepartment = () => {
  const [departments, setDepartments] = useState({});
  const [loading, setLoading] =useState(false)
    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const {id} = useParams()

  useEffect(()=>{
    setLoading(true)
    axios
      .get(`${backendUrl}/departments/${id}`)
      .then((response)=>{
        setDepartments(response.data);
        console.log('this',response.data)
        setLoading(false)
      })
      .catch((error)=>{
        console.log('this',error);
        setLoading(false);
      });
    }, [])
    return (
      <div className='Show-ContainerIns'>
        <h1 className='textIns'>Show Department</h1>
        <div className='Show-UnderlineIns'></div>
        {loading ? (
          <Spinner />
        ) : (
          <form className='Show-inputsIns'>
            
              <p >ID : </p> {departments._id}
            
              <p >Name : </p>
                {departments.name}
            
              <p >Dean : </p>
                {departments.dean}
            
              <p >HOD : </p>
                {departments.hod}
          </form>
        )}

      </div>
  )
}

export default ShowDepartment
