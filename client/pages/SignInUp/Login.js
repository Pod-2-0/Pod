import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/login', {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json'
      }, 
      body: JSON.stringify({
        username: email, 
        password: password
      })
    }).then(data => {
      console.log(data)
      if (data.status == 200) {
        navigate('/')
      }
      else {
        console.log('failed in frontend handlesubmit - login')
        alert('Incorrect username or password')
        navigate('/login')
      }
    })
    .catch(err => console.log('error:', err))
  }

  return ( 
    <div>
      <h3>Login</h3>
      <form className='login' onSubmit={handleSubmit}>
        <label>Email/ Username: </label>
        <input type="text"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <label>Password: </label>
        <input type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
 
export default Login;