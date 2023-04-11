const NodeMediaServer = require('node-media-server');
const streamConfig = require('../constants/stream_config');
const globalConfig = require("../config/config.json");

function init() {
    //create node media server object using config
    let nms = new NodeMediaServer(streamConfig)
    //start media server
    nms.run();
    
    //fire when new incoming stream is in prePublish stage
    nms.on('prePublish', (id, StreamPath, args) => {
      const session = nms.getSession(id);
      try {
        //check if user and key parameters exist in passed url
        if (args && args.user && args.key) {
          const streamKey = args.key;
          //validate that key parameter matches environment variable stream key
          const validStream = streamKey == process.env.STREAM_KEY;
          if (validStream) {
            //change current stream path to appIdentifier/username i.e. http://localhost/live/omi
            session.publishStreamPath = `/${globalConfig.appIdentifier}/` + args.user;
          } else {
            //throw error if key is not validated
            throw "Key was not validated";
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
        console.error(`[STREAM-AUTH]: ${error} | ${session.ip} | ${session.connectTime}`);
        session.reject();
      }
    });
}

module.exports = {init} 