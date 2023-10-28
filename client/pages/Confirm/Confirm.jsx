import React from "react";
import styled from "styled-components";
import { BiCart } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import OrderItem from "./OrderItem.jsx";
import { loadConfirm } from "../../store/confirmSlice.js";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider';
import { useParams } from "react-router-dom";
import TaskAltIcon from '@mui/icons-material/TaskAlt';


//define react component to render the confirm page
const Confirm = () => {
    const {id} = useParams();
    const confirmState = useSelector((state) => state.confirm)
    const dispatch = useDispatch();
    if (confirmState.loaded === false) {
        fetch('/api/confirm/' + id)
            .then(res => res.json())
            .then(res => {
                dispatch(loadConfirm(res));
            });
    }


    // render each product in cart, store rendered html in items array
    // also calculate subTotal;
    const items = [];
    for (let i = 0; i < confirmState.items.length; i++) {
        items.push(<OrderItem item={confirmState.items[i]} />);
    }

    // render the cart page
    return (

        <Container>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
            <Box marginY={8}>
                <TaskAltIcon />
                <Typography variant="h5">Thank you for Placing your Order with POD!</Typography>
                <Typography variant="subtitle1">Your order ID is {id}</Typography>   
            </Box>
            </Grid>
            <Grid item xs={4}></Grid>
            <Box>
                {items}
            </Box>
            <Box>
            <Grid container columnSpacing={5}>
                <Grid item xs={8}>
                    <Typography variant="h5">
                    <Box fontWeight='fontWeightBold'>
                            TOTAL (with tax)
                    </Box>
                    </Typography>
                </Grid>
           
                <Grid item xs={4}>
                <Typography variant="h5">
               
                    $ {confirmState.saleTotal}
                
                    </Typography>
                </Grid>
            </Grid>
            </Box>

        </Container>
    )
}

export default Confirm;