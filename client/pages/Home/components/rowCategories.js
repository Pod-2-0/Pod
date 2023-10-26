import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";

//Actions:

function RowCategories() {
    const { categories } = useSelector((state) => state.home);
    
    let categoriesCopy = categories.slice(0, categories.length - 1);
    for (let i = 0; i < categoriesCopy.length; i++) {
        // capitalizes the first letter of every category
        categoriesCopy[i] = categoriesCopy[i][0].toUpperCase() + categoriesCopy[i].slice(1, categoriesCopy[i].length);
    }
    const row = categoriesCopy.map((el,i) => <CategoryCard key={i} categoryName={categories[i]} categoryNameDisplay={categoriesCopy[i]}/>);

    return ( 
        <MainWrapper>
            <RowHeader>Categories:</RowHeader>
            <RowWrapper>
                {row}
            </RowWrapper>
        </MainWrapper>
    );
};

function CategoryCard({ categoryName, categoryNameDisplay }) {

    return (
        <CategoryLink 
            to={`/category/${categoryName}`}
        >
            <h1>{categoryNameDisplay}</h1>
        </CategoryLink>
    );
};

const MainWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const RowWrapper = styled.div`
display: flex;
flex-direction: row;
max-width: 75%;
padding: 0.5rem 0.5rem;
`;

const RowHeader = styled.h2`
margin-bottom: 10px;
`;

const CategoryLink = styled(NavLink)`
height: 140px;
width: 210px;

display: flex;
flex-direction: row;
align-items: center;
justify-content: center;

border: 1px;
border-style: solid;
border-color: #787878; 

color: #000000;

text-decoration: none; 
`;

export default RowCategories;