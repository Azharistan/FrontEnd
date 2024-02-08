import { Link } from "react-router-dom";
import "../components/style/Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
 
const StdPage=() => {

    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const [std, setStd] = useState()
        const token = localStorage.getItem('token')
        const data = {
            token
        }
        useEffect(()=>{
            if(!token){          
                alert('you are not logged in')
                window.location.href = ('/')
            }else{
                axios.post(`${backendUrl}/api/token`, data)
                .then((response)=>{
                    if(response.data.status === 'ok'){
                        setStd(response.data.student)
                    }
                }).catch((error)=>{
                    console.log(error)
                })
                // console.dir(typeof(std))
                // console.log(std)
                // console.log('Wellcome ', std.name)
            }
        },[])
        
        function handleLogout (){
            localStorage.removeItem('token')
            window.location.href = ('/')
    }
    
  return (
        <div className="StuContainer">
        <h1>Welcome {std? std.name:''}</h1>
        
            <Link to = {std? `/students/info`: '/StdPage'} className="Stubutton">                         
                View Profile
            </Link>

            <Link to = {std? `/students/edit`: '/StdPage'} className="Stubutton">                         
                Edit Profile
            </Link>
            <Link to = {std? `/joinClass`: '/StdPage'} className="Stubutton">                         
                Join Class
            </Link>
        
            <Link to = {std? `/ViewResults`: '/StdPage'} className="Stubutton">      
                Results
            </Link>
        <Link to = {std? `/JoinedClasses`: '/StdPage'} className="Stubutton">      
            Classes
        </Link>
        <a href="/" className="InsButton" onClick={handleLogout}>
            logout
        </a>
        </div>
  )
}

export default StdPage;
