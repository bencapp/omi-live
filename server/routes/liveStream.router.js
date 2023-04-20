const express = require("express");
const {
  rejectUnauthenticated,
  rejectNonAdminUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

// cached object for storing number of viewers and current item in stream
const omi = { currentProduct: {}, viewerCount: 0, streamID: 0 };

router.get("/active", rejectUnauthenticated, (req, res) => {
  res.send(`${omi.streamID}`);
});

// GET endpoint for fetching current product
router.get("/current-product", rejectUnauthenticated, (req, res) => {
  res.send(omi.currentProduct);
});

// GET endpoint for user to get the current stream with all the products attached
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT streams.id, streams.title, streams.description, streams.scheduled, 
                      JSON_AGG(json_build_object('id', "products".id, 'name', "products".name, 'image_url', "products".image_url, 
                      'description', "products".description, 'coupon_code', "products".coupon_code, 'coupon_expiration', 
                      "products".coupon_expiration, 'url', "products".url, 'order', "streams_products".order, 'on_user_wishlist', 
                      EXISTS (SELECT FROM users_products WHERE users_products.product_id = products.id AND users_products.user_id = $1))) AS products
                      FROM "streams" 
                      LEFT JOIN "streams_products" ON streams.id = streams_products.stream_id 
                      LEFT JOIN products ON streams_products.product_id = products.id 
                      WHERE streams.id = $2
                      GROUP BY streams.id;`;
  const queryParams = [req.user.id, omi.streamID];
  pool
    .query(queryText, queryParams)
    .then((result) => {
      // console.log("got stream info, result.rows is", result.rows);
      let stream = result.rows[0];
      stream = { ...stream, currentProduct: omi.currentProduct };
      res.send(stream);
    })
    .catch((err) => {
      console.log("Error executing SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

// PUT endpoint for streamer to update the current product
router.put(
  "/current-product/:streamID",
  rejectNonAdminUnauthenticated,
  (req, res) => {
    // console.log("updating product, req.body is", req.body);
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
      await connection.query("BEGIN");
      const itemsQuery = `
      SELECT p.*, sp.order FROM "products" p
      JOIN "streams_products" sp ON p.id = sp.product_id
      JOIN "streams" s ON s.id = sp.stream_id
      WHERE s.id = $1 ORDER BY sp.order ASC;`;
      const itemRes = await connection.query(itemsQuery, [omi.streamID]);
      omi.currentProduct = itemRes.rows[0];
      const productIds = [];
      for (let item of itemRes.rows) {
        productIds.push(item.id);
      }
      const setPublicQuery = `
      UPDATE products
      SET public = TRUE
      WHERE id = ANY ($1);`;
      await connection.query(setPublicQuery, [productIds]);
      await connection.query("COMMIT");
      // console.log(omi);
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      await connection.query("ROLLBACK");
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
    req.io.emit("stream_closed", req.user.username);
    omi.currentProduct = {};
    omi.streamID = 0;
    omi.viewerCount = 0;
    res.sendStatus(204);
  }
);

module.exports = router;
