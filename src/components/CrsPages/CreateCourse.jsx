import {useEffect, useState} from 'react'
// import BackButton from '../BackButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Spinner from '../Spinner'


const CreateCourse = () => {

  const [_id, set_id] = useState('');
  const [name, setName] = useState('');
  const [depID, setDepID] = useState('');
  const [departments, setDepartments] = useState([]);

  const [creditHr, setCreditHr] = useState('');
    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  useEffect(()=>{
    axios
      .get(`${backendUrl}/departments`)
      .then((response) =>{ 
        setDepartments(response.data.dep)
        console.log(response.data)
        setLoading(false);
      })
      .catch((error)=>{
        console.log(error);
        setLoading(false)
      })

  },[])
  const handleSaveCourse = () =>{

    axios.get(`${backendUrl}/courses/${_id}`)
    .then((response)=>{
      if(response.data){
        return alert(`A Course with Course ID: ${_id} already exist`)
      }
    }).catch((error)=>{
      alert('An error occur. Please try again')
      console.log(error)
    })
      

    axios.get(`${backendUrl}/departments/${depID}`)
    .then().catch(()=>{
      return alert(`No department Found with Department ID : ${depID}`)
    })

    const data = {
      _id,
      name,
      depID,
      creditHr
    };
    setLoading(true);
    axios
      .post(`${backendUrl}/courses`, data)
      .then(() =>{
        setLoading(false);
        navigate('/courses');
      })
      .catch((error)=>{
        setLoading(false);
        alert('An error happend, Please check console')
        console.log(error);
      });
  }
  return (
    <div>
      {(loading)? <Spinner/> : ""}
      <div className='Create-containerStd'>

        <div className='headerStd'>
          <div className='textStd'> Course Creation</div>
          <div className='underlineStd'></div>
          <h3>Select Department:</h3>
        <div className='Course-Button'>
          <select onChange={(e) => setDepID(e.target.value)}>
            <option  className='' value='0' defaultChecked >
            Choose a department
            </option>
            {departments.map((dep) => (
              <option onChange={(e) => setDepID(e.target.value)} key={dep._id} value={dep._id}>
                {dep.name}
              </option>                
              ))}
          </select>
        </div>
        </div>
        <div className='inputsStd'>
          <div className='inputStd'>
            <input placeholder='Course ID' type='text' value={_id.toUpperCase()} onChange={(e) => set_id(e.target.value)}/>
          </div>
          <div className='inputStd'>
            <input placeholder='Name' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className='inputStd'>
            <input placeholder='Creadit Hours' type='text' value={creditHr} onChange={(e) => setCreditHr(e.target.value)}/>
          </div>
          <button className='submitStd' onClick={handleSaveCourse}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default CreateCourse
