const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route for getting all products
 */
router.get("/", (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

// GET route for getting a single product by ID
router.get("/:productID", (req, res) => {
  const queryText = `SELECT * FROM "products" WHERE id = $1`;
  const queryParams = [req.params.productID];
  pool
    .query(queryText, queryParams)
    .then((result) => {
      console.log("got product by id, result.rows is", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error executing SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

module.exports = router;
