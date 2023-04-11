const express = require("express");
const {
  rejectUnauthenticated,
  rejectNonAdminUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");
const ms = require("../media.server/media.server");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const streamKey = generateStreamKey();
  
  const queryText = `INSERT INTO "users" (username, password, stream_key)
    VALUES ($1, $2, $3) RETURNING id`;
  pool
    .query(queryText, [username, password, streamKey])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  ms.uncacheUser(req.user);
  req.logout();
  res.sendStatus(200);
});

function generateStreamKey() {
  let streamKey = '';
  for (let i = 0; i < 20; i++) {
    streamKey += (Math.random() + 1).toString(36).substring(2, 3);
  }
  return streamKey;
}

module.exports = router;
