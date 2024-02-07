import { Link } from 'react-router-dom';
import "./style/Home.css"

const SignUp = () => {
  return (
      <div className='StuContainer'>
        <h1>Welcome to the Signup Page</h1>
        <Link to="/students/create" className="Stubutton">
            Student
        </Link>
        <Link to="/instructors/create" className="Stubutton">
            Instructor
        </Link>
      </div>
  );
}

export default SignUp;
