const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT "comments".text, "comments".timestamp, "users".username FROM "comments"
                    JOIN "users" ON "users".id = "comments".user_id
                    WHERE "comments".stream_id = 1
                    ORDER BY "comments".timestamp DESC`;
    const queryParams = [req.params.stream_id]
    pool.query(queryText, queryParams)
    .then(result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('Get comments by id failed in server', err);
        res.sendStatus(500)
      })
});

/**
 * POST route
 */
router.post("/", rejectUnauthenticated, (req, res) => {
    console.log("in post text, req.body is", req.body);
    const queryText = `INSERT INTO text ("stream_id", "user_id", "text", "timestamp")
                       VALUES ($1, $2, $3, current_timestamp)`;
    const queryParams = [req.body.stream_id, req.body.user_id, req.body.text];
    pool.query(queryText, queryParams)
      .then(() => {
        req.io
          .emit("add text", req.body.text, req.body.user_id);
        res.sendStatus(204);
      })
      .catch((error) => {
        console.log("Failed to execute SQL query:", queryText, " : ", error);
        res.sendStatus(500);
      });
  });



router.post('/', (req, res) => {
    const queryText =
    `INSERT INTO comments ("user_id", "text", "timestamp")
    VALUES ($1, $2, current_timestamp)`;
    pool.query(queryText, [req.body])
});

module.exports = router;
