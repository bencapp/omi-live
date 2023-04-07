import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import LogOutButton from "../../LogOutButton/LogOutButton";

function StreamerHomePage() {
  const user = useSelector((store) => store.user);
  return (
    <>
      <div>This is the streamer home page!</div>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <LogOutButton className="btn" />
      </div>
    </>
  );
}

export default StreamerHomePage;
