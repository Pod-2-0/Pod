import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";

//Actions:

function FeatureDisplay() {
    // const { categories } = useSelector((state) => state.home);

    const imgPlaceholder = "https://static.vecteezy.com/system/resources/previews/007/819/945/non_2x/happy-halloween-sale-banner-halloween-illustration-with-halloween-pumpkins-and-halloween-elements-vector.jpg";

    return ( 
        <MainWrapper>
            {/* <RowHeader>Feature:</RowHeader> */}

            <ImageContainerLink
                to={`/category/halloween`}
            >
                <img src={imgPlaceholder}></img>
            </ImageContainerLink>
        </MainWrapper>
    );
};


const MainWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const ImageContainerLink = styled(NavLink)`
min-width: 60%;
max-width: 60%;
min-height: 400px;
max-height: 400px;

border: 2px;
border-style: solid;
border-color: black;

color: #000000;

text-decoration: none; 

box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
text-align: center;

img {
    min-width: 100%;
max-width: 100%;
min-height: 400px;
max-height: 400px;
    object-fit: fill;
}
`;

export default FeatureDisplay;