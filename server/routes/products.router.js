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

/**
 * GET route for getting all products by stream id
 */
// router.get("/:streamID", (req, res) => {
//   const queryText = `SELECT * FROM "products" JOIN "streams_products" ON products.id = streams_products.product_id WHERE stream_id = $1`;
//   const queryParams = [req.params.streamID];
//   pool
//     .query(queryText, queryParams)
//     .then((response) => res.send(response.rows))
//     .catch((err) => {
//       console.log("Error executing SQL query", queryText, " : ", err);
//       res.sendStatus(500);
//     });
// });

module.exports = router;
