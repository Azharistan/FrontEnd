import {useEffect, useState} from 'react'
import axios from 'axios';
import "../stdPages/stdStyle/Home.css"
import { Navigate } from 'react-router-dom';
const InsClasses = () => {
  var index = 0;
    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const [show, setShow] = useState(false);
  const [ss, setSs] = useState({})
  const [stdList, setStdList] = useState([])
  const [instructor, setInstructor] = useState()
        var token = localStorage.getItem('token')
        const data = {
            token
        }

        function getInstructor(){
          if(!token){          
            alert('you are not logged in')
            window.location.href = ('/')
        }else{
            axios.post(`${backendUrl}/api/token`, data)
            .then((response)=>{
                if(response.data.status === 'ok'){
                    setInstructor(response.data.instructor)
                }
                return(response.data.instructor)
            }).then( async (instructor)=>{
                const data = {
                  _id:instructor._id
                }
                axios
                .post(`${backendUrl}/classes/getByInstructor`, data)
                .then((response) =>{
                  console.log(response.data)
                  fetchClassDetails(response.data.class1)
                })
            })
            
            
            .catch((error)=>{
                console.log(error)
            })
        }
        }
        useEffect(()=>{
            getInstructor();
        }, [])


  const [detailedClass, setDetails] = useState([])

  const fetchClassDetails = (classs)=>{
    const promises = classs.map((Class) => {
      const coursePromise = axios.get(`${backendUrl}/courses/${Class.courseID}`)
      return Promise.all([coursePromise])
      .then((responses)=>{
        const [courseResponse] = responses
        return {
          _id: Class._id,
          stdList: Class.stdList,
          quizList: Class.quizList,
          course: courseResponse.data._id,
          instructor: Class.instructor,
          section: Class.section,
          courseName: courseResponse.data.name,
          topics: courseResponse.data.topics,


        }
      }).catch((error)=>{
        console.log(error)
      })
    })

    Promise.all(promises)
    .then((detailedClass) => {
      setDetails(detailedClass.filter(Boolean))
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const handleCreateQuiz =(selected)=>{
    const st = JSON.stringify(selected)

    localStorage.setItem("class", st)
    window.location.href = ('/question')
  }

  useEffect(()=>{
    if(ss){

      axios.get(`${backendUrl}/classes/getStudents/${ss._id}`)
      .then((response)=>{
        console.log(response.data)
        setStdList(response.data.stdList)
      })
    }
    

  }, [ss])

  const  newStd = async(id)=>{
    const stdll = await stdList.filter(std => {
        std._id === id._id})
    const course = {
      _id: ss._id,
      instructor: ss.instructor,
      stdList: stdll,
      quizList: ss.quizList,
      courseID: ss.courseID,
      section: ss.section
      
    }
    setStdList(stdll)
    axios.put(`${backendUrl}/classes/${ss._id}`, course)
    .then((response)=>{
      console.log(response.data)
      console.log(stdList)  
    })
  }

  return (
    <div className='STD-Container'>
      <div>
        <h1>Joined Class List</h1>
        <div className='STD-underline'></div>
      </div>
        <table className='table-container'>
          <thead className='StdHeadings'>

          <tr>
            <th>No</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Section</th>
            <th>Operations</th>
          </tr>
          </thead>
          <tbody>
            {
              detailedClass.map((detailedClass)=>(
                <tr key={detailedClass._id}>

                <>
                

                <td>{++index}</td>
                <td>{detailedClass.course}</td>
                <td>{detailedClass.courseName}</td>
                
                <td>{detailedClass.section}</td>
                <td>
                  <div>
                    <button onClick={()=>{
                      setSs(detailedClass)
                      console.log(detailedClass.stdList)
                      setShow(!show)
                      }}>Show Students</button>
                    <button onClick={()=>{
                      handleCreateQuiz(detailedClass)
                      }}>Create Quiz</button>
                  </div>
                  <div>
                  </div>
                </td>
                </>
                </tr>

              ))
            }
          </tbody>
        </table>
        
        {show && ( 
        <div className='modal'>
          <div className='modal-content'>
          <span className='close' onClick={()=>{
            setShow(!show)
            setSs()
            }
            }>&times;</span>
              <table>
                <thead>
                  <tr>
                    <th>no.</th>
                    <th>Reg No.</th>
                    <th>Name</th>
                    <th>Semester</th>
                    <th>Opration</th>
                  </tr>
                </thead>
                <tbody>
                  {stdList && (stdList.map((student,index)=>(
                    <tr key = {student._id}>
                      <td>{index+1}</td>
                      <td>{student._id}</td>
                      <td>{student.name}</td>
                      <td>{student.semester}</td>
                      <td><button onClick={()=>{
                        newStd(student)
                      }}>
                      Remove from Class
                      </button></td>                                
                    </tr>
                  )))}
                </tbody>
              </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default InsClasses
