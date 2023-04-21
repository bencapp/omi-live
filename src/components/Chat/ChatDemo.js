import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function ChatDemo() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user.isAdmin) {
      dispatch({
        type: "START_CHAT_DEMO",
      });
    }
  }, []);

  return <></>;
}

export default ChatDemo;
