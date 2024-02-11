import {useEffect, useState} from 'react'
import axios from 'axios';
const Quiz = () => {
  const [prof, setProf] = useState()
  const [classes, setClasses] = useState([])
  const [questions, setQuestions] = useState([])
  const [question, setQuestion] = useState()
  const [quizes, setQuizes] = useState() //if problem in publishing quiz please reset quizes to quiz
  const [quiz, setQuiz] = useState()
  const [result, setresult] = useState()
  const [modal, setModal] = useState(false)
  const [resultModal, setResultModal] = useState(false)
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
          setClasses(res.data.class1)
          return(res.data.class1)
        })
      }).catch((error)=>{
        console.log(error)
      })
    }
  },[])  

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const handleResultModalOpen = () => {
    setResultModal(true);
  };

  const handleResultModalClose = () => {
    setResultModal(false);
  };

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
          setQuizes(filteredQuizData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [classes,clicked]);

  const publishQuiz = (quizes)=>{
    if(quizes){
      axios.post(`${backendUrl}/quizes/publishQuiz/${quizes}`)
      .then((response)=>{
        console.log(response.data)
        window.location.href = (`/Qrpage/${response.data.quiz._id}`);
        setClicked(!clicked)
      }).catch((error)=>{
        console.log(error)
      })
    }
  }

  const fetchQuestions = (questions) => {
    const promises = questions.map(async (question) => {
      try {
        const questionResponse = await axios.get(`${backendUrl}/questions/${question}`);
        return questionResponse.data; // Return only the data from the response
      } catch (error) {
        console.log(error);
        return null; // Return null for failed requests
      }
    });
  
    Promise.all(promises)
      .then((questionDataArray) => {
        // Filter out any null values from the array
        const filteredQuestionData = questionDataArray.filter(Boolean);
        setQuestion(filteredQuestionData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  useEffect(()=>{
    if(questions.length>0)
    fetchQuestions(questions)
  },[questions])
   
  useEffect(()=>{
    if(quiz){
      axios.get(`${backendUrl}/results/getByQuizID/${quiz}`)
      .then((response)=>{
        setresult(response.data.result)
      })
    }
  },[quiz])
  return (
    <div className='STD-Container'>
      <div>
        <h1>Quiz List</h1>
        <div className='STD-underline'></div>        
      </div>
      {modal && ( 
        <div className='modal'>
          <div className='modal-content'>
          <span className='close' onClick={()=>{
            handleModalClose()
            setQuestions([])
            }
            }>&times;</span>
              <table>
                <thead>
                  <tr>
                    <th>no.</th>
                    <th>statement</th>
                    <th>Topic</th>
                    <th>Subtopic</th>
                    <th>Correct answer</th>
                  </tr>
                </thead>
                <tbody>
                  {question && (question.map((q,index)=>(
                    <tr key = {q._id}>
                      <td>{index+1}</td>
                      <td>{q.statement}</td>
                      <td>{q.topic}</td>
                      <td>{q.subTopic}</td>
                      <td>{q.correct}</td>                                
                    </tr>
                  )))}
                </tbody>
              </table>
          </div>
        </div>
      )}

      {resultModal && (
                  
                  <div className='modal'>
                    <div className='modal-content'>
                    <span className='close' onClick={()=>{
                      handleResultModalClose()
                      setQuiz()
                      }
                      }>&times;</span>
                        <table>
                          <thead>
                            <tr>
                              <th>no.</th>
                              <th>RegNo</th>
                              <th>Marks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result && (result.map((q,index)=>(
                              <tr key = {q._id}>
                                <td>{index+1}</td>
                                <td>{q.regno}</td>
                                <td>{q.marksObtained}</td>                       
                              </tr>
                            )))}
                          </tbody>
                        </table>
                    </div>
                  </div>
                  
                )}
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
            quizes?
            
            quizes.map((q, index)=>(
              <tr key={index}>
                <td className='center'>{index+1}</td>
                <td className='center'>{q.courseID}</td>
                <td className='center'>{q.section}</td>
                <td className='center'>{q.quizNo}</td>
                <td className='center'>{q.marks}</td>
                <td>
                  
                    { q.published? 
                      (<>
                        <button disabled>published</button>
                        <button onClick={()=>{
                          handleResultModalOpen()
                          setQuiz(q._id)
                          }}>Show Result</button>
                      </>): 
                      <button onClick={()=>{
                          publishQuiz(q._id)
                        }}>publish</button>
                      }
                  
                
                      <button onClick={()=>{
                        handleModalOpen()
                        setQuestions(q.questions)
                      }}>View</button>
                
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
