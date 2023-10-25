import React from "react";
import {
    Typography, 
    Paper, 
    Grid,
    Button
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate} from "react-router-dom";
import '../AllListings.css'

const CategoryCard = ({ key, name, price, description, img, sellerID, discount }) => {
    //change pic with passed in img after route and S3 bucket is set up
    let pic = 'https://img.freepik.com/free-photo/halloween-background-with-scary-pumpkins-candles-bats-dark-forest-night_123827-25826.jpg'
    return(
            <Paper elevation={5} sx={{marginY: 5}}>
                <Grid container spacing={0}>
                    <Grid item xs={3}>
                        <img src={pic} alt='product picture' className='product-pic'/>
                    </Grid>
                    <Grid item xs={6} sx= {{margin: 3}}>
                        <Typography variant="H2" component="H2">{name}</Typography>
                        <Typography variant="body1" marginTop={1}>{description}</Typography>
                        <Typography variant="body2" marginTop={1}>${price}</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{marginY: 2, marginX: 2}}>
                        <Button>Add To Cart</Button>
                    </Grid>
                </Grid>
            </Paper>
    )

}

export default CategoryCard;