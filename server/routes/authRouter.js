const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//signup route from frontend
router.post('/signup', authController.createUser, (req, res) => {
  res.status(200).json(res.locals);
});

module.exports = router;
