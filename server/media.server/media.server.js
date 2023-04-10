const NodeMediaServer = require('node-media-server');
const streamConfig = require('../constants/stream_config');
const globalConfig = require("../config/config.json");

function init() {
    let nms = new NodeMediaServer(streamConfig)
    nms.run();
    
    nms.on('prePublish', (id, StreamPath, args) => {
      const session = nms.getSession(id);
      console.log(args);
      try {
        if (args && args.user && args.key) {
          const streamKey = args.key;
          const validStream = streamKey == process.env.STREAM_KEY;
          if (validStream) {
            session.publishStreamPath = `/${globalConfig.appIdentifier}/` + args.user;
          } else {
            session.reject((rejected) => {
              console.log(rejected);
            });
          }
      
          console.log(
            '[NodeEvent on prePublish]',
            `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
          );
        } else {
          throw "Stream variables not valid";
        }
      } catch (err) {
        console.log(err);
        session.reject();
      }
    });
}

module.exports = {init} 