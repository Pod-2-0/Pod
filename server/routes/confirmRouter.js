const express = require('express');
const router = express.Router();
const confirmController = require('../controllers/confirmController');


router.get('/:id', confirmController.getUserOrder,
    (req, res) => res.status(200).json(res.locals.userOrder)
);

module.exports = router;