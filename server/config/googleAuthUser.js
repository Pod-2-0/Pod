const pool = require("../db/models")
const bcrypt = require("bcrypt");
require("dotenv").config();

const googleAuthUser = async(request, accessToken, refreshToken, profile, done) => {
    const client = await pool.connect().catch((err) => console.log('DB - connection failed')
    );
    try {
      console.log('googleAuthUser - DB connection successful')
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

  module.exports = googleAuthUser;