import React from "react";
import styled from "styled-components";
import { BiCart } from "react-icons/bi";
// import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel'
import "./Cart.css"

const CartItem = ({ item, setQuantity, handleRemove }) => {
    const quantityDrop = [];
    for (let i = 1; i < 10; i++) {
        quantityDrop.push(<MenuItem value={i}>{i}</MenuItem>);
    }
    // change to item.image when s3 bucket is functional
    // const image = item.image;
    let image = "https://hips.hearstapps.com/hmg-prod/images/christmas-living-room-ideas-chandoscollective-credit-julie-soefer-64c2c6cf6ed82.jpg?crop=0.655xw:1.00xh;0.345xw,0&resize=1200:*"
    return (
        <Box marginY={2}>
            <Grid container columnSpacing={5}>
                <Grid item xs={3}>
                    <img className="cartItemImage" src={image}></img>
                </Grid>
                <Grid item xs={5}>
                    <Typography component="h2" variant="h5">
                        <Box fontWeight='fontWeightBold' textTransform='uppercase'>
                            {item.product_name}
                        </Box>
                    </Typography>
                    <Typography component="h3" variant="subtitle1"> by {item.seller_name} </Typography>
                </Grid>
                <Grid item xs={2}>
                    <FormControl>
                        <InputLabel id="cart-item-qty-select-label">Qty</InputLabel>
                        <Select
                            labelId="cart-item-qty-select-label"
                            id="cart-item-qty-select"
                            value={item.quantity}
                            label="Qty"
                            onChange={(e) => setQuantity(item._id, e.target.value)}
                        >
                            {quantityDrop}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Box display="flex" flexDirection="column" alignItems="flex-end">
                        <Typography component="h2" variant="h5">
                            <Box fontWeight='fontWeightBold' textTransform='uppercase'>
                                $ {item.price * item.quantity}
                            </Box>
                        </Typography>
                        <Button
                            variant="text"
                            sx={{ minHeight: 0, minWidth: 0, padding: 0 }}
                            onClick={() => handleRemove(item._id)}
                        >
                            Remove
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};



const Display = styled.div`
gap: 1rem;
margin-top: 0.5rem;
`
const Container = styled.div`
color: white;
width : 90%;
height : 7rem;
display : grid;
margin: auto;
background-color : grey;
grid-template-columns :  2fr 1fr;

.Buttons {
    display: flex;
    flex-direction: column;
    
    button {
        height: 50%;
    }
}
`;
const CartContainer = styled.div`
margin-top: 1.5rem;
display: grid;
grid-template-columns : 2fr 1fr;
text-align: center;
width: 100%;

 
`

const Checkout = styled.div`
margin-top: 2.5rem;
background-color : white;
display: flex;
flex-direction: column;
align-items: center;

button {
    color: white;
   font-size: 1rem;
   text-align: center;
    width : 80%;
    height: 2rem;
    background-color: #2E97A7;
}

`
export default CartItem;