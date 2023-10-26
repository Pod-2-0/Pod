import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink, Navlist } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

//Actions:

function Navbar() {
    // const { categories } = useSelector((state) => state.home);

    // let categoriesCopy = categories.slice(0, categories.length - 1);
    // for (let i = 0; i < categoriesCopy.length; i++) {
    //     // capitalizes the first letter of every category
    //     categoriesCopy[i] = categoriesCopy[i][0].toUpperCase() + categoriesCopy[i].slice(1, categoriesCopy[i].length);
    // }

    
    // const rowCategoryLinks = categoriesCopy.map((el,i) => <CategoryCard key={i} categoryName={categoriesCopy[i]}/>);

    return ( 
        <NavbarWrapper>
            <LogoLink>LOGO</LogoLink>
            <SearchInput placeholder='Search...'></SearchInput>
            <ProfileLink>PROFILE</ProfileLink>
            <CartLink>CART</CartLink>
        </NavbarWrapper>
        
    );
};


const NavbarWrapper = styled.div`
display: flex;
flex-direction: row;
// align-items: center;
// justify-content: center;
min-width: 100%%;
max-width: 100%%;
min-height: 75px;
max-height: 75px;
border: 2px;
border-style: solid;
border-color: black;
`;

const LogoLink = styled(NavLink)`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-width: 100px;
color: black;
border: 1px;
border-style: solid;
border-color: #616161;
`;

const SearchInput = styled.input`
flex-grow: 1;
`;

const ProfileLink = styled(NavLink)`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-width: 100px;
color: black;
border: 1px;
border-style: solid;
border-color: #616161;
`;

const CartLink = styled(NavLink)`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-width: 100px;
color: black;
border: 1px;
border-style: solid;
border-color: #616161;
`;

const CategoriesWrapper = styled.div`

`;

export default Navbar;