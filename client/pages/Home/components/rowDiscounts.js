import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";

//Actions:
import { populateDiscounted, clearDiscounted } from "../../../store/homeSlice"

function RowDiscounts({ discountedListings }) {
    const row = [];
    for (let i = 0; i < discountedListings.length; i++) {
        row.push(<ListingCard key={i} listingData={discountedListings[i]}/>);
    }

    return ( 
        <MainWrapper>
            <RowHeader>Discounted Listings:</RowHeader>
            <RowWrapper>
                {row}
            </RowWrapper>
        </MainWrapper>
    );
};

function ListingCard({ listingData }) {

    const { _id, product_name, price, image } = listingData

    return (
        <ListingWrapperLink
            to={`/listing/${_id}`}
        >
            <ListingImageWrapper>
                <h2>{image}</h2>
            </ListingImageWrapper>

            <h4>{product_name}</h4>
            <p>${price}</p>
        </ListingWrapperLink>
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

const ListingWrapperLink = styled(NavLink)`
border: 1px;
border-style: solid;
border-color: #616161;

color: #000000;

text-decoration: none; 

h2 {
margin-top: 0;
margin-bottom: 0;
}
h3 {
margin-top: 0;
margin-bottom: 0;
}
p {
margin-top: 0;
margin-bottom: 0;
}
`;

const ListingImageWrapper = styled.div`
height: 140px;
width: 210px;
border: 1px;
border-style: solid;
border-color: #787878; 
`;

export default RowDiscounts;