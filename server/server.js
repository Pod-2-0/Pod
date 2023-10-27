const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();
const bcrypt = require("bcrypt");

const PORT = 3000;
const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());

const authController = require('./controllers/authController')

// Passport
const passport = require('passport');
const pool = require("./db/models");
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


app.use(session({
  //store 'secret' in .env file later
  secret: "secret",
  resave: false ,
  saveUninitialized: false,
}))
app.use(passport.initialize()) // init passport on every route call
app.use(passport.session()) // allow passport to use "express-session"

const authUser = async (username, password, done) => {
  const client = await pool.connect().catch((err) => console.log('DB - connection failed'));
  try {
    console.log('authUser - DB connection successful')
      const userQuery = `SELECT * FROM users WHERE username= $1`;
      const result = await client.query(userQuery, [username]);
      if (!result.rows[0]) {
        console.log('No user found!')
        client.release();
        return done(null, false);
      }
      await bcrypt.compare(password, result.rows[0].pw, (err, isMatch) => {
      if (err) {
        console.log('login bcrypt error')
        client.release();
        return done(null, false);
      }
      if (isMatch) {
        client.release();
        console.log('user/password successfully logged in')
        return done(null, {id: result.rows[0]._id, username: result.rows[0].username});
      }
      else{
        client.release();
        return done(null, false);
      }
    })
  } catch (e) {
    console.log('Error verifying user:', e)
  } 
}

const googleAuthUser = async(request, accessToken, refreshToken, profile, done) => {
  const client = await pool.connect().catch((err) => console.log('DB - connection failed')
  );
  try {
    console.log('googleAuthUser - DB connection successful')
    console.log('Google email returned:', profile.email)
    const userQuery = `SELECT * FROM users WHERE email= $1`;
    const result = await client.query(userQuery, [profile.email]);
    if (!result.rows[0]) {
      const userQuery2 = 'INSERT INTO users (username, email, first_name, last_name, google_id ) VALUES($1, $2, $3, $4, $5)';
      const result = await client.query(userQuery2, [profile.displayName, profile.email, profile.name.givenName, profile.name.familyName, profile.id])
    }
    client.release();
  } catch (e) {
    console.log('error inside googleAuthUser', e)
  }
  return done(null, profile);
}

//Use localStrategy
passport.use(new LocalStrategy (authUser))
//Use "GoogleStrategy" as the Authentication Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback   : true
}, googleAuthUser));

passport.serializeUser( (userObj, done) => {
  done(null, userObj)
})
passport.deserializeUser((userObj, done) => {
  if (userObj.provider){
    async function getID(){
      const client = await pool.connect().catch((err) => console.log('DB - connection failed'))
      try{
        const query = 'SELECT _id FROM users WHERE email=$1;'
        const result = await client.query(query, [userObj.email]);
        client.release();
        console.log('result.rows[0]._id', result.rows[0]._id)
        done(null, result.rows[0]._id)
      }
      catch(e){
        client.release();
        console.log(e)
      }
    }
    getID()
  }
  else{
    done (null, userObj.id)
  }
})

app.get('/success', (req, res) => {
  res.status(200).send('/success');
})

app.get('/failure', (req, res) => {
  res.status(400).send('failure')
})

app.post ("/login", authController.checkLoggedIn, passport.authenticate('local', {failureRedirect: '/failure'}),
  function(req, res) {
    req.session.user = req.user;
    res.redirect('/success')
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ]
}));

app.get('/auth/google/callback', passport.authenticate( 'google', {failureRedirect: '/failure'}),
function(req, res) {
  req.session.user = req.user;
  res.redirect('/success')
});

//logout functionality - make get request to path below then redirect on the front end if successful
app.get('/api/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { console.log(err) }
    res.sendStatus(200);
  });
})

//middleware to check user auth - should be used for every route
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/login")
}

// req.logOut() - add to any log out. 


// const authRouter = require("./routes/authRouter");
const listingRouter = require('./routes/listingRouter');
const imageRouter = require('./routes/imageRouter');
const cartRouter = require('./routes/cartRouter');

// app.use('/', express.static(path.join(__dirname, '../dist')));

app.use("/listing", listingRouter);
app.use("/image", imageRouter);
// app.use("/auth", authRouter);
app.use("/cart", cartRouter);

app.post("/app/auth/signup", authController.createUser, (req, res) => {
  res.status(200).json(res.locals)
})


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
