const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Socket io set up
app.use(cors());
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  //specify the properties/functionality with cors
  cors: {
    origins: ["http://localhost:3000", "http://localhost:3001"],
  },
});

// assign io object to the all routers. That way, we can call the
// socket functions within express endpoints.
// middleware
app.use((req, res, next) => {
  req.io = io;
  return next();
});

// cached object for storing number of viewers and current item in stream
const omi = { currentProduct: {}, viewerCount: 0 };

io.on("connection", (socket) => {
  console.log("a user connected");

  // when a viewer joins the stream
  socket.on("join stream", (streamID) => {
    socket.join(`room-stream-${streamID}`);
    omi.viewerCount++;
    io.to(`room-stream-${streamID}`).emit(
      "update viewer count",
      omi.viewerCount
    );
  });

  // when a viewer leaves the stream
  socket.on("leave stream", (streamID) => {
    socket.leave(`room-stream-${streamID}`);
    omi.viewerCount--;
    io.to(`room-stream-${streamID}`).emit(
      "update viewer count",
      omi.viewerCount
    );
  });

  // when a streamer changes the current producdt
  socket.on("change current product", (product, streamID) => {
    console.log(
      "current product is being changed, product is",
      product,
      "streamID is",
      streamID
    );
    omi.currentProduct = product;
    io.to(`room-stream-${streamID}`).emit("product change", currentProduct);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// GET endpoint for fetching current product
app.get("/api/current-product", (req, res) => {
  res.send(omi.currentProduct);
});

app.put("/api/current-product", (req, res) => {
  console.log("receiving product change, product is");
  omi.currentProduct = req.body.product;
});

// server.listen(3001, () => {
//   console.log("SERVER IS RUNNING");
// });

// Route includes
const usersRouter = require("./routes/users.router");
const chatRouter = require("./routes/chat.router");
const productsRouter = require("./routes/products.router");
const usersProductsRouter = require("./routes/usersProducts.router");
const streamsRouter = require("./routes/streams.router");
const streamsProductsRouter = require("./routes/streamsProducts.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", usersRouter);
app.use("/api/chat", chatRouter);
app.use("/api/products", productsRouter);
app.use("/api/users-products", usersProductsRouter);
app.use("/api/streams", streamsRouter);
app.use("/api/streams-products", streamsProductsRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

// const allowedOrigins = ['http://localhost:3000'];
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

const proxyOptions = {
  target: `http://localhost:${process.env.STREAM_PORT || 5001}`,
  changeOrigin: true,
  ws: true,
  router: {
    [`http://localhost:${PORT}/live/`]: `http://localhost:${
      process.env.STREAM_PORT || 5001
    }/live/`,
  },
};
app.use("/live", createProxyMiddleware(proxyOptions));

console.log(proxyOptions.router);

/** Listen * */
server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

const nms = require("./media.server/media.server");
nms.init();
