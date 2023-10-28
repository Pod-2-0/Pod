
const pool = require("../db/models")
const bcrypt = require("bcrypt");
require("dotenv").config();

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

  module.exports = authUser;