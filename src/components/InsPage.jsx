import { Link } from "react-router-dom";
import "./style/Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
 
const InsPage=() => {
    const [prof, setProf] = useState()
    const token = localStorage.getItem('token')
    const data = {
        token
    }
    useEffect(()=>{
        console.log('inside use effect')
        if(!token){
            alert('You are not logged in')
            window.location.href = ('https://quizly-cust.netlify.app/login')
        }else{
            console.log('here')
            axios.post('https://quizly-nine.vercel.app/api/token', data)
            .then((response)=>{
                if(response.data.status === 'ok'){
                    setProf(response.data.instructor)
                }
            }).catch((error)=>{
                console.log('happy')
                console.log(error)
            })
        }
    },[])
    
    function handleLogout(){
        localStorage.removeItem('token')
        window.location.href = ('https://quizly-cust.netlify.app/')
    }

  return (
    <div className="StuContainer">
        <h1>Welcome {prof? prof.name:''}</h1>
        <Link to = {prof? `https://quizly-cust.netlify.app/instructors/info`: 'https://quizly-cust.netlify.app/insPage'} className="Stubutton">                         
                View profile
            </Link>

            <Link to = {prof? `https://quizly-cust.netlify.app/instructors/edit`: 'https://quizly-cust.netlify.app/insPage'} className="Stubutton">                         
                Edit Profile
            </Link>
            <Link to = {prof? `https://quizly-cust.netlify.app/classes/create`: 'https://quizly-cust.netlify.app/insPage'} className="Stubutton">                         
            Create Class
            </Link>
            <Link to = {prof? `https://quizly-cust.netlify.app/insclasses`: 'https://quizly-cust.netlify.app/insPage'} className="Stubutton">                         
            Classes
            </Link>
            <Link to = {prof? `https://quizly-cust.netlify.app/QuizList`: 'https://quizly-cust.netlify.app/insPage'} className="Stubutton">                         
            Quizes
            </Link>
            
        <a className="InsButton" onClick={handleLogout}>
            logout
        </a>
    </div>
  )
}

export default InsPage;
