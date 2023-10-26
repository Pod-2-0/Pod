import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';

//Actions:

function FeatureDisplay() {
    // const { categories } = useSelector((state) => state.home);

    return ( 
        <MainWrapper>
            {/* <RowHeader>Feature:</RowHeader> */}

            <ImageContainer>FEATURE HERE:</ImageContainer>
        </MainWrapper>
    );
};


const MainWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const RowHeader = styled.h1`
margin-bottom: 10px;
`;

const ImageContainer = styled.div`
min-width: 60%;
max-width: 60%;
min-height: 400px;
max-height: 400px;
border: 2px;
border-style: solid;
border-color: black;
`;

export default FeatureDisplay;