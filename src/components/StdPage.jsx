import { Link, Navigate } from "react-router-dom";
import "./style/Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
 
const StdPage=() => {

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
                axios.post('https://quizly-nine.vercel.app/api/token', data)
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
        
        <a href="" className="InsButton">
            View Results
        </a>
        <Link to = {std? `/JoinedClasses`: '/StdPage'} className="Stubutton">      
            Classes
        </Link>
        <a href="/login" className="InsButton" onClick={handleLogout}>
            logout
        </a>
        </div>
  )
}

export default StdPage;
