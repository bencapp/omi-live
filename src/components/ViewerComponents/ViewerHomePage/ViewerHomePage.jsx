import { useSelector } from "react-redux";
import LogOutButton from "../../LogOutButton/LogOutButton";

function ViewerHomePage() {
  const user = useSelector((store) => store.user);
  return (
    <>
      <div>This is the viewer home page!</div>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <LogOutButton className="btn" />
      </div>
    </>
  );
}

export default ViewerHomePage;
