const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware')
require('dotenv').config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

//Socket io set up
const cors = require("cors"); 
app.use(cors());
const http = require("http");
const server = http.createServer(app)
const {Server}  = require('socket.io');
const io = new Server(server, {
  //specify the properties/functionality with cors
  cors: {
    origins: ["http://localhost:3000", "http://localhost:3001"]
  }
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on("send_message", (data) => {
    io.emit("receive_message", data); 
  })

  

})

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
})

// Route includes
const usersRouter = require("./routes/users.router");

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

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

// const allowedOrigins = ['http://localhost:3000'];
const allowedOrigins = ['http://localhost:3000','http://localhost:3001'];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

const proxyOptions = {
  target: `http://localhost:${process.env.STREAM_PORT || 5001}`,
  changeOrigin: true,
  ws: true,
  router: {
    [`http://localhost:${PORT}/live/`]: `http://localhost:${process.env.STREAM_PORT || 5001}/live/`,
  }
}
app.use('/live', createProxyMiddleware(proxyOptions));

console.log(proxyOptions.router);

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

const nms = require('./media.server/media.server');
nms.init();