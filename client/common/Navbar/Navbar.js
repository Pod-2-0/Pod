import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Navlist } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Dropdown from "./Dropdown";

function Navbar() {
    const { categories } = useSelector((state) => state.home);
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [dropdown, setDropdown] = useState(false);

    let categoriesCopy = categories.slice(0, categories.length - 1);
    for (let i = 0; i < categoriesCopy.length; i++) {
        // capitalizes the first letter of every category
        categoriesCopy[i] = categoriesCopy[i][0].toUpperCase() + categoriesCopy[i].slice(1, categoriesCopy[i].length);
    };

    const row = categoriesCopy.map((el,i) => <Category key={i} categoryName={categories[i]} categoryNameDisplay={categoriesCopy[i]}/>);

    // const rowTest = [];
    // for (let i = 0; i < categoriesCopy.length; i++) {
    //     if (categoriesCopy[i] === 'Profile')
    //     console.log('HELLOOOOOO')
    // }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('FROM HANDLE SUBMIT');
    }

    // let profile;

    // if (dropdown) {
    //     profile = 
    //     <>
    //     <ProfileContainer>
    //         <ProfileLink to='/profile'>
    //             <FontAwesomeIcon icon={faUser} />
    //         </ProfileLink>
    //         <Dropdown />
    //     </ProfileContainer>
    //     </>
    // }
    // else {
    //     profile = 
    //     <>
    //         <ProfileLink to='/profile'>
    //             <FontAwesomeIcon icon={faUser} />
    //         </ProfileLink>
    //     </>
    // }

    return ( 
        <>
            <NavbarWrapper>


                <LogoLink to='/'>
                    <Logo>
                        <P>P</P><O>O</O><D>D</D>
                    
                    </Logo>
                </LogoLink>
                
                <SearchContentContainer onSubmit={handleSubmit}>

                    <SearchContentWrapper>
                        <SearchInput 
                            placeholder='Search...'
                            // onChangeText={value => dispatch(odo(value))}
                        >
                        </SearchInput>
                        <SearchBtn type='submit'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </SearchBtn>
                    </SearchContentWrapper>

                </SearchContentContainer>

                <ProfileContainer
                    onMouseEnter={() => setDropdown(true)}
                    onMouseLeave={() => setDropdown(false)}
                >
                    <ProfileLink to='/profile' style={{zIndex: 100}}>
                        <FontAwesomeIcon icon={faUser} />
                    </ProfileLink>
                    {dropdown && <Dropdown />}
                </ProfileContainer>
                {/* {profile} */}

                <CartContainer>
                    
                    <CartLink to='/cart'>
                        <CartNumber style={{zIndex: 100}}>{items.length}</CartNumber>
                        <CartBadge style={{zIndex: 99}}></CartBadge>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </CartLink>
                </CartContainer>

            </NavbarWrapper>

            <CategoriesWrapper>
                {row}
            </CategoriesWrapper>

            {/* <Dropdown /> */}
        </>
        
    );
};

function Category({ categoryName, categoryNameDisplay }) {
    return (
        <p>

        <CategoryLink 
            to={`/category/${categoryName}`}
        >
            {categoryNameDisplay}
        </CategoryLink>
        </p>
    );
};


const NavbarWrapper = styled.div`
display: flex;
flex-direction: row;
position: relative;
align-items: center;
justify-content: center;

background: #c7c7c7;

min-width: 100%;
min-height: 75px;
max-height: 75px;
`;

const LogoLink = styled(NavLink)`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

min-width: 120px;
max-height: 75px;
margin-left: 2.5rem;

color: black;

text-decoration: none;
`;

const Logo = styled.h2`
font-family: 'Lilita One', cursive;
font-family: 'Lobster', cursive;
font-size: 3.4rem;
line-height: 30px;
height: 30px;
`
const P = styled.a`
color: #1cb7ce ;
text-shadow: -1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000;
`
const O = styled.a`
color: #622574;
text-shadow: -1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000;
`
const D = styled.a`
color: #ba3650;
text-shadow: -1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000;
`

const SearchContentContainer = styled.form`
position: relative;
flex-grow: 1;
`;

const SearchContentWrapper = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);

min-width: 80%;
min-height: 40px;
max-height: 40px;
`;

const SearchInput = styled.input`
position: relative;
min-width: 95%;
min-height: 40px;
max-height: 40px;
`;

const SearchBtn = styled.button`
position: absolute;
min-width: 5%;
min-height: 46px;
max-height: 50px;
font-size: 1.2em;
`;

const ProfileContainer = styled.div`
display: flex;
flex-direction: column;
`;

const ProfileLink = styled(NavLink)`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-width: 100px;
min-height: 75px;

color: black;
font-size: 2.2em;

&:hover {
    background: #858585;
    border-radius: 5px;
}
`;

const CartContainer = styled.div`
position: relative;
min-width: 100px;
min-height: 75px;
margin-right: 2.5rem;
`;

const CartNumber = styled.div`
position: absolute;
color: white;
font-size: 0.61em;
margin-bottom: 40px;
margin-left: 46px;
`;

const CartBadge = styled.div`
position: absolute;

min-height: 27px;
max-height: 27px;
min-width: 29px;
max-width: 29px;

margin-bottom: 40px;
margin-left: 45px;

background: #da2f2f;

border-radius: 10px;
`;

const CartLink = styled(NavLink)`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

min-width: 100px;
min-height: 75px;

color: black;
font-size: 2.3em;
text-decoration: none; 

&:hover {
    background: #858585;
    border-radius: 5px;
}
`;

const CategoriesWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;

min-width: 75%%;
max-width: 75%%;
min-height: 50px;
max-height: 50px;

padding-bottom: 25px;

p {
    margin-left: 40px;
    margin-right: 40px;
}
`;

const CategoryLink = styled(NavLink)`
color: #000000;
font-size: 1.15em;
`;

export default Navbar;