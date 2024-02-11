import axios from 'axios';
import { handHeart } from 'fontawesome';
import React, { useEffect, useState } from 'react'

const Session = () => {
    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const [session, setSession] = useState({})
    const [newSession, setNewSession] = useState()
    const [newSemester, setNewSemester] = useState()
    const [show, setShow] = useState(false)
    useEffect(()=>{

        axios.get(`${backendUrl}/sessions/currentSession`)
        .then((response)=>{
            setSession(response.data.session)
            console.log(response.data.session)
        })
    }, [])

    const handleUpdateSession = ()=>{
        const ses = {
            currentSession : newSession,
            semester : newSemester,
            prevSession : {...session.prevSession, session}
        }
        axios.put(`${backendUrl}/sessions/${session._id}`, ses)
        .then((response)=>{
            console.log(response.data)
        }).catch((error)=>{console.log(error);})
    }
  return (
    <div>
        {session && (
<>

        <p>Current session : {session.currentSession}</p>
        <p>Semester : {session.semester}</p>
</>
        )}
        {show? (<>
            <label>new Session Number : </label>
            <input type='number' onChange={(e)=>{
                setNewSession(e.target.value)
            }}/>
            <select onChange={(e)=>{
                setNewSemester(e.target.value)
            }}>Semester
            <option value={''} defaultChecked disabled>select Semester</option>
            <option value={'spring'}>spring</option>
            <option value={'fall'}>fall</option>
            <option value={'summer'}>summer</option>
            </select>
            <button onClick={()=>{
                handleUpdateSession()
            }}></button>
        </>):(
            <>
        <button onClick={()=>{
            setShow(true)
        }}>add session</button>
        </>
        )}
    </div>
  )
}

export default Session
