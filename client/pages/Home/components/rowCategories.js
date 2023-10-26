import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';

//Actions:

function RowCategories() {
    const { categories } = useSelector((state) => state.home);
    
    let categoriesCopy = categories.slice(0, categories.length - 1);
    for (let i = 0; i < categoriesCopy.length; i++) {
        // capitalizes the first letter of every category
        categoriesCopy[i] = categoriesCopy[i][0].toUpperCase() + categoriesCopy[i].slice(1, categoriesCopy[i].length);
    }
    const row = categoriesCopy.map((el,i) => <CategoryCard key={i} categoryName={categoriesCopy[i]}/>);

    return ( 
        <MainWrapper>
            <RowHeader>Categories:</RowHeader>
            <RowWrapper>
                {row}
            </RowWrapper>
        </MainWrapper>
    );
};

function CategoryCard({ categoryName }) {
    return (
            <h3>{categoryName}</h3>
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
gap: 1rem; 
padding: 0.5rem 0.5rem;
`;

const RowHeader = styled.h2`
margin-bottom: 10px;
`;

export default RowCategories;