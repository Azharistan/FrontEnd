import { useEffect, useState } from 'react';
import BackButton from '../BackButton';
import Spinner from '../Spinner';
import axios from 'axios';
import { useParams } from 'react-router-dom';

    const backendUrl= import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const EditCourse = () => {
  const [course, setCourse] = useState({
    _id: '',
    name: '',
    depID: '',
    creditHr: '',
    topics: [{ name: '', subTopics: [''] }],
  });
  const [loading, setLoading] = useState(false);
  const {id} = useParams()
  useEffect (()=>{
    axios.get(`${backendUrl}/courses/${id}`)
    .then((response)=>{
      console.log(response.data)
      setCourse(response.data)
    })
  },[])

  const handleChange = (e, topicIndex, subtopicIndex) => {
    const { name, value } = e.target;
  
    if (name === 'name') {
      // Handle topic name change
      setCourse((prevCourse) => {
        const updatedTopics = [...prevCourse.topics];
        updatedTopics[topicIndex] = { ...updatedTopics[topicIndex], name: value };
        return { ...prevCourse, topics: updatedTopics };
      });
    } else if (name === 'subtopic') {
      // Handle subtopic name change
      setCourse((prevCourse) => {
        const updatedTopics = [...prevCourse.topics];
        updatedTopics[topicIndex].subTopics[subtopicIndex] = value;
        return { ...prevCourse, topics: updatedTopics };
      });
    } else if (name === 'newSubtopic') {
      // Handle new subtopic name change
      setCourse((prevCourse) => {
        const updatedTopics = [...prevCourse.topics];
        updatedTopics[topicIndex].subTopics = updatedTopics[topicIndex].subTopics.map((st, index) =>
          index === subtopicIndex ? value : st
        );
        return { ...prevCourse, topics: updatedTopics };
      });
    } else {
      // Handle other input changes
      setCourse({ ...course, [name]: value });
    }
  };
  

  // const handleAddTopic = () => {
  //   setCourse((prevCourse) => ({
  //     ...prevCourse,
  //     topics: [...prevCourse.topics, { name: '', subTopics: [''] }],
  //   }));
  // };

  const handleAddTopic = (e) => {
    e.preventDefault()
    console.log(course)
    setCourse((prevCourse) => ({
      ...prevCourse,
      topics: [...prevCourse.topics, { name: '', subTopics: [''] }],
    }));
  };

  // const handleAddSubtopic = (topicIndex) => {
  //   setCourse((prevCourse) => {
  //     const updatedTopics = [...prevCourse.topics];
  //     updatedTopics[topicIndex].subTopics.push('');
  //     return { ...prevCourse, topics: updatedTopics };
  //   });
  // };

  const handleAddSubtopic = (topicIndex) => {
    setCourse((prevCourse) => {
      const updatedTopics = [...prevCourse.topics];
      updatedTopics[topicIndex].subTopics = [...updatedTopics[topicIndex].subTopics, ''];
      return { ...prevCourse, topics: updatedTopics };
    });
  };

  const handleEditCourse = () => {
    setLoading(true);
    console.log(course)
    const topics = {
      name: ()=>{course.topics.filter((topic)=>{topic.name === ""})}
    }
    axios.put(`${backendUrl}/courses/${course._id}`, course)
  };

  return (
    <div className="Edit-ContainerSTD">
      {loading && <Spinner />}
      <div className='Edit-HeaderSTD'>
      <h1 className='Edit-TextSTD'>Edit Courses</h1>
      <div className='Edit-UnderlineSTD'></div>
      </div>
      <form className='Edit-InputsSTD'>
        
          <input className='Edit-Attributes-STD' type='text' name='_id' value={course._id} onChange={(e) => handleChange(e)} />

          <input className='Edit-Attributes-STD' type='text' name='name' value={course.name} onChange={(e) => handleChange(e)} />

          <input className='Edit-Attributes-STD' type='text' name='depID' value={course.depID} onChange={(e) => handleChange(e)} />

          <input className='Edit-Attributes-STD' type='text' name='creditHr' value={course.creditHr} onChange={(e) => handleChange(e)} />
        
          <div>
      {/* Render existing topics and subtopics */}
      {course.topics.map((topic, topicIndex) => (
        <div key={topicIndex} className='topicBox'>
        <label>Topic {topicIndex+1}</label>
          <input className='Edit-Attributes-STD'
            type="text"
            value={topic.name}
            onChange={e => {
              const value = e.target.value;
              setCourse(prevState => {
                const updatedTopics = [...prevState.topics];
                updatedTopics[topicIndex].name = value;
                return { ...prevState, topics: updatedTopics };
              });
            }}
          />
          <button className='topicButton' onClick={(e) => 
          {e.preventDefault()
          handleAddSubtopic(topicIndex)}}>Add Subtopic</button>
          {/* Render existing subtopics */}
          {topic.subTopics.map((subtopic, subtopicIndex) => (
            <div key={subtopicIndex}>
              <input className='Edit-Attributes-STD'
                type="text"
                value={subtopic}
                onChange={e => {
                  const value = e.target.value;
                  setCourse(prevState => {
                    const updatedTopics = [...prevState.topics];
                    updatedTopics[topicIndex].subTopics[subtopicIndex] = value;
                    return { ...prevState, topics: updatedTopics };
                  });
                }}
              />
            </div>
          ))}
        </div>
      ))}
      <button className='topicButton' onClick={(e)=>{
        handleAddTopic(e)}}>Add Topic</button>
    </div>

        <button className='Edit-SubmitButton' onClick={handleEditCourse}>Save</button>
      </form>
    </div>
  );
};

export default EditCourse;
