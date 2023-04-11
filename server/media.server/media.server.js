const NodeMediaServer = require("node-media-server");
const streamConfig = require("../constants/stream_config");
const globalConfig = require("../config/config.json");
const pool = require("../modules/pool");
const encryptLib = require("../modules/encryption");

function init() {
  //create node media server object using config
  let nms = new NodeMediaServer(streamConfig);
  //start media server
  nms.run();

  //fire when new incoming stream is in prePublish stage
  nms.on("prePublish", async (id, StreamPath, args) => {
    const session = nms.getSession(id);
    try {
      //check if user and key parameters exist in passed url
      if (args && args.user && args.streamKey && args.pass) {

        const streamKey = args.streamKey;
        const validated = streamKey == process.env.STREAM_KEY;

        // const validated = await validateUser(args, session);
        //validate parameters passed by streaming environment
        console.log(validated);
        if (validated) {
          //change current stream path to appIdentifier/username i.e. http://localhost/live/omi
          session.publishStreamPath =
            `/${globalConfig.appIdentifier}/` + args.user;
        } else {
          //throw error if key is not validated
          throw "Stream params were not validated";
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

  async function validateUser(args) {
    let connection = await pool.connect();

    // Using basic JavaScript try/catch/finally
    try {
      await connection.query("BEGIN");
      const sqlText = `
      SELECT * from users u
      WHERE u.username = $1`;
      const result = await connection.query(sqlText, [args.user]);
      const user = result && result.rows && result.rows[0];
      console.log(`${args.user} : ${user.username} | ${args.streamKey} : ${user.stream_key} | ${args.pass} : ${user.password}`)
      if (args.user == user.username
        && args.key == user.streamKey
        && encryptLib.comparePassword(args.pass, user.password)) {
          // console.log("authenticated: ", args.pass, user.password)
        return true;
      }
      await connection.query("COMMIT");
    } catch (error) {
      await connection.query("ROLLBACK");
      console.log(`Transaction Error - Rolling back transfer`, error);
    } finally {
      connection.release();
    }
    return false;
  }
}

module.exports = { init };
