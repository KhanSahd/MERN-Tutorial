import React from "react";
import "./login.css";

const Login = ({ login, setEmail, setPassword}) => {
  return (
    <div className="login">
      <h1>Log In</h1>
      <div className="login-form">
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => login()}>Log In</button>
      </div>
    </div>
  );
}

export default Login;
