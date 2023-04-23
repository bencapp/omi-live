import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";

import StreamerProductsList from "../StreamerProductsList/StreamerProductsList";
import StreamsList from "../StreamsList/StreamsList";

import { Link, Button } from "@mui/material";
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';

function StreamerHomePage() {
  const { view } = useParams();
  const [display, setDisplay] = useState(
    view ? view : "streams");
  const [copied, setCopied] = useState(false);
  const user = useSelector((store) => store.user);
  const streamKey = `?key=${user.stream_key}&user=${user.username}&pass=CHANGE ME`;

  const copyKey = () => {
    navigator.clipboard.writeText(streamKey);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      style={{
        padding: "0px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>
          STREAMER<br></br>HOME
        </div>
        <Button
          startIcon={copied ? '' : <KeyRoundedIcon />}
          sx={{ height: "2.5em", width: "10em" }}
          onClick={copied ? null : copyKey}
        >
          {copied ? 'Copied!' : 'COPY KEY'}
        </Button>
      </div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1.2em",
        }}
      >
        <Link onClick={() => setDisplay("streams")}>STREAMS</Link>
        <Link onClick={() => setDisplay("products")}>PRODUCTS</Link>
      </nav>
      {display == "streams" ? <StreamsList /> : <StreamerProductsList />}
    </div>
  );
}

export default StreamerHomePage;
