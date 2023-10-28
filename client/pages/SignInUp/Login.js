import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material'
import { Google } from "@mui/icons-material";
import { useSelector, useDispatch } from 'react-redux';

//Actions:
import { signedInSwitch } from "../../store/homeSlice";

const Login = () => {
  const { signedIn } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        username: data.get('username'),
        password: data.get('password')
      })
    }).then(data => {
      console.log('data recieved from local auth: ', data)
      if (data.status == 200) {
        dispatch(signedInSwitch(!signedIn));
        navigate('/')
      }
      else {
        console.log('incorrect user or password - login')
        alert('Incorrect username or password')
        navigate('/login')
      }
    })
      .catch(err => console.log('error:', err))
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h2" component="h3" marginTop={5} sx={{ textAlign: "center" }}>
        Welcome back!
      </Typography>
      <Typography variant="h6" component="h4" marginTop={1} sx={{ textAlign: "center" }}>
        Don't have an account? <Link href="/signup">Sign up</Link>
      </Typography>
      <Box sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItem: 'center'
      }}>
        <Button href='/api/google' variant="outlined" startIcon={<Google />}>Sign in with Google</Button>
      </Box>
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography>
          Or continue with your username
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            name="password"
            autoComplete="enter-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;

{/* <div>
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
      <a href='/api/google'>Sign in with Google</a>
    </div>  */}

    // const googleAuth = () => {
    //   fetch('/api/google', {
    //     method: 'GET',
    //     withCredentials: true,
    //     crossorigin: true,
    //     mode: 'no-cors'
    //     })
    //     .then(data => {
    //       console.log('data recieved from google auth: ', data)
    //       if (data.status == 0) {
    //         navigate('/')
    //       }
    //       else {
    //         console.log('google login failed')
    //         alert('google login failed')
    //         navigate('/login')
    //       }
    //     }).catch(err => {
    //       console.log('googleAuth fetch failed')
    //     })
    // }