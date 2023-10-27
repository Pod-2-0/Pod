import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [state, setState] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(e) =>{
    e.preventDefault()
    fetch('/auth/signup', {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json'
      }, 
      body: JSON.stringify({
        email: email,
        firstName: firstName,
        lastName: lastName,
        username: username, 
        city: city,
        zip: zip,
        state: state,
        phoneNumber: phoneNumber,
        address: address,
        password: password,

      })
    })
    .then(data => data.json())
    .then(data => {
      console.log('data recieved from signup:', data)
      if (data.result === 'User already exists'){
        alert('User already exists!')
        navigate('/login')
      }
      if (data.result === 'Login successful'){
        alert('Signup successful!')
        navigate('/login')
      }
      else {
        console.log('failed in frontend handlesubmit - login')
        alert('Signup failure')
        navigate('/signup')
      }
    })
    .catch(err => console.log('error:', err))
  }
  console.log('test')
  return (
    <div>
      <div>
      <h3 >Signup</h3>
      <form onSubmit={handleSubmit}>
      <div className="signup">
      <label>First Name: </label>
        <input type="text"
          onChange={e => setFirstName(e.target.value)}
          value={firstName}
        />
      </div>
      <div className="signup">
      <label>Last Name: </label>
        <input type="text"
          onChange={e => setLastName(e.target.value)}
          value={lastName}
        />
      </div>
      <div className="signup">
      <label>Address: </label>
        <input type="text"
          onChange={e => setAddress(e.target.value)}
          value={address}
        />
      </div>
      <div className="signup">
      <label>City: </label>
        <input type="text"
          onChange={e => setCity(e.target.value)}
          value={city}
        />
      </div>
      <div className="signup">
      <label>State: </label>
        <input type="text"
          onChange={e => setState(e.target.value)}
          value={state}
        />
      </div>
      <div className="signup">
      <label>Zipcode: </label>
        <input type="number"
          onChange={e => setZip(e.target.value)}
          value={zip}
        />
      </div>
      <div className="signup">
        <label>Phone#: </label>
          <input type="number"
            onChange={e => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
      </div>
      <div className="signup">
      <label>Email: </label>
        <input type="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="signup">
      <label>Username: </label>
        <input type="text"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div className="signup">
      <label>Password: </label>
        <input type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
      </div>
        <button onClick={handleSubmit} className="signup">Signup</button>
      </form>
    </div>
    </div>
  );
}
 
export default SignUp;