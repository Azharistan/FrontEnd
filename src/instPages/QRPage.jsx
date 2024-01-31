import { useEffect, useState } from 'react'
import {QRCodeSVG} from 'qrcode.react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const QRPage = () => {

    const {id} = useParams();
    const [loading, setloading] = useState(false)
    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const [link, setLink] = useState('');
    console.log(id)
    useEffect(()=>{
        axios.get(`${backendUrl}/quizes/attempt/${id}`)
        .then((response)=>{
            console.log(response)
            setloading(true)
            if(response.statusText === 'Already Attempting')
                alert("It seems you have already attempted this quiz before.")
            else if(response.statusText === 'token expired')
                alert("Sorry the time to attempt this quiz is over.")
            else if( response.status==200){
                setLink(`/attempt/${id}`)
                console.log("link")
                setloading(false)
            }
        }
        )
    },[])
    return (
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <QRCodeSVG height={'100%'} value={link} />
              <p>Or Click on the following link: <a href={link}>Link</a></p>
            </div>
          )}
        </div>
      );
      
}

export default QRPage
