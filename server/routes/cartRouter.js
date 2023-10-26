const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const stripeController = require('../controllers/stripeController');

router.get('/', cartController.getUserCart,
    (req, res) => res.status(200).json(res.locals.userCart)
);

router.post('/', cartController.addToUserCart,
    (req, res) => res.status(200).send('Added to cart')
);

router.patch('/', cartController.updateUserCart,
    (req, res) => res.status(200).send('Updated cart')
);

router.delete('/:cartId', cartController.removeCartItem,
    (req, res) => res.status(200).send('Removed from cart')
);

router.post('/checkout', cartController.getUserCart, cartController.checkout, stripeController.createCheckoutSession,
    (req, res) => res.status(200).json({transactionId: res.locals.checkout, stripeUrl: res.locals.stripeUrl})
    // (req, res) => res.redirect(303, res.locals.stripeUrl)
);

module.exports = router;