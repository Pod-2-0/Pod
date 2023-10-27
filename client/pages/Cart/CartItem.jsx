import React from "react";
import styled from "styled-components";
import { BiCart } from "react-icons/bi";
// import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';


const CartItem = ({ item, setQuantity, handleRemove }) => {
    const quantityDrop = [];
    for (let i = 1; i < 10; i++) {
        if (i === item.quantity) {
            quantityDrop.push(<option value={i} selected>{i}</option>);
        } else {
            quantityDrop.push(<option value={i}>{i}</option>);
        }
    }
    // change to item.image when s3 bucket is functional
    // const image = item.image;
    let image = "https://hips.hearstapps.com/hmg-prod/images/christmas-living-room-ideas-chandoscollective-credit-julie-soefer-64c2c6cf6ed82.jpg?crop=0.655xw:1.00xh;0.345xw,0&resize=1200:*"
    return (
        <Paper elevation={3}>
            <div className="cartItemImage">
                <img src={image}></img>
            </div>
            <div className="cartProductInfo">
                <label className="cartProductName"> {item.product_name} </label>
                <label className="cartSellerName"> by {item.seller_name} </label>
            </div>
            <div className="cartQty">
                <select classeName="cartQtyDrop" onChange={(e)=>setQuantity(item._id, e.target.value)}>
                    {quantityDrop}
                </select>
            </div>
            <div className="cartItemSummary">
                <label className="cartItemPrice"> {item.price * item.quantity} </label>
                <button className="cartItemRemove" onClick={() => handleRemove(item._id)}> Remove </button>
            </div>

        </Paper>
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