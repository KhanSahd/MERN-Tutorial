import React from 'react'
import './register.css'

const Register = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
  
    const register = async () => {
      await fetch("http://localhost:8000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      })
        .then(alert("You have successfully registered!"))
    }

  return (
    <div className="register">
      <h1>Register</h1>
      <div className="register-form">
        <input type="text" placeholder="name" onChange={(e) => {
            setName(e.target.value)
        }} />
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
        <button onClick={() => register()}>Register</button>
      </div>
    </div>
  )
}

export default Register