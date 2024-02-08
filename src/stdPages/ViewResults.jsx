import "../components/style/Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
 
const ViewResults=() => {

    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const [std, setStd] = useState()
    const [modal, setModal] = useState(false)
    const [quiz, setQuizes] = useState([])
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
        const token = localStorage.getItem('token')
        const data = {
            token
        }
        useEffect(()=>{
            if(!token){          
                alert('you are not logged in')
                window.location.href = ('/')
            }else{
                axios.post(`${backendUrl}/api/token`, data)
                .then((response)=>{
                    if(response.data.status === 'ok'){
                        setStd(response.data.student)
                    }
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

        useEffect(() => {
            if (std) {
              axios.get(`${backendUrl}/results/getByStd?regno=${std._id}`)
                .then((response) => {
                  fetchResultDetails(response.data.result)
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }, [std]);
          
          const fetchResultDetails =  (results)=>{
            const promises = results.map(async(result)=>{
                const quizPromise = await axios.get(`${backendUrl}/quizes/${result.quizID}`)
                return Promise.all([quizPromise])
                .then((responses)=>{
                    const [quizResponse] = responses
                    return{
                        _id : result._id,
                        regno : result.regno,
                        marksObtained : result.marksObtained,
                        answers : result.answers,
                        courseID : quizResponse.data.courseID,
                        totalMarks : quizResponse.data.marks,
                        date : quizResponse.data.updatedAt
                    }
                }).catch((error=>{
                    console.log(error)
                }))
            })
            Promise.all(promises)
            .then((quiz)=>{
                setQuizes(quiz.filter(Boolean))
            }).catch((error)=>{
                console.log(error)
            })
          }

          useEffect(() => {
            const fetchAnswers = async () => {
              try {
                const responses = await Promise.all(
                  questions.map((question) => axios.get(`${backendUrl}/questions/${question.questionID}`))
                );
          
                const fetchedAnswers = responses.map((response, index) => {
                  const answerData = response.data;
                  // Combine answer data with corresponding question data
                  const combinedData = {
                    ...answerData,
                    givenAnswer: questions[index].givenAnswer
                  };
                  return combinedData;
                });
          
                setAnswers(fetchedAnswers);
              } catch (error) {
                console.error(error);
              }
            };
          
            if (questions.length > 0) {
              fetchAnswers();
              console.log(answers)
            }
          }, [questions]);
          
          




        return (
            <div className="StuContainer">
                <h1>Results</h1>
                <table className='table-container'>
          <thead className='StdHeadings'>

          <tr>
            <th>No</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Date</th>
            <th>Total Marks</th>
            <th>Marks Obtaines</th>
            <th>Operations</th>
          </tr>
          </thead>
          <tbody>
          {
            quiz && quiz.map((q, index)=>(
            <tr key={q._id}>


                <td>{index+1}</td>
                <td>{q.courseID}</td>
                <td>{q.quizID}</td>
                <td>{q.date.slice(0,10)}</td>
                <td>{q.totalMarks}</td>
                <td>{q.marksObtained}</td>
                <td>
                  <div>
                    <button onClick={()=>{
                        handleModalOpen()
                        setQuestions(q.answers)
                        console.log("answers = ", answers)
                        console.log("questions = ", questions)
                      }}>View</button>
                  </div>
                </td>
            </tr>
            ))
          }
            
          </tbody>
        </table>
        {modal && (
                  
                  <div className='modal'>
                    <div className='modal-content'>
                    <span className='close' onClick={()=>{
                      handleModalClose()
                      setAnswers()
                      }
                      }>&times;</span>
                        <table>
                          <thead>
                            <tr>
                              <th>no.</th>
                              <th>statement</th>
                              <th>Correct answer</th>
                              <th>Given answer</th>
                            </tr>
                          </thead>
                          <tbody>
                            {answers && (answers.map((answer,index)=>(
                              <tr key={answer._id}>
                                <td>{index+1}</td>

                                <td>{answer.statement}</td>
                                <td>{answer.correct}</td>
                                <td>{answer.givenAnswer}</td>
                                
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
    
    export default ViewResults;