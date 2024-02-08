import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import Select from 'react-select';

const CreateInstructor = () => {
  const [_id, set_id] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${backendUrl}/departments`)
      .then((response) => {
        setDepartments(response.data.dep);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSaveInstructor = () => {
    if (_id.length !== 7) {
      return alert('Invalid ProfID');
    }

    axios
      .get(`${backendUrl}/instructors/${_id}`)
      .then((response) => {
        if (response.data) return alert(`An instructor with ProfID: ${_id} already exists`);
      })
      .catch((error) => {
        alert('An error occurred. Please try again');
        console.log(error);
      });

    if (!validator.isEmail(email)) {
      return alert('Invalid Email');
    }
    if (!validator.isStrongPassword(password)) {
      return alert('Password is not strong');
    }

    const data = {
      _id,
      name,
      whatsapp: `${selectedCountry?.value} ${whatsapp}`, // Updated format with country code
      department,
      email,
      password,
    };

    axios
      .post(`${backendUrl}/instructors`, data)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  return (
    <div className='Create-containerStd'>
    <div className='headerStd'>
      <div className='textStd'> Instructor Registration</div>
      <div className='underlineStd'></div>
    </div>
      <div className='inputsStd' >
        <div className='inputStd'>
          <input placeholder='ProfID' type='text' value={ _id.toUpperCase()} onChange={(e) => set_id(e.target.value)}/>
        </div>
        <div className='inputStd'>
          <input placeholder='Name' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        
        
        <div className='inputStd'>
          <input placeholder='WhatsApp' type='text' value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}/>
        </div>
        <div  className='inputStd'>
          <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div  className='inputStd'>
          <input placeholder='Password' type='password' value={password} onChange={(e) => setPassword((e.target.value))}/>
        </div>
        <div className='Department-Button'>
        <h3>Select Department:</h3>
          <select onChange={(e) => setDepartment(e.target.value)}>
            <option  className='' value='0' defaultChecked disabled>
            Choose a department
            </option>
            {departments.map((dep) => (
              <option onChange={(e) => setDepartment(e.target.value)} key={dep._id} value={dep._id}>
                {dep.name}
              </option>                
              ))}
          </select>
        </div>
        <button className='submitStd' onClick={handleSaveInstructor}>Save</button>
      </div>
    </div>
  );
};

export default CreateInstructor;
