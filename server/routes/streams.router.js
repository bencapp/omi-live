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
      const selectStreamQueryText = `SELECT * FROM "streams" WHERE id = currval('streams_id_seq')`;
      pool.query(selectStreamQueryText).then((result) => {
        res.send(result.rows[0]);
      });
    })
    .catch((err) => {
      console.log("Error executing SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

// PUT route for updating the title, description, and date of the stream
router.put("/:id", (req, res) => {
  const queryText = `UPDATE "streams" SET title = $1, description = $2, scheduled = $3 WHERE id = $4 `;
  const queryParams = [
    req.body.title,
    req.body.description,
    req.body.scheduled,
    req.params.id,
  ];
  console.log(queryParams);

  pool
    .query(queryText, queryParams)
    .then(() => {
      const selectStreamQueryText = `SELECT * FROM "streams" WHERE id = $1`;
      const selectStreamQueryParams = [req.params.id];
      pool
        .query(selectStreamQueryText, selectStreamQueryParams)
        .then((result) => {
          res.send(result.rows[0]);
        });
    })
    .catch((err) => {
      console.log("Error executing SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

module.exports = router;
