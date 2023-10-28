import React, { useEffect, useState } from "react";
import {
    Typography,
    Paper,
    Grid,
    Button,
    Grow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import '../AllListings.css'

const CategoryCard = ({ _id, name, price, description, img, sellerID, discount }) => {
    let navigate = useNavigate();
    const [animate, setAnimate] = useState(false)

    const productDetails = () => {
        navigate(`/listing/${_id}`)
    }

    useEffect(() => {
        setAnimate(true)
    }, [])
    return (
        <div>
            <Grow in={animate} style={{ transformOrigin: '0 0 0' }}
                {...(animate ? { timeout: 1000 } : {})}>
                <Paper elevation={5} sx={{ marginY: 5 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={3}>
                            <img src={img} alt='product picture' className='product-pic' />
                        </Grid>
                        <Grid item xs={6} sx={{ marginY: 3, marginX: 3 }}>
                            <Typography variant="h6" component="h6">{name.toUpperCase()}</Typography>
                            <Typography variant="body1" marginTop={1}>{description}</Typography>
                            <Typography variant="body2" marginTop={1}>${price}</Typography>
                        </Grid>
                        <Grid item xs justifyContent="center" alignItems="center" sx={{ marginY: 2 }}>
                            <Button variant="outlined" onClick={productDetails}>See Product Details</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grow>
        </div>

    )

}

export default CategoryCard;