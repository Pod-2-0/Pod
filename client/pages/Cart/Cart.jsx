import React from "react";
import styled from "styled-components";
import { BiCart } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem.jsx";
import { loadCart, removeCartItem, updateCartQuantity, cartCheckout } from "../../store/cartSlice.js";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider';

//define react component to render the cart page
const Cart = () => {
    const navigate = useNavigate();
    // get cart state from redux state store
    const cartState = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    //check if we have loaded the cart items from backend
    if (cartState.loaded === false) {
        //if not, send fetch to backend to load the cart
        fetch('/api/cart')
            .then(res => res.json())
            .then(res => {
                console.log("Received cart data: ", res);
                //upon recieved response from backend, update the cart state in redux
                dispatch(loadCart(res));
            });
    }

    //define callback for changing item qty
    const setQuantity = (cartId, quantity) => {
        console.log('handle setQuantity: ', cartId, quantity);
        fetch('/api/cart', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cartId: cartId,
                quantity: quantity
            })
        })
            .then((res) => {
                console.log("Update cart quantity: ");
                //upon recieved response from backend, update the cart state in redux
                dispatch(updateCartQuantity({ cartId: cartId, quantity: quantity }));
            });

    }
    //define callback for removing an product from cart
    const handleRemove = (cartId) => {
        console.log('handle remove');
        fetch('/api/cart/' + cartId, {
            method: "DELETE"
        })
            .then((res) => {
                console.log("Remove cart data: ");
                //upon recieved response from backend, update the cart state in redux
                dispatch(removeCartItem(cartId));
            });

    }
    //define callback for checking out
    const handleCheckout = (saleTotal) => {
        fetch('/api/cart/checkout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                saleTotal: saleTotal
            })
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("checkout success, transaction id is: ", res);
                //upon recieved response from backend, update the cart state in redux
                dispatch(cartCheckout());
                window.location.replace(res.stripeUrl);
            });

    }

    // render each product in cart, store rendered html in items array
    // also calculate subTotal;
    const items = [];
    let subTotal = 0;
    for (let i = 0; i < cartState.items.length; i++) {
        subTotal = subTotal + cartState.items[i].price * cartState.items[i].quantity;
        items.push(<CartItem item={cartState.items[i]} setQuantity={setQuantity} handleRemove={handleRemove} />);
    }
    const saleTotal = Math.floor(1.1 * subTotal);

    // render the cart page
    return (

        <Container>
            <Box marginY={8}>
                <Typography variant="h4">
                    <Box fontWeight='fontWeightBold'>
                        REVIEW YOUR BAG
                    </Box>
                </Typography>
            </Box>
            <Box>
                {items}
            </Box>
            <Box>
                <Grid container columnSpacing={5}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={9}>
                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                            <Typography variant="subtitle1">Subtotal</Typography>
                            <Typography variant="subtitle1">$ {subTotal}</Typography>
                        </Box>

                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                            <Typography variant="subtitle1">Shipping</Typography>
                            <Typography variant="subtitle1">Free</Typography>
                        </Box>

                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                            <Typography variant="subtitle1">Estimated tax</Typography>
                            <Typography variant="subtitle1">$ {Math.round(0.1 * subTotal)}</Typography>
                        </Box>
                        <Box marginY={3} />
                        <Divider />
                        <Box marginY={3} />
                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                            <Typography variant="h5">
                                <Box fontWeight='fontWeightBold' textTransform='uppercase'>
                                    Total
                                </Box>
                            </Typography>
                            <Typography variant="h5">
                                <Box fontWeight='fontWeightBold' textTransform='uppercase'>
                                    $ {saleTotal}
                                </Box>
                            </Typography>
                        </Box>

                    </Grid>
                </Grid>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="flex-end" marginY={3}>
                <Button variant="contained" size="large" onClick={(e) => handleCheckout(saleTotal)}>
                    Checkout
                </Button>
            </Box>

        </Container>
    )
}

export default Cart;