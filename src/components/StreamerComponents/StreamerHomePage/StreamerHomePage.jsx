import { useSelector } from "react-redux";
import { useState } from "react";

import StreamerProductsList from "../StreamerProductsList/StreamerProductsList";
import StreamsList from "../StreamsList/StreamsList";

import { Link } from "@mui/material";

function StreamerHomePage() {
  const [display, setDisplay] = useState("streams");
  const user = useSelector((store) => store.user);

  return (
    <div
      style={{
        padding: "0px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>
        STREAMER<br></br>HOME
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
