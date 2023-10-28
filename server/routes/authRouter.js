const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require('passport');


//signup route from frontend
router.post('/signup', authController.createUser, (req, res) => {
  res.status(200).json(res.locals);
});

router.get('/google/callback', passport.authenticate( 'google', {failureRedirect: '/signup'}),
function(req, res) {
  req.session.user = req.user;
  if (process.env.NODE_ENV === 'production') {
    return res.status(200).redirect('http://localhost:3000/');
  } else {
    return res.status(200).redirect('http://localhost:8080/');
  }
});


module.exports = router;
