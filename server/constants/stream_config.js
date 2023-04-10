const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

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
    mediaroot: "./media",
    allow_origin: "*",
  },
  //ffmpeg -re -i sample.webm -c:v h264 -c:a aac -f flv "rtmp://example.com/live"
  // [rtmp publish] Handle video. id=VK52CUH5 streamPath=/live/test frame_type=1 codec_id=7 codec_name=H264 1152x720
  // [rtmp publish] Handle video. id=IS48FKBR streamPath=/live/test frame_type=1 codec_id=7 codec_name=H264 1152x720
  trans: {
    ffmpeg: ffmpegPath,
    tasks: [
      // {
      //   app: 'live',
      //   // mp4: true,
      //   // mp4Flags: '[movflags=frag_keyframe+empty_moov]',
      //   vc:"copy",
      //   vcParam:['-tune','zerolatency', '-preset', 'fast', '-bufsize', '64k', '-maxrate', '64k', '-flags', 'low_delay', '-fflags', 'nobuffer', 'crf'],
      //   ac: "aac",
      //   acParam: ['-ab', '64k', '-ac', '1', '-ar', '44100'],
      //   hls: true,
      //   hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
      //   hlsKeep: true, // to prevent hls file delete after end the stream
      //   dash: true,
      //   dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
      //   dashKeep: true // to prevent dash file delete after end the stream
      // },
      {
        app: "live",
        hls: true,
        // hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        hlsKeep: true, // to prevent hls file delete after end the stream
        dash: true,
        // dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
        dashKeep: true, // to prevent dash file delete after end the stream
        raw: [
          "scale=w=720:h=1280:force_original_aspect_ratio=decrease",
          "-c:a",
          "aac",
          "-ar",
          "48000",
          "-c:v",
          "libx264",
          "-preset",
          "veryfast",
          "-profile:v",
          "main",
          "-crf",
          "20",
          "-sc_threshold",
          "0",
          "-g",
          "48",
          "-keyint_min",
          "48",
          "-hls_time",
          "6",
          "-hls_list_size",
          "10",
          "-hls_flags",
          "delete_segments",
          "-max_muxing_queue_size",
          "1024",
          "-b:v",
          "2800k",
          "-maxrate",
          "2996k",
          "-bufsize",
          "4200k",
          "-b:a",
          "128k",
        ],
      },
    ],
  },
  // relay: {
  //   ffmpeg: ffmpegPath,
  //   tasks: [
  //     {
  //       app: 'cctv',
  //       mode: 'static',
  //       edge: 'rtsp://admin:admin888@192.168.0.149:554/ISAPI/streaming/channels/101',
  //       name: '0_149_101',
  //       rtsp_transport : 'tcp' //['udp', 'tcp', 'udp_multicast', 'http']
  //     }, {
  //         app: 'iptv',
  //         mode: 'static',
  //         edge: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
  //         name: 'hks'
  //       }, {
  //         app: 'mv',
  //         mode: 'static',
  //         edge: '/Volumes/ExtData/Movies/Dancing.Queen-SD.mp4',
  //         name: 'dq'
  //       }
  //   ]
  // }
};
