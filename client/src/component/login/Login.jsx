import React, { useEffect } from "react";
import "./login.css";
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from "../../features/auth/authSlice";


const Login = () => {

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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

    const userData = {
      email,
      password
    }
    dispatch(login(userData));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <div className="login">
      <h1><FaSignInAlt />Log In</h1>
      <h2>Log In and start planning your day</h2>
      <div className="login-form">
        <input
          id="email"
          name="email"
          value={email}
          type="text"
          placeholder="Enter Your Email"
          onChange={onChange}
        />
        <input
          id="password"
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={onChange}
        />
        <button onClick={onSubmit}>Log In</button>
      </div>
    </div>
  );
}

export default Login;
