import React from "react";
import styled from "styled-components";
import { BiCart } from "react-icons/bi"; 
// import { useSelector } from "react-redux";


const CartItem = ({item, setQuantity, handleRemove}) => {

    return (
        <Container>
            <div className="cartItemImage">
                <img src={item.image}></img>
            </div>
            <div className="cartProductInfo">
                <label className="cartProductName"> {item.product_name} </label>
                <label className="cartSellerName"> by {item.seller_name} </label>
            </div>
            <div className="cartQty">
                <label classeName="cartQtyDrop"> {item.quantity} </label>
            </div>
            <div className="cartItemSummary">
                <label className="cartItemPrice"> {item.price * item.quantity} </label>
                <button className="cartItemRemove" onClick={handleRemove}> Remove </button>
            </div>
                
        </Container>
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