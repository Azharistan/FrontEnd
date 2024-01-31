import {useEffect, useState} from 'react'
import axios from 'axios';
const Quiz = () => {
  
  const [prof, setProf] = useState()
  const [classes, setClasses] = useState([])
  const [quiz, setQuiz] = useState()
  const [clicked, setClicked] = useState(true)
  const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const token = localStorage.getItem('token')
  const data = {
    token
  }
  useEffect(()=>{
    if(!token){
      alert('You are not logged in')
      window.location.href = ('/')
    }else{
      axios.post(`${backendUrl}/api/token`, data)
      .then((response)=>{
        if(response.data.status === 'ok'){
          setProf(response.data.instructor)
          return(response.data.instructor)
        }
      }).then((instructor)=>{
        const data = {
          _id: instructor._id
        }
        axios.post(`${backendUrl}/classes/getByInstructor`, data)
        .then((res)=>{
          console.log("Classes = ", res.data.class1)
          setClasses(res.data.class1)
          return(res.data.class1)
        })
      }).catch((error)=>{
        console.log(error)
      })
    }
  },[])  

  useEffect(() => {
    if (classes.length > 0) {
      const promises = [];
      classes.forEach((Class) => {
        if (Class.quizList.length !== 0) {
          Class.quizList.forEach((q) => {
            promises.push(
              axios.get(`${backendUrl}/quizes/${q}`)
                .then((response) => {
                  var quizNo = 8;
                  for(let i=0; i<Class.quizList.length; i++) {
                    if(response.data._id === Class.quizList[i])
                      quizNo = i+1
                  }
                  return { ...response.data, section: Class.section, quizNo: quizNo };
                })
                .catch((error) => {
                  console.log(error);
                  return null;
                })
            );
          });
        }
      });
  
      Promise.all(promises)
        .then((quizData) => {
          // Remove null values and update the state with the received data
          const filteredQuizData = quizData.filter((item) => item !== null);
          setQuiz(filteredQuizData);
          console.log(filteredQuizData)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [classes,clicked]);

  const publishQuiz = (quiz)=>{
    if(quiz){
      axios.post(`${backendUrl}/quizes/publishQuiz/${quiz}`)
      .then((response)=>{
        console.log(response.data)
        window.location.href = (`/Qrpage/${response.data.quiz._id}`);
        setClicked(!clicked)
      }).catch((error)=>{
        console.log(error)
      })
    }
  }

  return (
    <div className='STD-Container'>
      <div>
        <h1>Quiz List</h1>
        <div className='STD-underline'></div>        
      </div>
        <table className='table-container'>
          <thead  className='StdHeadings'>
          <tr>
            <th className='center Std-No'>Sr. No.</th>
            <th className='center Std-RegNo'>Course</th>
            <th className='center Std-RegNo'>Section</th>
            <th className='center Std-RegNo'>Quiz N0.</th>
            <th className='center Std-Name'>Total Marks</th>
            <th className='center Std-Op'>Operations</th>
          </tr>
          </thead>
          <tbody>
          {
            quiz?
            
            quiz.map((q, index)=>(
              <tr key={index}>
                <td className='center'>{index+1}</td>
                <td className='center'>{q.courseID}</td>
                <td className='center'>{q.section}</td>
                <td className='center'>{q.quizNo}</td>
                <td className='center'>{q.marks}</td>
                <td>
                  
                    {/* q.published? 
                      <button disabled>published</button>: */}
                      <button onClick={()=>{
                          publishQuiz(q._id)
                        }}>publish</button>
                  
                
                  <button onClick={()=>{
                      console.log(q)
                    }
                  }>View</button>
                
                </td>
              </tr>
            )): <tr><td>No data found</td></tr>
            
          }
          </tbody>
        </table>
    </div>
  )
}

export default Quiz
