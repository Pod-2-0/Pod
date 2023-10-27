import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/login', {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json'
      }, 
      body: JSON.stringify({
        username: username, 
        password: password
      })
    }).then(data => {
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

  const googleAuth = () => {
    fetch('/auth/google', {
      method: 'GET', 
      withCredentials: true, 
      crossorigin: true, 
      mode: 'no-cors'
    })
      .then(data => {
        if (data.status == 0) {
          navigate('/')
        }
        else {
          console.log('failed in frontend googleauth login')
          alert('Incorrect google username or password')
          navigate('/login')
        }
      }).catch(err => {
        console.log('googleAuth fetch failed')
      })
  }

  return ( 
    <div>
      <h3>Login</h3>
      <form className='login' onSubmit={handleSubmit}>
        <label>Username: </label>
        <input type="text"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <label>Password: </label>
        <input type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <button>Login</button>
      </form>
      <button onClick={googleAuth}>Sign in with Google</button>
    </div>
  );
}
 
export default Login;