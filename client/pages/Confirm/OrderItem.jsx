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
import Divider from '@mui/material/Divider';

const OrderItem = ({ item }) => {

    return (
        <Box marginY={3}>
            <Grid container columnSpacing={5}>
                <Grid item xs={8}>
                    <Typography variant="h5">
                            {item.quantity} x {item.product_name}
                    </Typography>
                </Grid>
           
                <Grid item xs={4}>
                <Typography variant="h5">
                    $ {item.quantity * item.price}
                    </Typography>
                </Grid>
            </Grid>

         
        </Box>
    );
};


export default OrderItem;