import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink, Navlist } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

//Actions:

function Navbar() {
    const { categories } = useSelector((state) => state.home);
    const dispatch = useDispatch();

    let categoriesCopy = categories.slice(0, categories.length - 1);
    for (let i = 0; i < categoriesCopy.length; i++) {
        // capitalizes the first letter of every category
        categoriesCopy[i] = categoriesCopy[i][0].toUpperCase() + categoriesCopy[i].slice(1, categoriesCopy[i].length);
    };

    const row = categoriesCopy.map((el,i) => <Category key={i} categoryName={categories[i]} categoryNameDisplay={categoriesCopy[i]}/>);

    function handleSubmit(e) {
        e.preventDefault();
        console.log('FROM HANDLE SUBMIT');
    }

    return ( 
        <>
            <NavbarWrapper>
                <LogoLink>LOGO</LogoLink>
                
                <SearchContentContainer onSubmit={handleSubmit}>

                    <SearchContentWrapper>
                        <SearchInput 
                            placeholder='Search...'
                            // onChangeText={value => dispatch(odo(value))}
                        >
                        </SearchInput>
                        <SearchBtn type='submit'>SUBMIT</SearchBtn>
                    </SearchContentWrapper>

                </SearchContentContainer>

                <ProfileLink>PROFILE</ProfileLink>
                <CartLink>CART</CartLink>
            </NavbarWrapper>

            <CategoriesWrapper>
                {row}
            </CategoriesWrapper>
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
// align-items: center;
// justify-content: center;
min-width: 100%;
max-width: 100%;
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
min-width: 90%;
min-height: 40px;
max-height: 40px;
`;

const SearchBtn = styled.button`
position: absolute;
min-width: 10%;
min-height: 46px;
max-height: 50px;
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
// text-decoration: none; 
`;

export default Navbar;