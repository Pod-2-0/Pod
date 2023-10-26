import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";

//Actions:

function FeatureDisplay() {
    // const { categories } = useSelector((state) => state.home);

    return ( 
        <MainWrapper>
            {/* <RowHeader>Feature:</RowHeader> */}

            <ImageContainerLink
                to={`/category/halloween`}
            >
                FEATURE HERE:
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
`;

export default FeatureDisplay;