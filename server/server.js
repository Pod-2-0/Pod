const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require('cookie-parser')
require("dotenv").config();

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(cookieParser());

const authController = require('./controllers/authController')

// Passport
const passport = require('passport');
const session = require('express-session');

app.use(session({
  //store 'secret' in .env file later
  secret: "secret",
  resave: false ,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 1000 * 60 * 10
  }
}))
app.use(passport.initialize()) // init passport on every route call
app.use(passport.session()) // allow passport to use "express-session"

require('../server/config/passport.js')(passport);

//post routes for local and oauth login attempts from front end
app.post ("/api/login", passport.authenticate('local', {failureMessage: 'User was not found'}),
  function(req, res) {
    req.session.user = req.user;

    return res.status(200).json(req.user)
});

//request from front-end
app.get('/api/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ]}), (req,res) => {
    return res.sendStatus(200)
});


//logout functionality - make get request to path below then redirect on the front end if successful
app.get('/api/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { console.log(err) }
    res.sendStatus(200);
  });
})

const listingRouter = require('./routes/listingRouter');
const imageRouter = require('./routes/imageRouter');
const cartRouter = require('./routes/cartRouter');
const authRouter = require('./routes/authRouter');
const confirmRouter = require('./routes/confirmRouter');
const homeRouter = require('./routes/homeRouter');

app.use("/api/listing", listingRouter);
app.use("/image", imageRouter);
app.use("/api/profile", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/confirm", confirmRouter);
app.use("/api/home", homeRouter);

app.use('/', express.static(path.join(__dirname, '../dist')));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
