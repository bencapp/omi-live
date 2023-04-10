const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const NodeMediaServer = require("node-media-server");
const config = require("./constants/stream_config");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const usersRouter = require("./routes/users.router");
const streamsRouter = require("./routes/streams.router");
const productsRouter = require("./routes/products.router");

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
app.use("/api/streams", streamsRouter);
app.use("/api/products", productsRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:3000"];

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
    [`http://localhost:${PORT}/live`]: `http://localhost:${
      process.env.STREAM_PORT || 5001
    }/live`,
  },
};
app.use("/live", createProxyMiddleware(proxyOptions));

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

let nms = new NodeMediaServer(config);
nms.run();
