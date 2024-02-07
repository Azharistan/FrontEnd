// File: CreateQuiz.js

import  { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizStyle/createquiz.css'; // Make sure to import the CSS file


const CreateQuiz = () => {
  const [instructor, setInstructor] = useState();
  const [topic, setTopic] = useState();
  const [subTopic, setSubtopic] = useState();
  const [questionList, setQuestionList] = useState([]);
  const [questionStats, setQuestionStats] = useState([]);
  const [selectClass, setSelectClass] = useState({});
  const [showNewQuestion, setNewQuestion] = useState(false); //modal trigger
  const [showExistingQuestion, setExistingQuestion] = useState(false); //modal trigger
  const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
  
  const [questionData, setQuestionData] = useState({
    courseID: '',
    statement: '',
    topic: '',
    subTopic: '',
    options: ['', ''],
    correct: ''
  });

  useEffect(() => {
    const storedClass = JSON.parse(localStorage.getItem('class'));
    setSelectClass(storedClass);
    console.log(storedClass);
    getInstructor();
  }, []);

  const getInstructor = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in');
      window.location.href = '/login';
    } else {
      axios.post(`${backendUrl}/api/token`, { token })
        .then((response) => {
          if (response.data.status === 'ok') {
            setInstructor(response.data.instructor);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleNewQuestionOpen = () => {
    setNewQuestion(true);
  };

  const handleNewQuestionClose = () => {
    setNewQuestion(false);
  };

  
  const handleExistingQuestionOpen = () => {
    setExistingQuestion(true);
  };

  const handleExistingQuestionClose = () => {
    setExistingQuestion(false);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'options') {
      const updatedOptions = [...questionData.options];
      updatedOptions[index] = value;
      setQuestionData({ ...questionData, courseID: selectClass.course, options: updatedOptions });
    } else {
      setQuestionData({ ...questionData, [name]: value });
    }
    if(name === 'topic')
      setTopic(value)
  };

  const handleAddOption = () => {
    if (questionData.options.length < 4) {
      const updatedOptions = [...questionData.options, ''];
      setQuestionData({ ...questionData, options: updatedOptions });
    }
  };

  const handleSubmit = () => {
    console.log(questionData)
    axios.post(`${backendUrl}/questions`, questionData)
      .then((response) => {
        setQuestionStats([...questionStats, response.data]);
        setQuestionData({
          courseID: selectClass.course,
          statement: '',
          options: ['', ''],
          correct: ''
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteQuestion = (index) => {
    const updatedStats = [...questionStats];
    updatedStats.splice(index, 1);
    setQuestionStats(updatedStats);
  };

  const handleDone = () => {
    if(questionStats.length === 0){
      alert("The Quiz have Zero Questions")
    }
    else{

      const updatedQuestions = questionStats.map(question => question._id);
      const data = {
        depID: instructor.department,
        courseID: selectClass.course,
        createdBy: instructor._id,
        marks: updatedQuestions.length,
        questions: updatedQuestions
      };
      
      axios.post(`${backendUrl}/quizes`, data)
      .then((response) => {
        console.log(response.data);
        axios.get(`${backendUrl}/classes/${selectClass._id}`)
        .then((res)=>{
          res.data.quizList.push(response.data._id)
          console.log(res.data)
          axios.put(`${backendUrl}/classes/${selectClass._id}`, res.data)
          .then((response)=>{
            if (response==='ok')
            alert("Quiz Created Succesfully!")
          })  
        })
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };


  useEffect(()=>{
    console.log(topic,subTopic,selectClass.course)
    if((topic)){
      axios.post(`${backendUrl}/questions/getByCourse`, {courseID : selectClass.course,
      topic: topic, subTopic : subTopic})
      .then(async (response)=>{
        await setQuestionList(response.data.question)
        console.log(arrayDiff(response.data.question, questionStats))
        console.log(response.data.question)
        console.log(questionStats)
      })
    }
  },[topic, subTopic])

  

  // const handleTopicChange = (e) => {
  //   const selectedTopic = e.target.value;
  //   setTopic(selectedTopic);
  //   setSubtopic('');
  //   const data = {
  //     courseID : selectClass.course,
  //     topic: topic,
  //     subTopic : subTopic
  //   }
  //   console.log("data = ", data)
  //     axios.post(`${backendUrl}/questions/getByCourse`, data)
  //     .then((response)=>{
  //       console.log(response.data.question)
  //     })
  // };

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <div className='class-container'>
                <button className='button-options' onClick={handleNewQuestionOpen}>New Question</button>
                <button className='button-options' onClick={handleExistingQuestionOpen}>Existing Question</button>

                {showNewQuestion && (
                  <div className='modal'>
                    <div className='modal-content'>
                      <span className='close' onClick={handleNewQuestionClose}>&times;</span>
                      <form className='modal-inputs'>
                      <label>Select Topic:</label>
                        <select
                          name='topic'
                          value={questionData.topic}
                          onChange={handleInputChange}
                        >
                          <option defaultChecked>Select a topic</option>
                          {selectClass.topics.map((topic, index) => (
                            <option key={index} value={topic.name}>
                              {topic.name}
                            </option>
                          ))}
                        </select>

                        <label>Select Subtopic:</label>
                        <select
                          name='subTopic'
                          value={questionData.subTopic}
                          onChange={
                            handleInputChange
                            }
                        >
                          <option defaultChecked>Select SubTopic</option>
                          {topic &&
                            selectClass.topics
                              .find((t) => t.name === topic)
                              .subTopics.map((st, index) => (
                                <option key={index} value={st}>
                                  {st}
                                </option>
                              ))}
                        </select>
                        <label>Question Statement:</label>
                        <input
                          type='text'
                          name='statement'
                          value={questionData.statement}
                          onChange={handleInputChange}
                        />

                        {questionData.options.map((option, index) => (
                          <div key={index}>
                            <label>Option {index + 1}:</label>
                            <input
                              type='text'
                              name='options'
                              value={option}
                              onChange={(e) => handleInputChange(e, index)}
                            />
                          </div>
                        ))}

                        {questionData.options.length < 4 && (
                          <button type='button' onClick={handleAddOption}>
                            Add New Option
                          </button>
                        )}

                        <label>Select Correct Option:</label>
                        <select
                          name='correct'
                          value={questionData.correct}
                          onChange={handleInputChange}
                        >
                          <option value='' defaultChecked disabled>
                            Choose correct option
                          </option>
                          {questionData.options.map((option, index) => (
                            <option key={index} value={option}>
                              {questionData.options[index]}
                            </option>
                          ))}
                        </select>

                        <button type='submit' onClick={(e) => {
                          e.preventDefault();
                          handleSubmit();
                        }}>Submit</button>
                      </form>
                    </div>
                  </div>
                )}

                {showExistingQuestion && (
                  
                  <div className='modal'>
                    <div className='modal-content'>
                      <span className='close' onClick={handleExistingQuestionClose}>&times;</span>
                      <form className='modal-inputs'>
                        <label>Select Topic:</label>
                        <select
                          name='topic'
                          value={topic}
                          onChange={(e)=>{setTopic(e.target.value)
                          setSubtopic('')}}
                        >
                            {selectClass.topics.map((topic, index) => (
                            <option key={index} value={topic.name}>
                              {topic.name}
                            </option>
                          ))}
                        </select>
                        {topic && (
                          <>
                          <label>Select Subtopic:</label>
                          <select
                            name='subTopic'
                            value={subTopic}
                            onChange={(e)=>{setSubtopic(e.target.value)}}
                          >
                            <option defaultChecked value={""}>Select SubTopic</option>
                            {topic &&
                              selectClass.topics
                                .find((t) => t.name === topic)
                                .subTopics.map((st, index) => (
                                  <option key={index} value={st} >
                                    {st}
                                  </option>
                                ))}
                          </select>
                          </>
                        )}
                        <label>Existing Questions :</label>

                        <table>
                          <thead>
                            <tr>
                              <td>no.</td>
                              <td>statement</td>
                              <td>Correct Option</td>
                              <td>Action</td>
                            </tr>
                          </thead>
                          <tbody>
                            {questionList.map((question,index)=>(
                              <tr key={question._id}>
                                <td>{index+1}</td>
                                <td>{question.statement}</td>
                                <td>{question.correct}</td>
                                <td><button onClick={(e)=>{
                                  e.preventDefault()
                                  setQuestionStats([...questionStats, question])
                                  }}>add</button></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        
                        <button type='submit' onClick={(e) => {
                          e.preventDefault();
                          handleSubmit();
                        }}>Submit</button>
                      </form>
                    </div>
                  </div>
                  
                )}
                <button className='button-options' type='submit' onClick={(e) => {
                  e.preventDefault();
                  handleDone();
                }}>Done</button>
              </div>
            </td>
            <td>
              <div className="quiz-section">
                <h1>Quiz</h1>
                {instructor && <p>Created by : {instructor.name}</p>}
                <p>Class : {selectClass.courseName}</p>
                <p>section : {selectClass.section}</p>
                <p>course : {selectClass.course}</p>
                <table>
                  <thead>
                    <tr>
                      <th>Sr.</th>
                      <th>Statement</th>
                      <th>Correct answer</th>
                      <th>Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questionStats && questionStats.map((question, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{question.statement}</td>
                        <td>{question.correct}</td>
                        <td>
                          <button onClick={() => {
                            handleDeleteQuestion(index);
                          }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CreateQuiz;
