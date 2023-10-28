const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.getDiscountedListings,
    (req, res) => res.status(200).json(res.locals)
);

module.exports = router;