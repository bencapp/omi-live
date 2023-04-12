const express = require("express");
const {
  rejectUnauthenticated,
  rejectNonAdminUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

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
