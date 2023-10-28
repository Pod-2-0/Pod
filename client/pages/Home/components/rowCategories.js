import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";

//Actions:

function RowCategories() {
    const { categories } = useSelector((state) => state.home);
    const categoryURLs = [
        "https://www.bankrate.com/2020/08/01170557/How-to-save-money-on-groceries.jpeg",
        "https://wp.technologyreview.com/wp-content/uploads/2022/07/government-tech-insider.png",
        "https://www.analyticsinsight.net/wp-content/uploads/2023/02/The-virtual-experiences-taking-the-entertainment-industry-by-a-storm.jpg",
        "https://media.gq.com/photos/650d9aa873b15519c5c21ada/16:9/w_2560%2Cc_limit/best-clothing-brands-for-men.jpg",
        "https://cdn.logojoy.com/wp-content/uploads/20191023114758/AdobeStock_224061283-min.jpeg",
    ];
    
    let categoriesCopy = categories.slice(0, categories.length - 1);
    for (let i = 0; i < categoriesCopy.length; i++) {
        // capitalizes the first letter of every category
        categoriesCopy[i] = categoriesCopy[i][0].toUpperCase() + categoriesCopy[i].slice(1, categoriesCopy[i].length);
    }
    // const row = categoriesCopy.map((el,i) => <CategoryCard key={i} categoryName={categories[i]} categoryNameDisplay={categoriesCopy[i]}/>);
    const row = [];

    for (let i = 0; i < categoriesCopy.length; i++) {
        row.push(<CategoryCard key={i} categoryName={categories[i]} categoryNameDisplay={categoriesCopy[i]} image={categoryURLs[i]}/>)
    }



    return ( 
        <MainWrapper>
            <RowHeader>Categories:</RowHeader>
            <RowWrapper>
                {row}
            </RowWrapper>
        </MainWrapper>
    );
};

function CategoryCard({ categoryName, categoryNameDisplay, image }) {

    return (
        <CategoryLink 
            to={`/category/${categoryName}`}
        >
            <h1 style={{zIndex: 100}}>{categoryNameDisplay}</h1>
            <img src={image}></img>
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
// padding: 0.5rem 0.5rem;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
text-align: center;
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

border: 1.4px;
border-style: solid;
border-color: black; 

color: white;

background: black;
overflow: hidden;

text-decoration: none; 

h1 {
    position: relative;
    // -webkit-text-stroke: 1px black;
    text-shadow: -1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000;
}

img {
    position: absolute;
    height: 140px;
    width: 210px;
    object-fit: cover;
    opacity: 0.77;
}
`;

export default RowCategories;