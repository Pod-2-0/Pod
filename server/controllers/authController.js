const pool = require("../db/models");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const authController = {};

authController.createUser = async (req, res, next) => {
  const {
   email,
   firstName,
   lastName,
   username,
   city,
   zip,
   state,
   phoneNumber,
   address,
   password
  } = req.body;

  const client = await pool.connect()
    .catch(err => next({
      log: `authController - pool connection failed; ERROR: ${err}`,
      message: {
        err: "Error in authController.createUser. Check server logs",
      },
    }));
  try {
    const findUser = "SELECT * FROM users WHERE email=$1"
    const result = await client.query(findUser, [email]);
    if (!result.rows[0]){
      const createUserQuery = `INSERT INTO users(username, email, pw, first_name, last_name, address, city, resident_state, zip, phone) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
    bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
      if (err) return next({
        log: `authController - bcrypt error ERROR: ${err}`,
        message: {
          err: 'Error in authController.createUser. Check server logs'
        }
      });
      client.query(createUserQuery, [
        username,
        email,
        hash,
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
        phoneNumber,
      ]);
    });
    res.locals.result = 'Login successful'
    return next();
    }
    else{
      console.log('user was found after signup')
      res.locals.result = 'User already exists'
    }
    
  } catch (err) {
    return next({
      log: `authController.createUser - querying listings from db ERROR: ${err}`,
      message: {
        err: "Error in authController.createUser. Check server logs",
      },
    });
  } finally {
    client.release();
    return next();
  }
};

authController.checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) { 
       console.log('req.isAuthenticated is true')
       return res.send('already logged in')
   }
  next()
}

authController.verifyUser = async (req, res, next) => {
  const client = await pool.connect()
    .catch((err) => next({
      log: `authController - pool connection failed; ERROR: ${err}`,
      message: {
        err: "Error in authController.createUser. Check server logs",
      },
    }));
  try {
    const { username, pw } = req.body;
    if (!username || !pw) return res.redirect('/login/?Error=missing_info');
    const userQuery = `SELECT username, pw FROM users WHERE username = $1`;
    const response = await client.query(userQuery, [ username ]);
    const pwMatch = await bcrypt.compare(pw, response.rows[0].pw);
    if (!pwMatch) res.status(401).send('Login failed, incorrect username or password');
    else {
      client.release();
      return next();
    }
  } catch (e) {
    return next({
      log: `authController.createUser - querying listings from db ERROR: ${err}`,
      message: {
        err: "Error in authController.createUser. Check server logs",
      },
    });
  }
};

module.exports = authController;
