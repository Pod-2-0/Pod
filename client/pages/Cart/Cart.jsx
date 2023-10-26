import React from "react";
import styled from "styled-components";
import { BiCart } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem.jsx";
import { loadCart, removeCartItem, updateCartQuantity, cartCheckout } from "../../store/cartSlice.js";


//define react component to render the cart page
const Cart = () => {
     const navigate = useNavigate();
    // get cart state from redux state store
    const cartState = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    //check if we have loaded the cart items from backend
    if (cartState.loaded === false) {
        //if not, send fetch to backend to load the cart
        fetch('/cart')
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
        fetch('/cart', {
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
            dispatch(updateCartQuantity({cartId: cartId, quantity: quantity}));
        });

    }
    //define callback for removing an product from cart
    const handleRemove = (cartId) => {
       console.log('handle remove');
        fetch('/cart/' + cartId, {
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
        fetch('/cart/checkout', {
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
                    <label>{saleTotal}</label>
                </div>
            </div>
            <button className="cartCheckout" onClick={(e)=>handleCheckout(saleTotal)}> Checkout</button>

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