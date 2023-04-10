const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const config = require("../config/config.json");

module.exports = {
  rtmp: {
    port: 1935,
    chunk_size: 128,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: process.env.STREAM_PORT || 5001,
    mediaroot: config.mediaRoot,
    allow_origin: config.cors,
  },
  auth: {
    api: true,
    //  play: true,
    publish: true,
    // api_user: process.env.STREAM_USER,
    // api_pass: process.env.STREAM_PASSWORD,
    secret: process.env.STREAM_SECRET,
  },
  //ffmpeg -re -i sample.webm -c:v h264 -c:a aac -f flv "rtmp://example.com/live"
  // [rtmp publish] Handle video. id=VK52CUH5 streamPath=/live/test frame_type=1 codec_id=7 codec_name=H264 1152x720
  // [rtmp publish] Handle video. id=IS48FKBR streamPath=/live/test frame_type=1 codec_id=7 codec_name=H264 1152x720
  trans: {
    ffmpeg: ffmpegPath,
    tasks: [
      {
        app: config.appIdentifier,
        mp4: config.saveVideos,
        mp4Flags: '[movflags=frag_keyframe+empty_moov]',
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        hlsKeep: config.persistentStreamFiles, // to prevent hls file delete after end the stream
        dash: true,
        dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
        dashKeep: config.persistentStreamFiles, // to prevent dash file delete after end the stream
        raw: config.ffmpegFlags
      },
    ],
  },
};
