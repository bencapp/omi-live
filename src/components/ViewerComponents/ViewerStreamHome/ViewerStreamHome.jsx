import StreamView from "../StreamView/StreamView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {useTheme} from '@mui/material';

function ViewerStreamHome() {
  const activeStreams = useSelector((store) => store.streams.activeStreams);
  // const [preview, setPreview] = useState("");
  const username = "omi";

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_ACTIVE_STREAMS" });
  }, []);

  return (
    <div
      align="center"
      style={{ overflow: "hidden", height: "50vh", marginTop: "5vh" }}
    >
      {activeStreams != 0 ? (
        // <div
        // style={{color: theme.palette.primary.main, fontSize: 20 }}
        // onClick={() => {
        //   setPreview(username);
        // }}>Check out {username}'s live stream!</div>
        <StreamView
        height="50vh"
        width="90vw"
        chatHeight={"10vh"}
        username={username}
        yOffset="-15vh"
        preview={true}
      />
      ) : (
        "Sorry there are no streams currently available."
      )}
      {/* {preview != "" ? (
        <StreamView
          height="50vh"
          width="90vw"
          chatHeight={"10vh"}
          username={username}
          yOffset="-15vh"
          preview={true}
        />
      ) : (
        ""
      )} */}
    </div>
  );
}

export default ViewerStreamHome;
