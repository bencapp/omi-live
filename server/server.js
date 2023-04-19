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
    origins: [
      `http://localhost:3000`,
      "http://localhost:3001",
      `http://localhost:${process.env.PORT}` || `http://localhost:5000`,
    ],
  },
});

// assign io object to the all routers. That way, we can call the
// socket functions within express endpoints.
// middleware
app.use((req, res, next) => {
  req.io = io;
  return next();
});

let viewers = [];

io.on("connection", (socket) => {
  // console.log("a user connected");
  let userId;
  // when a viewer joins the stream
  socket.on("join stream", (id) => {
    userId = id;
    viewers.push(userId);
    // console.log("a user joined the stream", viewers.length);
    io.emit("update viewer count", viewers.length);
  });

  // when a viewer leaves the stream
  socket.on("leave stream", () => {
    viewers = viewers.filter((viewerId) => {
      if (userId != viewerId) {
        return viewerId;
      }
    });
    // console.log("a user left the stream", viewers.length);
    io.emit("update viewer count", viewers.length);
  });

  socket.on("disconnect", () => {
    viewers = viewers.filter((viewerId) => {
      if (userId != viewerId) {
        return viewerId;
      }
    });
    io.emit("update viewer count", viewers.length);
    // console.log("user disconnected");
  });
});

// Route includes
const usersRouter = require("./routes/users.router");
const chatRouter = require("./routes/chat.router");
const productsRouter = require("./routes/products.router");
const usersProductsRouter = require("./routes/usersProducts.router");
const streamsRouter = require("./routes/streams.router");
const streamsProductsRouter = require("./routes/streamsProducts.router");
const liveStreamRouter = require("./routes/liveStream.router");

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
app.use("/api/live-stream", liveStreamRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;
const nms = require("./media.server/media.server");
nms.init(io);

// const allowedOrigins = ['http://localhost:3000'];
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5000",
];

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
