import React, { useEffect, useState, useLayoutEffect } from "react";
import ListingInputsImage from "./components/ListingInputsImage.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadCart, removeCartItem, updateCartQuantity, cartCheckout } from "../../store/cartSlice.js";
import {
  Grid,
  Container,
  Box,
  Typography,
  Button,
} from "@mui/material";

export const ProductDetails = () => {
  //   const [inputs, setInputs] = useState({
  //     name: null,
  //     price: null,
  //     qty: null,
  //     category: null,
  //     sellerId: null,
  //     listingUrl: null,
  //   });

  //   function getRandomInt(max) {
  //     return Math.floor(Math.random() * max);
  //   }

  //   const randomNumber = getRandomInt(10000)

  //   const handleChange = (event) => {
  //     const name = event.target.name;
  //     const value = event.target.value;

  //     if (name === 'price' || name === 'qty' || name === 'sellerId') {
  //       setInputs({
  //         ...inputs,
  //         [name]: parseInt(value),
  //       });
  //     }
  //     else {
  //       setInputs({
  //         ...inputs,
  //         [name]: value,
  //         listingUrl: randomNumber,
  //       });
  //     }
  //   }

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     console.log('asdads', inputs);

  //     fetch('http://localhost:3000/listing/', {
  //       method: 'POST',
  //       body: JSON.stringify(inputs),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log(data)
  //         console.log('Response from backend:', inputs);
  //       })
  //       .catch(error => {
  //         console.log(inputs)
  //         console.error('Error:', error);
  //       });
  //   }



  //   return (
  //     <div>
  //       <form onSubmit={handleSubmit}>
  //         <label>Name: <input className="input" type="text" name="name" defaultValue={inputs.name || ""} onChange={handleChange} /></label>
  //         <label>Price: <input className="input" type="number" name="price" defaultValue={inputs.price || ""} onChange={handleChange} /></label>
  //         <label>Quantity: <input className="input" type="number" name="qty" defaultValue={inputs.qty || ""} onChange={handleChange} /></label>
  //         <label>Category: <input className="input" type="text" name="category" defaultValue={inputs.category || ""} onChange={handleChange} /></label>
  //         <label>Seller: <input className="input" type="text" name="sellerId" defaultValue={inputs.sellerId || ""} onChange={handleChange} /></label>
  //         <div><ListingInputsImage listingUrl={randomNumber} /></div>
  //         <input className="listingsInputs" type="submit" value="Submit" />
  //       </form>

  //     </div>
  //   )
  let navigate = useNavigate()
  let { id } = useParams();
  const dispatch = useDispatch();

  const [name, setName] = useState(null)
  const [price, setPrice] = useState()
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [image, setImage] = useState('')
  const [discountId, setDiscountId] = useState(null)
  const [description, setDescription] = useState('')
  useLayoutEffect(() => {
    fetch(`/api/listing/${id}`)
      .then(data => data.json())
      .then(data => {
        setName(data.product_name)
        setPrice(data.price)
        setTotalQuantity(data.quantity)
        setImage(data.image)
        setDiscountId(data.discount_id)
        setDescription(data.product_description)
      })

  }, [])

  function addToCart() {
    const params = {
      listingId: id,
      qty: parseInt(quantity)
    }
    console.log("params: ", params)
    fetch('/api/cart/addtocart', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then(data => data.json())
      .then(data => {
        console.log(data)
        dispatch(loadCart(data))
      })
      .then(() => {
        alert('Item added to cart!')
        navigate('/')
      })

  }
  let options = []
  for (let i = 1; i < 11; i++) {
    options.push(<option value={i}>{i}</option>)
  }

  if (name == null) {
    return (
      <p>Loading...</p>
    )
  }
  else {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '10px' }}>
        <div>
          <h2>{name}</h2>
          <h2>${price}</h2>
          <div>
            <h3>Quantity</h3>
            <select onChange={e => setQuantity(e.target.value)}>
              {options.map(option => option)}
            </select>
          </div>
          <h3>Description</h3>
          <p>{description}</p>
          <Button variant="contained" onClick={addToCart}>Add to cart</Button>
        </div>
        <Grid item xs={3} sx={{ marginRight: '10em', marginLeft: '10em' }}>
          <img style={{ width: "100%", height: "25rem" }} src={image} />
        </Grid>
        {console.log(id)}
      </div >
    )
  }

}

export default ProductDetails;