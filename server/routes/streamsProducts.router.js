const express = require("express");
const {
  rejectUnauthenticated,
  rejectNonAdminUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

// NOTE: endpoints in this router are not accepting req.body info from front end

// GET route for checking if a product has been added to a stream
router.get("/:streamID/:productID", (req, res) => {
  const queryText = `SELECT EXISTS (SELECT FROM streams_products WHERE product_id = $1 AND stream_id = $2) AS in_stream;`;
  const queryParams = [req.params.productID, req.params.streamID];
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

// POST route for adding a product to a stream
router.post("/", async (req, res) => {
  const connection = await pool.connect();

  try {
    const getNumberOfProductsQueryText = `SELECT COUNT(*) FROM streams_products WHERE stream_id = $1`;
    const getNumberOfProductsQueryParams = [req.body.streamID];
    const result = await connection.query(
      getNumberOfProductsQueryText,
      getNumberOfProductsQueryParams
    );

    const numberOfProducts = result.rows[0].count;
    console.log("number of products is", numberOfProducts);

    const queryText = `INSERT INTO streams_products ("stream_id", "product_id", "order")
                        VALUES ($1, $2, $3)`;
    const queryParams = [
      req.body.streamID,
      req.body.productID,
      numberOfProducts + 1,
    ];

    await connection.query(queryText, queryParams);
    res.sendStatus(204);
  } catch (error) {
    // await connection.query("FAILED STREAM PUT");
    console.log(`Error in streamsProducts POST: `, error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
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
