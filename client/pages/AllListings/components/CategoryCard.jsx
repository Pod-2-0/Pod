import React, {useEffect, useState} from "react";
import {
    Typography, 
    Paper, 
    Grid,
    Button,
    Grow,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import '../AllListings.css'

const CategoryCard = ({ _id, name, price, description, img, sellerID, discount }) => {
    let navigate = useNavigate();
    const [animate, setAnimate] = useState(false)

    const productDetails = () => {
        navigate(`/app/listings/${_id}`)
    }

    useEffect(() => {
        setAnimate(true)
    }, [])
    //change pic with passed in img after route and S3 bucket is set up
    let pic = 'https://img.freepik.com/free-photo/halloween-background-with-scary-pumpkins-candles-bats-dark-forest-night_123827-25826.jpg'
    return(
        <div>
            <Grow in={animate} style={{ transformOrigin: '0 0 0' }}
          {...(animate ? { timeout: 1500 } : {})}>
            <Paper elevation={5} sx={{marginY: 5}}>
                <Grid container spacing={0}>
                    <Grid item xs={3}>
                        <img src={pic} alt='product picture' className='product-pic'/>
                    </Grid>
                    <Grid item xs={6} sx= {{marginY: 3, marginX: 3}}>
                        <Typography variant="h6" component="h6">{name.toUpperCase()}</Typography>
                        <Typography variant="body1" marginTop={1}>{description}</Typography>
                        <Typography variant="body2" marginTop={1}>${price}</Typography>
                    </Grid>
                    <Grid item xs justifyContent="center" alignItems="center" sx={{marginY: 2}}>
                        <Button variant="outlined" onChange={productDetails}>See Product Details</Button>
                    </Grid>
                </Grid>
            </Paper>
            </Grow>
        </div>
            
    )

}

export default CategoryCard;