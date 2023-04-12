const express = require("express");
const {
  rejectUnauthenticated,
  rejectNonAdminUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

// NOTE: endpoints in this router are not accepting req.body info from front end

// GET route for checking if a product has been added to a stream
router.get("/", (req, res) => {
  console.log("receiving GET, req.body is", req.body);
  const queryText = `SELECT EXISTS (SELECT FROM streams_products WHERE product_id = $1 AND stream_id = $2) AS in_stream;`;
  const queryParams = [req.body.productID, req.body.streamID];
  console.log("queryParams is", queryParams);
  pool
    .query(queryText, queryParams)
    .then((result) => {
      console.log("checked if in stream, result.rows is", result.rows);
      res.send(result.rows[0].in_stream);
    })
    .catch((err) => {
      console.log("Error executing SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});
/**
 * DELETE route for removing product from a stream
 */
router.delete("/:streamID/:productID", (req, res) => {
  console.log("in delete product from stream, req.params is", req.params);
  const queryText = `DELETE FROM streams_products WHERE stream_id = $1 AND product_id = $2`;
  const queryParams = [req.params.streamID, req.params.productID];
  pool
    .query(queryText, queryParams)
    .then((result) => res.sendStatus(204))
    .catch((err) => {
      console.log("Error executing SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

module.exports = router;
