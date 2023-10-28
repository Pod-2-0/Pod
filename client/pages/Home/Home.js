import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';

//Components:
import RowDiscounts from "./components/rowDiscounts";
import RowCategories from "./components/rowCategories";
import FeatureDisplay from "./components/featureDisplay";

//Actions:
import { populateDiscounted, clearDiscounted } from "../../store/homeSlice"

const Home = () => {
    const { discountedListings } = useSelector((state) => state.home)
    const dispatch = useDispatch();
    
    useEffect(() => {
        fetch('/api/home')
            .then(res => res.json())
            .then(res => {
                // console.log("Received home page data: ", res.discountedListings);
                dispatch(clearDiscounted());
                dispatch(populateDiscounted(res.discountedListings));
            })
            .catch((err) => console.log(err));
    }, []);

    // console.log('------> discountedListings STATE: ', discountedListings);
    return (
        <>
            {/* <HomeHeader>HOME PAGE</HomeHeader> */}
            <FeatureDisplay />
            <RowDiscounts discountedListings={discountedListings} />
            <RowCategories />
        </>
    )
}

const HomeHeader = styled.h1`
display: flex;
justify-content: center;
`

// const Search = styled.div`
// display: flex;
// justify-content: center;
// margin: auto;
// margin-top: 1rem;
// border : solid 0.5px;

// width : 25rem;
// span {
//     display: flex;
//     margin-top: 0.5rem;
//     justify-content: center;
// }
// hr {
//   @include default;
//   background: rgba(#000000, 0.2);
//   height: $lg;
//   width: 0.1rem;
//   margin: 5px;
// }
// input {
//   width: 50%;
//   padding: 10px;
//   font-size: $md;
//   border : none;
// }

// button {
//     border : none;
//     background-color : white;
//     &:hover {
        
//         box-shadow: 0.5rem 0.75rem 1.5rem #bbbbbb;
//     }
// }
// .heIcon {
//   font-size: $xl-2;
// }
// }
// `

// const Table = styled.table`
// justify-content: center;
// display: flex;
// margin-top: 1.0rem;
// width : 100%;
// height : 100%;
// vertical-align: middle;

// `

// const StyledInput = styled.input`
// font-size: 1rem;
// Border: none;
// padding: 0px;
// `
// const Container = styled.div`
// display: flex;
//   justify-content: space-evenly;
//`
export default Home;