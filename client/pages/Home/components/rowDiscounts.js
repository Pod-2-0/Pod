import React from "react";

import { useSelector, useDispatch } from 'react-redux';

function RowDiscounts() {
    // grab about 5 discounted listings that have discounts
    const { discountedListings } = useSelector((state) => state.home);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     // fetch request
    //     .then( 
    //         update REDUX
    //     )

    // }, [])

    return ( 
        <h1>Discounted Listings:</h1>
    );
};

export default RowDiscounts;