import {useEffect, useState} from 'react'
import axios from 'axios';
const Request = () => {

  const [approval, setApproval] = useState([])
  const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const [run, setRun] = useState(false)
  const [loading, setLoading] = useState(false)
  var from
  var section
  var detail
  var courseID
  var to;

  const [user, setUser] = useState()
    const token = localStorage.getItem('token')
    const data = {
        token
    }
    useEffect(()=>{
      setLoading(true)
        if(!token){
            alert('You are not logged in')
            window.location.href = ('/')
            setLoading(false)
        }else{
            axios.post(`${backendUrl}/api/token`, data)
            .then((response)=>{
                if(response.data){
                  if(response.data.admin)
                    setUser(response.data.admin)
                  else if(response.data.instructor)
                    setUser(response.data.instructor)
                  else console.log("no user")
                  setLoading(false)
                }
            }).catch((error)=>{
                console.log(error)
            })
        }
    },[])

  const handleDelete = (e) =>{
    e.preventDefault()
    setLoading(true)
    const apprv = {
    from,
    detail, 
    section, 
    courseID
    }
    console.log(apprv)
    axios.post(`${backendUrl}/api/request`, apprv)
    .then((response)=>{
        console.log(response.data.ID)
        axios.delete(`${backendUrl}/approvals/${response.data.ID}`)
        .then(()=>{
            console.log('deleted')
            setRun(prev => {!prev})
        }).catch((error)=>{
            console.log(error)
        })
    })
    setRun(!run)
  }


  const handleAccept =(e)=>{
    e.preventDefault()
    if(from.includes('PROF')){
      const instructor = from
      const data = {
        instructor,
        courseID,
        section
      }
      axios.post(`${backendUrl}/classes`, data)
        .then(()=>{
          console.log("Class Created")
          const apprv = {
            from,
            detail, 
            section, 
            courseID
          }
          console.log(apprv)
          axios.post(`${backendUrl}/api/request`, apprv)
          .then((response)=>{
            console.log(response.data.ID)
            handleDelete(e)
          })
        }).catch((error)=>{
          console.log(error);
        })
    }else{
      const data = {
        from,
        to,
        courseID,
        section
      }

      axios.post(`${backendUrl}/api/joinClass`, data)
        .then((response)=>{
          console.log(response.status)
          const apprv = {
            from,
            detail, 
            section, 
            courseID
          }
          console.log(apprv)
          axios.post(`${backendUrl}/api/request`, apprv)
          .then((response)=>{
            console.log(response.data.ID)
            axios.delete(`${backendUrl}/approvals/${response.data.ID}`)
            .then(()=>{
              console.log('deleted')
              window.location.href = ('/request')
            }).catch((error)=>{
              console.log(error)
            })
          })
        })
      
    }

  }

  useEffect(()=>{
    if(user){

      console.log("run ", run)
      axios
      .get(`${backendUrl}/approvals/byuser/${user._id}`)
      .then((response) =>{ 
        console.log(response.data)
        setApproval(response.data.approvals)
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  }, [run, user])
  return (
    <div className='STD-Container'>
      <div>
        <h1>Approvals List</h1>
        <div className='STD-underline'></div>        
      </div>
        <table className='table-container'>
          <thead  className='StdHeadings'>
          <tr>
            <th className='Std-No'>No</th>
            <th className='Std-RegNo'>From</th>
            <th className='Std-RegNo'>to</th>
            <th className='Std-Name'>Detail</th>
            <th className='Std-Semester'>Course</th>
            <th className='Std-WhatsApp'>Section</th>
            <th className='Std-Op'>Operations</th>
          </tr>
          </thead>
          <tbody>
            {
              approval.map((app, index)=>(
                <tr key={app._id} className='h-8'>

                <td>{index+1}</td>
                <td>{app.from}</td>
                <td>{app.to}</td>
                <td>{app.detail}</td>
                <td>{app.courseID}</td>
                <td>{app.section}</td>
                <td>
                  <div>
                  <button onClick={(e)=>{
                    from = (app.from)
                    courseID = (app.courseID)
                    detail = (app.detail) 
                    section = (app.section)
                    to= app.to
                    handleAccept(e)
                  }}>accept</button>

                  <button onClick={(event)=>{
                    from = (app.from)
                    courseID = (app.courseID)
                    detail = (app.detail) 
                    section = (app.section)
                    handleDelete(event)
                  }}>delete</button>
                  </div>
                </td>

                </tr>
              ))
            }
          </tbody>
        </table>
    </div>
  )
}

export default Request
