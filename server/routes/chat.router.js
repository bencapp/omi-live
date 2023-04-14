const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

//import authentication middleware
const {
  rejectUnauthenticated,
} = require(`../modules/authentication-middleware`);

/**
 * GET route
 *                     WHERE "comments".stream_id = 1
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "comments".id, "comments".text, "comments".timestamp, "users".username FROM "comments"
                    JOIN "users" ON "users".id = "comments".user_id
                    ORDER BY "comments".timestamp ASC`;
  // const queryParams = [req.params.stream_id]
  pool
    .query(queryText)
    // queryParams)
    .then((result) => {
      // console.log("result.rows", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Get comments by id failed in server", err);
      res.sendStatus(500);
    });
});

/**
 * POST route
 */
// "stream_id",
router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("in post text, req.body is", req.body);
  const queryText = `INSERT INTO comments ("text", "timestamp", "user_id")
                       VALUES ($1, current_timestamp, $2)`;
  const queryParams = [
    // req.body.payload.stream_id,
    req.body.payload.text,
    req.body.payload.user.id,
  ];
  pool
    .query(queryText, queryParams)
    .then(() => {
      req.io.emit("add text", req.body.payload.text, req.body.payload.user.id);
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log("Failed to execute SQL query:", queryText, " : ", error);
      res.sendStatus(500);
    });
});

module.exports = router;
