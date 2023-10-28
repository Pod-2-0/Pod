const passport = require('passport');
const pool = require("../db/models");
const bcrypt = require("bcrypt");
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config();

module.exports = function (){
    //Use localStrategy
passport.use(new LocalStrategy (async (username, password, done) => {
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
        else if (isMatch) {
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
  }))

//serialize and deserialize the authenticated user
passport.serializeUser( (userObj, done) => {
    done(null, userObj)
  })
  passport.deserializeUser((userObj, done) => {
    if (userObj.provider){
      async function getID(){
        const client = await pool.connect().catch((err) => console.log('DB - connection failed'))
        try{
          const query = 'SELECT _id FROM users WHERE email=$1;'
          const result = await client.query(query, [userObj.emails[0].value]);
          client.release();
          return done(null, result.rows[0]._id)
        }
        catch(e){
          //client.release();
          console.log(e)
        }
      }
      getID()
    }
    else{
      return done(null, userObj.id)
    }
  })
//Use "GoogleStrategy" as the Authentication Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback: true
}, async function(request, accessToken, refreshToken, profile, done){
    const client = await pool.connect().catch((err) => console.log('DB - connection failed')
    );
    try {
      console.log('googleAuthUser - DB connection successful')
      const userQuery = `SELECT * FROM users WHERE email= $1`;
      const result = await client.query(userQuery, [profile.emails[0].value]);
      if (!result.rows[0]) {
        const userQuery2 = 'INSERT INTO users (username, email, first_name, last_name, google_id ) VALUES($1, $2, $3, $4, $5)';
        const result = await client.query(userQuery2, [profile.displayName, profile.emails[0].value, profile.name.givenName, profile.name.familyName, profile.id])
      }
      client.release();
      return done(null, profile);
    } catch (e) {
      client.release();
      console.log('error inside googleAuthUser', e)
      return done(null, profile);
    } 
  }));


}
