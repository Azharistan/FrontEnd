import "./style/Home.css";
import { useState, useEffect } from "react";
import axios from "axios";
 
const Create=() => {
    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const token = localStorage.getItem('token')
    const [admin, setAdmin] = useState()
    const data = {
        token
    }
    useEffect(()=>{
        console.log('inside use effect')
        if(!token){
            alert('You are not logged in')
            window.location.href = ('/')
        }else{
            console.log('here')
            axios.post(`${backendUrl}/api/token`, data)
            .then((response)=>{
                if(response.data.status === 'ok'){
                    setAdmin(response.data.admin)
                }
            }).catch((error)=>{
                console.log('happy')
                console.log(error)
            })
        }
    },[])

    function handleLogout (){
        localStorage.removeItem('token')
        window.location.href = ('/')
    }

  return (
    <div>
        {admin? (
            <div>
                <h1>Welcome {admin._id}</h1>

                <div className="StuContainer">
                    <a href="/request"  className="Stubutton">
                        Approvals
                    </a>
                </div>
                <div className="StuContainer">
                    <a href="/students"  className="Stubutton">
                        Student
                    </a>
                </div>
                <div className="InsContainer">
                    <a href="/Instructors" className="InsButton">
                        Instructor
                    </a>
                </div>
                <div className="InsContainer">
                    <a href="/Departments" className="InsButton">
                        Department
                    </a>
                </div>
                <div className="InsContainer">
                    <a href="/Courses" className="InsButton">
                        Course
                    </a>
                </div>
                <div className="InsContainer">
                    <a href="/Classes" className="InsButton">
                        Class
                    </a>
                </div>
                <div className="InsContainer">
                <a href="/session"  className="Stubutton">
                        Session
                    </a>
                </div>
                <div className="InsContainer">
                    <a href="/" className="InsButton" onClick={handleLogout}>
                        logout
                    </a>
                </div>
            </div>
        ):(<><h1>you are not allowed here</h1></>)}
    </div>
  )
}

export default Create;
