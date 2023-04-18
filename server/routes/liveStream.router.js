const express = require("express");
const {
  rejectUnauthenticated,
  rejectNonAdminUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

// cached object for storing number of viewers and current item in stream
const omi = { currentProduct: {}, streamID: 5 };

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
  "/end-stream/:streamID",
  rejectNonAdminUnauthenticated,
  (req, res) => {
    console.log("emitting end stream for stream", req.params.streamID);
    req.io.emit("end-stream");
    res.sendStatus(204);
  }
);

module.exports = router;
