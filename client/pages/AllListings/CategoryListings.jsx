import React, { useEffect, useState } from "react";
import CategoryCard from "./components/CategoryCard.jsx";
import {
    Typography, 
    Container, 
    Grid,
    CircularProgress,
} from "@mui/material";

const CategoryListing = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/listing/category/decoration`)
            .then(data => data.json())
            .then(data => {
                console.log('data recieved:', data)
                setCategory(data);
                setIsLoading(false)
            }).catch((e) => console.log(`Error fetching category listing, ${e}`))
    },[])

    if (isLoading){
        return (
            <div>
                <Container>
                    <Grid display="flex" alignItems="center" justifyContent="center">
                        <CircularProgress/>
                    </Grid>
                </Container>
            </div>
        )
    }
    else{
        const categoryData = category.map(item => {
            return <CategoryCard key={item._id} name={item.product_name} price={item.price} description={item.product_description} img={item.image} sellerID={item.seller_id} discount={item.discount_id} />
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