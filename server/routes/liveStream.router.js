const express = require("express");
const {
  rejectUnauthenticated,
  rejectNonAdminUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require('../modules/pool');
const router = express.Router();

// cached object for storing number of viewers and current item in stream
const omi = { currentProduct: {}, viewerCount: 0, streamID: 0 };

router.get('/active', rejectUnauthenticated, (req, res) => {
  res.send(`${omi.streamID}`);
});

// GET endpoint for fetching current product
router.get("/current-product", rejectUnauthenticated, (req, res) => {
  res.send(omi.currentProduct);
});

// PUT endpoint for streamer to update the current product
router.put(
  "/current-product/:streamID",
  rejectNonAdminUnauthenticated,
  (req, res) => {
    console.log("updating product, req.body is", req.body);
    omi.currentProduct = req.body.product;
    req.io.emit("product change", req.body.product);
    res.sendStatus(204);
  }
);

// PUT endpoint for ending the stream
router.put(
  "/start-stream/:streamID",
  rejectNonAdminUnauthenticated,
  async (req, res) => {
    omi.streamID = req.params.streamID;
    const connection = await pool.connect();
    try {
      await connection.query('BEGIN');
      const itemsQuery = `
      SELECT p.*, sp.order FROM "products" p
      JOIN "streams_products" sp ON p.id = sp.product_id
      JOIN "streams" s ON s.id = sp.stream_id
      WHERE s.id = $1 ORDER BY sp.order ASC;`
      const itemRes = await connection.query(itemsQuery, [omi.streamID]);
      omi.currentProduct = itemRes.rows[0];
      const productIds = [];
      for (let item of itemRes.rows) {
        productIds.push(item.id);
      }
      const setPublicQuery = `
      UPDATE products
      SET public = TRUE
      WHERE id = ANY ($1);`
      await connection.query(setPublicQuery, [productIds]);
      await connection.query('COMMIT');
      // console.log(omi);
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      await connection.query('ROLLBACK');
      res.sendStatus(500);
    } finally {
      connection.release();
    }
  }
);

router.put(
  "/end-stream/:streamID",
  rejectNonAdminUnauthenticated,
  (req, res) => {
    console.log("emitting end stream for stream", req.params.streamID);
    req.io.emit("end-stream");
    omi.currentProduct = {};
    omi.streamID = 0;
    omi.viewerCount = 0;
    res.sendStatus(204);
  }
);

module.exports = router;
