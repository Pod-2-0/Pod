import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../common/Footer';
import Header from '../../common/Header';
import Home from '../Home/Home';
import Login from '../SignInUp/Login';
import SignUp from '../SignInUp/SignUp';
import AllListings from '../AllListings/AllListings.jsx';
import Cart from '../Cart/Cart.jsx';
import ProfilePage from '../ProfilePage.jsx'; // added import for ProfilePage -BM

const Pages = () => {
  const Page = () => {
    return (
      <PageContainer>
        <Header />
        <Outlet />
        <Footer />
      </PageContainer>
    );
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Page />}>
            <Route path='' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/listing' element={<AllListings />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

const PageContainer = styled.div`
  background-color: #f0f0f0;
`;

export default Pages;
