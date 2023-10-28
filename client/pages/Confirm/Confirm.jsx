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
    const { id } = useParams();
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
            <Grid container>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Box marginY={10}>
                            <TaskAltIcon style={{ fontSize: 200, color: "grey" }} />
                        </Box>
                        <Typography variant="h5">Your order ID is {id}</Typography>
                        <Typography variant="subtitle1" center>Thank you for Placing your Order with POD!</Typography>

                    </Box>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
            <Box marginY={10} />

            <Grid container columnSpacing={5}>
                <Grid item xs={2} />
                <Grid item xs={8} >
                    <Divider />
                </Grid>
                <Grid item xs={2} />
            </Grid>

            <Box>
                {items}
            </Box>

            <Grid container columnSpacing={5}>
                <Grid item xs={2} />
                <Grid item xs={8} >
                    <Divider />
                </Grid>
                <Grid item xs={2} />
            </Grid>
            <Box marginY={3} />

            <Box>
                <Grid container columnSpacing={5}>
                    <Grid item xs={2} />
                    <Grid item xs={6}>
                        <Typography variant="h6">
                            <Box fontWeight='fontWeightBold'>
                                TOTAL (with tax)
                            </Box>
                        </Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <Box display="flex" flexDirection="row" justifyContent="flex-end">
                            <Typography variant="h6">
                                <Box fontWeight='fontWeightBold'>
                                    $ {confirmState.saleTotal}
                                </Box>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2} />
                </Grid>
            </Box>

        </Container>
    )
}

export default Confirm;