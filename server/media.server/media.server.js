const NodeMediaServer = require("node-media-server");
const streamConfig = require("../constants/stream_config");
const globalConfig = require("../config/config.json");
const pool = require("../modules/pool");
const encryptLib = require("../modules/encryption");

let users = [];

function init() {
  //store db users into local memory
  // loadUsers();
  //create node media server object using config
  let nms = new NodeMediaServer(streamConfig);
  //start media server
  nms.run();

  //fire when new incoming stream is in prePublish stage
  nms.on("prePublish", (id, StreamPath, args) => {
    const session = nms.getSession(id);
    try {
      //check if user and key parameters exist in passed url
      if (args && args.user && args.streamKey && args.pass) {
        // const streamKey = args.streamKey;
        // const validated = streamKey == process.env.STREAM_KEY;

        const validated = validateUser(args);
        //validate parameters passed by streaming environment
        console.log(validated);
        if (validated) {
          //change current stream path to appIdentifier/username i.e. http://localhost/live/omi
          session.publishStreamPath =
            `/${globalConfig.appIdentifier}/` + args.user;
        } else {
          //throw error if key is not validated
          throw "Stream was not validated";
        }

        //log stream info
        console.log(
          `[New Stream] id=${id} StreamPath=${session.publishStreamPath} user=${args.user}`
        );
      } else {
        //throw error if stream variables are not present
        throw "Stream variables not valid";
      }
    } catch (error) {
      console.error(
        `[STREAM-AUTH]: ${error} | ${session.ip} | ${session.connectTime}`
      );
      session.reject();
    }
  });
}

function validateUser(args) {
  for (let user of users) {
    //check stream args against cached users array
    if (
      args.user == user.username &&
      args.streamKey == user.stream_key &&
      encryptLib.comparePassword(args.pass, user.password)
    ) {
      return true;
    }
  }
  return false;
}

//add user to cache
function cacheUser(user) {
  if (!users.find(cachedUser => cachedUser.username == user.username)){
    users.push({...user});
  }
}

function uncacheUser(user) {
  users.map((cachedUser) =>{
    if (cachedUser.username != user.username) {
      return cachedUser;
    }
  })
}

module.exports = { init, cacheUser, uncacheUser };
