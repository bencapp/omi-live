const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM streams`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log("Error executing SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

// POST route for adding an empty stream in preparation for the user to edit it
router.post("/", (req, res) => {
  const queryText = `INSERT INTO "streams" ("title") VALUES ('New Stream')`;
  pool
    .query(queryText)
    .then(() => {
      const selectIDQueryText = `SELECT currval('streams_id_seq')`;
      pool.query(selectIDQueryText).then((result) => {
        res.send(result.rows[0].currval);
      });
    })
    .catch((err) => {
      console.log("Error executing SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

module.exports = router;
