const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const PORT = 3000;
const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

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
  const client = await pool.connect().catch((err) => console.log('DB - connection failed')
    // next({
    //   log: `authController - pool connection failed; ERROR: ${err}`,
    //   message: {
    //     err: "Error in authController.createUser. Check server logs",
    //   },
    // })
  );
  try {
    console.log('authUser - DB connection successful')
    const userQuery = `SELECT _id, username, pw FROM users WHERE username= $1 AND pw= $2`;
    const result = await client.query(userQuery, [username, password]);
    //ADD BCRYPT TO VERIFY PASSWORD RESULT - result.rows[0].pw
    if (!result.rows[0]) {
      client.release();
      console.log('Auth user not found')
      return done(null, false);
    }
    else{
      client.release();
      console.log('user/password successfully found')
      return done(null, {id: result.rows[0]._id, username: result.rows[0].username});
    }
  } catch (e) {
  } finally {
    //client.release();
  }
}
googleAuthUser = async(request, accessToken, refreshToken, profile, done) => {
  const client = await pool.connect().catch((err) => console.log('DB - connection failed')
  );
  try {
    console.log('googleAuthUser - DB connection successful')
    console.log('Google email returned:', profile.email)
    const userQuery = `SELECT * FROM users WHERE email= $1`;
    const result = await client.query(userQuery, [profile.email]);
    if (!result.rows[0]) {
      const userQuery2 = 'INSERT INTO users (username, email, pw, first_name, last_name, address, city, resident_state, zip, phone) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
      const result = await client.query(userQuery2, [profile.displayName, profile.email, '123', profile.name.givenName, profile.name.familyName, 'test', 'test', 'test', 123, 123])
    }
    client.release();
  } catch (e) {
    console.log('error inside googleAuthUser')
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
  console.log('serialize user obj:', userObj)
  done(null, userObj)
})
passport.deserializeUser((userObj, done) => {
  console.log('deseralize user')
  done (null, userObj )
})

app.get('/success', (req, res) => {
  res.status(200).send('/success');
})

app.get('/failure', (req, res) => {
  res.status(400).send('failure')
})

app.post ("/login", passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: "/failure",
}))

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ]
}));
app.get('/auth/google/callback', passport.authenticate( 'google', {
   successRedirect: '/success',
   failureRedirect: '/failure'
}));


//middleware to check user auth - should be used for every route
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/login")
}
//middleware to prevent unneccesary login/signup - should be used for signup route and login route
checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) { 
       return res.redirect("/dashboard")
   }
  next()
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

app.post("/auth/signup")


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
