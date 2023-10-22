import React from "react";
import styled from "styled-components";
import { BiCart } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import CartItem from "./CartItem.jsx";


//define react component to render the cart page
const Cart = () => {

    // get cart state from redux state store
    const cartState = useSelector((state) => state.cart)
    //check if we have loaded the cart items from backend
    if (cartState.loaded === false) {
        //if not, send fetch to backend to load the cart
        fetch('/cart')
            .then(res => res.json())
            .then(res => {
                console.log("Received submission data: ", res);
                //upon recieved response from backend, update the cart state in redux
                dispatch(loadCart({
                    items: res.items,
                }));
            });
    }

    //define callback for changing item qty
    const setQuantity = () => {

    }
    //define callback for removing an product from cart
    const handleRemove = () => {

    }
    //define callback for checking out
    const handleCheckout = () => {

    }

    // render each product in cart, store rendered html in items array
    // also calculate subTotal;
    const items = [];
    let subTotal = 0;
    for (let i = 0; i < cartState.items.length; i++) {
        subTotal = subTotal + cartState.items[i].price * cartState.items[i].quantity;
        items.push(<CartItem item={cartState.items[i]} setQuantity={setQuantity} handleRemove={handleRemove} />);
    }

    // render the cart page
    return (

        <CartContainer>
            <label className="cartTitle"> REVIEW YOUR BAG</label>
            <div className="cartItemList">
                {items}
            </div>
            <div className="cartPriceSummary">
                <div className="cartPriceSub">
                    <label>Subtotal</label>
                    <label>{subTotal}</label>
                </div>

                <div className="cartPriceSub">
                    <label>Shipping</label>
                    <label>Free</label>
                </div>

                <div className="cartPriceSub">
                    <label>Estimated tax</label>
                    <label>{0.1 * subTotal}</label>
                </div>

                <div className="cartPriceTotal">
                    <label>Total</label>
                    <label>{1.1 * subTotal}</label>
                </div>
            </div>
            <button className="cartCheckout" onClick={handleCheckout}> Checkout</button>

        </CartContainer>
    )
}


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
export default Cart;