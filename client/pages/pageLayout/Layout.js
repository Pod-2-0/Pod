import React from "react";
import { Outlet } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link, Switch } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../common/Footer"
import Header from "../../common/Header"
import Home from "../Home/Home"
import Login from "../SignInUp/Login";
import SignUp from "../SignInUp/SignUp";
import AllListings from "../AllListings/AllListings.jsx";
import Cart from "../Cart/Cart.jsx";
import Category from "../AllListings/CategoryListings.jsx";
import Confirm from "../Confirm/Confirm.jsx";
import Navbar from "../../common/Navbar/Navbar"
import ProductDetails from "../ProductDetails/ProductDetails.jsx";


const Pages = () => {

    const Page = () => {
        return (
            <PageContainer>
                {/* <Header /> */}
                <Navbar />
                <Outlet />
                <Footer />
            </PageContainer>
        )
    }


    return (
        <>
            <Router>
                <Routes>

                    <Route path="/" element={<Page />}>
                        <Route path="" element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/listing' element={<AllListings />} />
                        <Route path='/listing/:id' element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route />
                    </Route>
                </Routes>
                <Routes>

                </Routes>
            </Router>
        </>
    )
}


const PageContainer = styled.div`
background-color: #F0F0F0;
`

export default Pages;