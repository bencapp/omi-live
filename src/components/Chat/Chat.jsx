import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Typography,
  useTheme,
  alpha,
  Input,
  IconButton,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ClearIcon from "@mui/icons-material/Clear";

import { socket } from "../../socket";

function Chat({ height }) {
  //html ref for scrolling to bottom of comments
  const scrollRef = useRef(null);

  //get current user
  const user = useSelector((store) => store.user);
  //get all chats from db/store
  const allChats = useSelector((store) => store.chat);
  // console.log("allChats:", allChats);
  //get dayjs
  const dayjs = require("dayjs");
  //get mui theme
  const theme = useTheme();

  //get current stream id
  // const streamId = useSelector((store) => store.currentStream)
  // console.log(streamId);

  const dispatch = useDispatch();

  //set chat open or closed
  const [chatOpen, setChatOpen] = useState(true);
  //bool to track if user is scrolling through chats
  const [scrolling, setScrolling] = useState(false);

  const [message, setMessage] = useState("");

  const sendMessage = () => {
    // socket.emit("send_message", { message, user})
    dispatch({
      type: "POST_CHAT",
      payload: {
        // stream_id: ,
        text: message,
        user: user,
      },
    });
    //reset input field
    setMessage("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatOpen]);

  useEffect(() => {
    if (!scrolling) {
      scrollToBottom();
    }
  }, [allChats]);

  useEffect(() => {
    dispatch({
      type: "GET_CHAT",
    });

    const receiveMessage = () => {
      dispatch({
        type: "GET_CHAT",
      });
    };
    
    socket.on("add_text", receiveMessage);
    return () => {
      socket.off("add_text", receiveMessage);
    };
  }, []);

  const deleteComment = (id) => {
    dispatch({
      type: "DELETE_CHAT",
      payload: id,
    });
  };

  const handleScroll = (e) => {
    // console.log("im scrollllllling")
    const atBottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (atBottom) {
      setScrolling(false);
    } else {
      setScrolling(true);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div>
      <Box
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.7),
          borderRadius: "5px",
          pt: "5px",
        }}
      >
        <Box
          sx={{
            width: "100vw",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <IconButton
              size="large"
              edge="end"
              sx={{
                color: "#FFFFFF",
              }}
              aria-label="logo"
              onClick={copyUrl}
            >
              <ShareIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              sx={{
                color: "#FFFFFF",
              }}
              aria-label="logo"
            >
              <ThumbUpIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              size="large"
              edge="start"
              aria-label="logo"
              onClick={() => setChatOpen(!chatOpen)}
              sx={{
                alignSelf: "flex-end",
                color: chatOpen ? "primary" : "#FFFFFF",
              }}
            >
              {chatOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            maxHeight: chatOpen ? height : "",
            overflow: chatOpen ? "scroll" : "hidden",
          }}
          onScroll={handleScroll}
        >
          {allChats?.map((chat, i) => {
            if (chatOpen) {
              return (
                <Box
                  key={chat.id}
                  sx={{
                    backgroundColor: alpha(theme.palette.secondary.main, 0.7),
                    mx: "10px",
                    my: "3px",
                    p: "10px",
                    borderRadius: "5px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Typography
                      sx={{
                        p: "5px",
                        fontSize: ".8em",
                        fontWeight: "bold",
                        display: "inline",
                        alignSelf: "flex-start",
                      }}
                    >
                      {chat.username}:
                    </Typography>
                    <Typography
                      component="div"
                      sx={{
                        p: "5px",
                        fontSize: ".8em",
                        display: "inline-block",
                        wordBreak: "break-word",
                        whiteSpace: "pre-line",
                        maxWidth: "18em",
                      }}
                    >
                      {chat.text}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Typography sx={{ fontSize: ".7em", fontStyle: "italic" }}>
                      {dayjs(chat.timestamp).format("h:mm:ss A")}
                    </Typography>
                    {user.isAdmin ? (
                      <IconButton
                        size="small"
                        // edge="end"
                        sx={{
                          color: "#FF0000",
                        }}
                        aria-label="logo"
                        onClick={(e) => deleteComment(chat.id)}
                      >
                        <ClearIcon />
                      </IconButton>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
              );
            }
          })}
          <Box ref={scrollRef} />
        </Box>
        {chatOpen ? (
          <Box sx={{ py: "10px", display: "flex", flexDirection: "row" }}>
            <Input
              sx={{
                ml: "10px",
                width: "stretch",
                height: "2em",
                "& .MuiInputBase-root": { height: 40 },
                backgroundColor: "#FFFFFF",
                borderRadius: ".5em",
                pl: "10px",
              }}
              id="outlined-basic"
              placeholder="Chat here"
              variant="outlined"
              value={message}
              type="text"
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  sendMessage();
                }
              }}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
            <Button
              sx={{ ml: "10px", mr: "10px", fontSize: ".75em" }}
              size="small"
              onClick={sendMessage}
            >
              Send
            </Button>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </div>
  );
}

export default Chat;
