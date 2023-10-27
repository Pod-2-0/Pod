import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography, 

} from '@mui/material'

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/api/login', {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json'
      }, 
      body: JSON.stringify({
        username: username, 
        password: password
      })
    }).then(data => {
      console.log('data recieved from local auth: ', data)
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
    fetch('/api/auth/google', {
      method: 'GET', 
      withCredentials: true, 
      crossorigin: true, 
      mode: 'no-cors'
    })
      .then(data => {
        console.log('data recieved from google auth: ', data)
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

  // <Container  component="main" maxWidth="xs">
  //       <Box
  //       sx={{
  //         marginTop: 8,
  //         display: 'flex',
  //         flexDirection: 'column',
  //         alignItems: 'center'
  //       }}
  //       >
  //         {logo}
  //         <Typography component="h1" variant="h5">
  //           Sign in
  //         </Typography>
  //         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>

  //         </Box>
  //       </Box>
  //</Container>

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