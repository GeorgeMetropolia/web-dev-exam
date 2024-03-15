import useField from '../hooks/useField';
import useSignup from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setIsAuthenticated }) => {
  const email = useField('email');
  const password = useField('password');
  const navigate = useNavigate()

  const { signup, error } = useSignup('/api/users/signup');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await signup({ email: email.value, password: password.value });
    if (!error) {
      setIsAuthenticated(Boolean(localStorage.getItem('token')));
      navigate('/');
    };
  };

  return (
    <>
      <form className="signup" onSubmit={handleFormSubmit}>
        <h3>Sign Up</h3>
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <button>Sign up</button>
      </form>
    </>
  );
};

export default Signup;
