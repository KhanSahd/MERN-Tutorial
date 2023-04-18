import React from 'react'
import './register.css'
import { FaUserAlt } from 'react-icons/fa'
import { register, reset } from '../../features/auth/authSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    // const [email, setEmail] = React.useState("");
    // const [password, setPassword] = React.useState("");
    // const [name, setName] = React.useState("");
    const [formData, setFormData] = React.useState({
      email: "",
      name: "",
      password: "",
      password2: "",
    });

    const { email, password, name, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, errorMessage} = useSelector(
    (state) => state.auth);

   useEffect(() => {

      if(isError){
        toast.error(errorMessage);
      }
      if(isSuccess || user){
        navigate("/dashboard");
      }

      dispatch(reset());

    }, [user, isError, isSuccess, errorMessage, navigate, dispatch]);

    const onSubmit = (e) => {
      e.preventDefault();
      if (password !== password2) {
        toast.error("Passwords do not match");
      } else {
        const userData = {
          name,
          email,
          password
        }
        dispatch(register(userData));
      }
    };
  
    // const register = async () => {
    //   await fetch("http://localhost:8000/api/users/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, password, name }),
    //   })
    //     .then(alert("You have successfully registered!"))
    // }

    const onChange = (e) => {
      setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

  return (
    <div className="register">
      <h1><FaUserAlt /> Register</h1>
      <h2>Please create an account</h2>
      <form className="register-form">
        <input 
          id='name'
          type="text" 
          name='name'
          value={name}
          placeholder="Enter Your Name" 
          onChange={onChange} />
        <input
          id='email'
          type="text"
          name='email'
          value={email}
          placeholder="Enter Your Email"
          onChange={onChange}
        />
        <input
          id='password'
          type="password"
          name='password'
          placeholder="Enter Password"
          onChange={onChange}
        />
        <input
          id='password2'
          type="password"
          name='password2'
          placeholder="Confirm Password"
          onChange={onChange}
        />
        <button onClick={onSubmit}>Register</button>
      </form>
    </div>
  )
}

export default Register