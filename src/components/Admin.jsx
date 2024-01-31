import axios from "axios"
import objectHash from "object-hash"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const hash = objectHash
axios

const Admin = () => {
    const [id, setID] = useState('')
    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const [pass, setPass] = useState('')

    const Navigate = useNavigate()
    const handleLogin = () =>{
        axios.get(`${backendUrl}/admins/${id}`)
            .then((response)=>{
                if((pass)===response.data.pass)
                    {Navigate('/create')}
                else{
                    alert('ID or Password may be incorrect')
                }
            }).catch((error)=>{
                alert('ID or Password may be incorrect')
                console.log("This is an error", error)
            })
    }
    return (
<>


    <div>
      <label>ID</label>
      <input value={id} type='text' onChange={(e)=> setID((e.target.value))} />
    </div>
        
    <div>
      <label>Password</label>
      <input value={pass} type='password' onChange={(e)=> setPass(e.target.value)} />
    </div>
    <button onClick={handleLogin}>Login</button>
</>
  )
}

export default Admin
