const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const PORT = 3000;
const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const authController = require('./controllers/authController')
const localAuthUser = require('./config/localAuthUser')
const googleAuthUser = require('./config/googleAuthUser')

// Passport
const passport = require('passport');
const pool = require("./db/models");
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy;
app.use(session({
  //store 'secret' in .env file later
  secret: "secret",
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize()) // init passport on every route call
app.use(passport.session()) // allow passport to use "express-session"
//Use localStrategy
passport.use(new LocalStrategy(localAuthUser))
//Use "GoogleStrategy" as the Authentication Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/auth/google/callback",
  passReqToCallback: true
}, googleAuthUser));
//serialize and deserialize the authenticated user
passport.serializeUser((userObj, done) => {
  console.log(userObj)
  done(null, userObj)
})
passport.deserializeUser((userObj, done) => {
  if (userObj.provider) {
    async function getID() {
      const client = await pool.connect().catch((err) => console.log('DB - connection failed'))
      try {
        const query = 'SELECT _id FROM users WHERE email=$1;'
        const result = await client.query(query, [userObj.email]);
        client.release();
        done(null, result.rows[0]._id)
      }
      catch (e) {
        client.release();
        console.log(e)
      }
    }
    getID()
  }
  else {
    done(null, userObj.id)
  }
})
//send succesful or failure response to user after local/oauth authentication attempt
app.get('/success', (req, res) => {
  res.status(200).send('/success');
})
app.get('/failure', (req, res) => {
  res.status(400).send('failure')
})

//post routes for local and oauth login attempts from front end
app.post("/api/login", authController.checkLoggedIn, passport.authenticate('local', { failureRedirect: '/failure' }),
  function (req, res) {
    req.session.user = req.user;
    res.redirect('/success')
  });
//request from front-end
app.get('/api/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile']
  }));
//request from google oauth api
app.get('/api/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failure' }),
  function (req, res) {
    req.session.user = req.user;
    res.redirect('/success')
  });
//logout functionality - make get request to path below then redirect on the front end if successful
app.get('/api/logout', (req, res) => {
  req.logout(function (err) {
    if (err) { console.log(err) }
    res.sendStatus(200);
  });
})

// const authRouter = require("./routes/authRouter");
const listingRouter = require('./routes/listingRouter');
const imageRouter = require('./routes/imageRouter');
const cartRouter = require('./routes/cartRouter');
const authRouter = require('./routes/authRouter')

app.use('/', express.static(path.join(__dirname, '../dist')));

app.use("/api/listing", listingRouter);
app.use("/image", imageRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);


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
