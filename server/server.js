const express = require("express");
const path = require("path");
const cors = require("cors");

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

// Passport
const passport = require('passport');
const pool = require("./db/models");
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy
app.use(express.urlencoded({extended: false}))
app.use(session({
  //store 'secret' in .env file later
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
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

passport.use(new LocalStrategy (authUser))

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
