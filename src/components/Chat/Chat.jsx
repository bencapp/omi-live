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

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function Chat() {
  //html ref for scrolling to bottom of comments
  const scrollRef = useRef(null);

  //get current user
  const user = useSelector((store) => store.user);
  //get all chats from db/store
  const allChats = useSelector((store) => store.chat);
  console.log("allChats:", allChats);
  //get dayjs
  const dayjs = require("dayjs");
  //get mui theme
  const theme = useTheme();

  //get current stream id
  // const streamId = useSelector((store) => store.currentStream)
  // console.log(streamId);

  const dispatch = useDispatch();

  //set chat open or closed
  const [chatOpen, setChatOpen] = useState(false);

  const [message, setMessage] = useState("");
  //fullchat is all of the messages
  // const [fullchat, setFullChat] = useState([])

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
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatOpen]);

  useEffect(() => {
    if (!chatOpen) {
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

  return (
    <div>
      <Box
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.7),
          borderRadius: "5px",
          pt: "5px",
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="#000000"
          aria-label="logo"
          onClick={() => setChatOpen(!chatOpen)}
          sx={{
            alignSelf: "center",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            width: "100vw",
            color: chatOpen ? "primary" : "#FFFFFF",
          }}
        >
          {chatOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </IconButton>
        <Box
          sx={{
            maxHeight: chatOpen ? "60vh" : "15vh",
            overflow: chatOpen ? "scroll" : "hidden",
          }}
        >
          {allChats?.map((chat, i) => {
            if (i >= allChats.length - 3 || chatOpen) {
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
                  <Typography sx={{ fontSize: ".7em", fontStyle: "italic" }}>
                    {dayjs(chat.timestamp).format("h:mm:ss A")}
                  </Typography>
                </Box>
              );
            }
          })}
          <Box ref={scrollRef} />
        </Box>
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
                if (e.key == 'Enter') {
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
      </Box>
    </div>
  );
}

export default Chat;
