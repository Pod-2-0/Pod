import React, { useEffect, useState } from "react";
import CategoryCard from "./components/CategoryCard.jsx";
import { useParams } from "react-router-dom"
import {
    Typography, 
    Container, 
    Grid,
    CircularProgress,
    
} from "@mui/material";

const CategoryListing = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState([])
    const [categoryChange, setCategoryChange] = useState(false);
    

    useEffect(() => {
        fetch(`/api/listing/category/${id}`)
            .then(data => data.json())
            .then(data => {
                console.log('data recieved: ', data)
                setCategory(data);
                setIsLoading(false)
                setCategoryChange(!categoryChange);
            }).catch((e) => console.log(`Error fetching category listing, ${e}`))
    },[categoryChange])

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
        if (categoryData.length === 0){
            return <Typography variant='h4' component='h2' margin={3} sx={{textAlign: "center"}}>No {id} products yet, check back soon!</Typography>
        }
        
        return (
            <div>
                <Container>
                    <Typography variant="h2" component="h1" margin={5} sx={{ textAlign: "center" }}>
                        {id.toUpperCase()} 
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