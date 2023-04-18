const express = require("express");
const {
  rejectUnauthenticated,
  rejectNonAdminUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

// cached object for storing number of viewers and current item in stream
const omi = { currentProduct: {}, viewerCount: 0 };

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
  "/end-stream/:streamID",
  rejectNonAdminUnauthenticated,
  (req, res) => {
    console.log("emitting end stream for stream", req.params.streamID);
    req.io.emit("end-stream");
    res.sendStatus(204);
  }
);

module.exports = router;
