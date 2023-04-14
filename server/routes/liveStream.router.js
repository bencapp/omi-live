const express = require("express");
const {
  rejectUnauthenticated,
  rejectNonAdminUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

// cached object for storing number of viewers and current item in stream
const omi = { currentProduct: {}, viewerCount: 0 };

// io.on("connection", (socket) => {
//   console.log("a user connected");

//   // when a viewer joins the stream
//   socket.on("join stream", (streamID) => {
//     socket.join(`room-stream-${streamID}`);
//     omi.viewerCount++;
//     io.to(`room-stream-${streamID}`).emit(
//       "update viewer count",
//       omi.viewerCount
//     );
//   });

//   // when a viewer leaves the stream
//   socket.on("leave stream", (streamID) => {
//     socket.leave(`room-stream-${streamID}`);
//     omi.viewerCount--;
//     io.to(`room-stream-${streamID}`).emit(
//       "update viewer count",
//       omi.viewerCount
//     );
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

// GET endpoint for fetching current product
router.get("/current-product", rejectUnauthenticated, (req, res) => {
  res.send(omi.viewerCount);
});

// PUT endpoint for streamer to update the current product
router.post(
  "/current-product/:streamID",
  rejectNonAdminUnauthenticated,
  (req, res) => {
    omi.currentProduct = req.body.product;
    req.io
      .to(`room-stream-${req.body.streamID}`)
      .emit("product change", req.body.product);
    res.sendStatus(204);
  }
);

module.exports = router;
