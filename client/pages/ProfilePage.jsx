import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography, TextField, Button } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import ListingTable from './ListingTable.jsx';

const createdListing = [
  {
    _id: 1,
    product_name: 'Fancy Pumpkin',
    price: 100,
    quantity: 200,
    category: 'Food',
    product_description: 'These are fancy delicious pumpkins.',
    image: 'pumpkin.jpg',
    seller_id: 2,
    discount_id: 1,
  },
  {
    _id: 2,
    product_name: 'Halloween Decorations',
    price: 30,
    quantity: 500,
    category: 'Decoration',
    product_description: 'Decorate your home for Halloween.',
    image: 'decorations.jpg',
    seller_id: 2,
    discount_id: 1,
  },
  {
    _id: 3,
    product_name: 'Christmas Tree',
    price: 599,
    quantity: 100,
    category: 'Decoration',
    product_description: 'A beautiful 6ft Christmas tree with 2000 LED bulbs.',
    image: 'christmastree.jpg',
    seller_id: 2,
    discount_id: 1,
  },
];

const testListing = {
  _id: 4,
  product_name: 'New Listing',
  price: 50,
  quantity: 10,
  category: 'Test',
  product_description: 'This is a test listing.',
  image: 'test.jpg',
  seller_id: 1,
  discount_id: 1,
};

const testUser = {
  id: 1,
  username: 'testUser',
  email: 'testUser@gmail.com',
  password: 'testpassword',
};

const Profile = () => {
  const [username, setUsername] = useState('testUser');
  const [email, setEmail] = useState('testUser@gmail.com');
  const [password, setPassword] = useState('testpassword');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [listings, setListings] = useState([]);

  // useEffect(() => {
  //   fetch('api/listing')
  //     .then((response) => response.json())
  //     .then((data) => setListings(data))
  //     .catch((error) =>
  //       console.error('Error fetching the listings in DB:', error)
  //     );
  // }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const updatedUser = {
      username,
      email,
      password,
    };

    console.log('Updated User Data:', updatedUser); // does work - displays updated data

    try {
      const res = await fetch(`/api/auth/${testUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (res.status === 200) {
        alert('Profile updated successfully');
      } else {
        alert('Profile update failed');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' align='left' paragraph>
        Your Profile
      </Typography>

      <Grid container spacing={10}>
        <Grid item xs={12}>
          <form onSubmit={submitHandler}>
            <TextField
              label='Username'
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin='normal'
            />
            <TextField
              label='Email'
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin='normal'
            />
            <TextField
              label='Password'
              type='password'
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin='normal'
            />
            <TextField
              label='Confirm Password'
              type='password'
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin='normal'
            />
            <Button type='submit' variant='contained' color='primary' fullWidth>
              Update
            </Button>
          </form>
        </Grid>
      </Grid>

      <Typography variant='h4' paragraph>
        Your Listings
      </Typography>

      <Container>
        <ListingTable listings={[...createdListing, testListing]} />
      </Container>
    </Container>
  );
};

export default Profile;
