const pool = require('../db/models');
require('dotenv').config({ path: './.env' });

const stripeController = {};

// followed stripe's example code in https://github.com/stripe-samples/checkout-one-time-payments, 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
});

stripeController.createCheckoutSession = async (req, res, next) => {
    const domainURL = process.env.DOMAIN;

    // create stripe product and stripe price for each cartItem
    // generate stripe lineItem array
    const cartItems = res.locals.userCart;
    const stripeLineItems = [];
    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
        const product = await stripe.products.create({
            name: cartItems[i].product_name,
        });

        const price = await stripe.prices.create({
            //stripe price unit is 0.01 usd
            unit_amount: cartItems[i].price * 100,
            currency: 'usd',
            product: product.id,

        });
        stripeLineItems.push({ price: price.id, quantity: cartItems[i].quantity });
        totalPrice += cartItems[i].price * 100 * cartItems[i].quantity;
    }

    //add tax;
    const taxProduct = await stripe.products.create({
        name: 'sale tax',
    });

    const taxPrice = await stripe.prices.create({
        unit_amount: totalPrice * 0.1,
        currency: 'usd',
        product: taxProduct.id,

    });
    stripeLineItems.push({ price: taxPrice.id, quantity: 1 });

    // followed stripe's example code in https://github.com/stripe-samples/checkout-one-time-payments, 
    // for full details see https://stripe.com/docs/api/checkout/sessions/create

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: stripeLineItems,
        success_url: `${domainURL}/confirm/` + res.locals.checkout,
        cancel_url: `${domainURL}/`,
    });
    res.locals.stripeUrl = session.url;
    return next();
};

module.exports = stripeController;