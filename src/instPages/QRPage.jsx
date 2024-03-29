import { useEffect, useState } from 'react'
import {QRCodeSVG} from 'qrcode.react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import "./QuizStyle/QRpage.css"

const QRPage = () => {

    const {id} = useParams();
    const [loading, setloading] = useState(false)
    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const [link, setLink] = useState('');
    console.log(id)
    useEffect(()=>{
        axios.post(`${backendUrl}/quizes/attempt/${id}`)
        .then((response)=>{
            console.log(response)
            setloading(true)
            if(response.statusText === 'Already Attempting')
                alert("It seems you have already attempted this quiz before.")
            else if(response.statusText === 'token expired')
                alert("Sorry the time to attempt this quiz is over.")
            else if( response.status==200){
                setLink(`https://quizly-cust.netlify.app/attempt/${id}`)
                console.log("link")
                setloading(false)
            }
        }
        )
    },[])
    return (
      <div className="container">
        {loading ? (
          <p className="loadingMessage">Loading...</p>
        ) : (
          <div className="QRCodeContainer">
            <QRCodeSVG className="QRCodeSVG" height={'100%'} value={link} />
            <div className="linkContainer">
              <p>Or Click on the following link: <a href={link}>Link</a></p>
            </div>
          </div>
        )}
        { /* Add logic to display alert messages as needed */ }
      </div>
    );
      
}

export default QRPage
