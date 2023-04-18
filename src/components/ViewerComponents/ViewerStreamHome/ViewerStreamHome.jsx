import StreamView from "../StreamView/StreamView";

function ViewerStreamHome() {
  return (
    <div align="center" style={{overflow: "hidden", height: "50vh", marginTop: "5vh"}}>
      <StreamView height="50vh" width="90vw" chatHeight={"10vh"} username="omi" yOffset="-15vh" preview={true}/>
    </div>
  );
}

export default ViewerStreamHome;
