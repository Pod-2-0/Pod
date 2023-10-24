import React, { useEffect, useState } from "react";
import CategoryCard from "./components/CategoryCard.jsx";
import {
    Typography, 
    Container, 
    Grid,
    LoadingButton
} from "@mui/material";

const CategoryListing = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState([])
    
    const getCategoryListings = async () => {
        //change final path param to passed in category - i.e ${prop.category}
        const res = await fetch(`http://localhost:3000/listing/category/decoration`)
        const data = await res.json();
        console.log('data', data)
        setCategory(data);
    }

    useEffect(() => {
        getCategoryListings();
    })

    if (isLoading){
        return (
            <div>
                <Container>
                    <Grid display="flex" alignItems="center" justifyContent="center">
                        <LoadingButton/>
                    </Grid>
                </Container>
            </div>
        )
    }
    else {
        const categoryData = category.map(item => {
            <ListingInfo key={item._id} name={item.product_name} price={item.price} description={item.product_description} img={item.image} sellerID={item.seller_id} discount={discount_id} />
        })
        
        return (
            <div>
                <Container>
                    <Typography variant="h2" component="h1" margin={5} sx={{ textAlign: "center" }}>
                        All "Insert Category"
                    </Typography>
                    <Grid>
                        {categoryData}
                    </Grid>
                </Container>
            </div>
            
            
        );
  }
}

export default CategoryListing;