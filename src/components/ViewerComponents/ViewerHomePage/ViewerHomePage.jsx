import { Button, Link } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useState } from "react";

import ViewerStreamHome from "../ViewerStreamHome/ViewerStreamHome";
import ViewerProductsList from "../ViewerProductsList/ViewerProductsList";

function ViewerHomePage() {
  const [display, setDisplay] = useState("streams");

  const history = useHistory();
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
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>
          VIEWER<br></br>HOME
        </div>
      </div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1.2em",
        }}
      >
        <Link onClick={() => setDisplay("streams")}>WATCH</Link>
        <Link onClick={() => setDisplay("products")}>PRODUCTS</Link>
        <Link onClick={() => setDisplay("wishlist")}>WISHLIST</Link>
      </nav>
      {display == "streams" ? (
        <ViewerStreamHome />
      ) : display == "products" ? (
        <ViewerProductsList />
      ) : (
        <ViewerProductsList wishlist={true} />
      )}
    </div>
  );
}

export default ViewerHomePage;
