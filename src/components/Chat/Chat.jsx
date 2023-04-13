import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Typography, useTheme, alpha, TextField, OutlinedInput, IconButton } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")


function Chat() {
    //get current user
    const user = useSelector((store) => store.user)
    //get all chats from db/store
    const allChats = useSelector((store) => store.chat)
    console.log('allChats:', allChats)
    //get dayjs
    const dayjs = require('dayjs')
    //get mui theme
    const theme = useTheme();

    //get current stream id
    // const streamId = useSelector((store) => store.currentStream)
    // console.log(streamId);

    const dispatch = useDispatch();

    //set chat open or closed
    const [chatOpen, setChatOpen] = useState(false)


    const [message, setMessage] = useState("")
    //fullchat is all of the messages
    // const [fullchat, setFullChat] = useState([])

    const sendMessage = () => {
        // socket.emit("send_message", { message, user})
        dispatch({
            type: 'POST_CHAT',
            payload: {
                // stream_id: , 
                text: message,
                user: user
            },
        });
        //reset input field
        setMessage("");

    };

    useEffect(() => {
        dispatch({
            type: 'GET_CHAT'
        })


        const receiveMessage = () => {
            dispatch({
                type: 'GET_CHAT'
            })
        }
        socket.on("add_text", receiveMessage)
        return () => {
            socket.off("add_text", receiveMessage)
        }

    }, [])

    return (
        chatOpen === true ? (
            <Box
            sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.7),
                borderRadius: "5px",
                pt: "5px"
            }}
        >
            <IconButton
                size='large'
                edge='start'
                color='#000000'
                aria-label='logo'
                onClick={() => setChatOpen(false)}
                sx={{
                        alignSelf: "stretch",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                }}
            >
                <ArrowDropDownIcon />
            </IconButton>
            {allChats?.map(chat => {
                return <Box
                    key={chat.id}
                    sx={{
                        backgroundColor: alpha(theme.palette.secondary.main, 0.7),
                        mx: "10px",
                        my: "3px",
                        p: "10px",
                        borderRadius: "5px",
                    }}
                >
                    <Typography sx={{ fontSize: ".8em", fontWeight: "bold", display: "inline" }} >  {chat.username}: </Typography> <Typography component="div" sx={{ fontSize: ".8em", display: "inline" }}> {chat.text} </Typography>
                    <Typography sx={{ fontSize: ".7em", fontStyle: 'italic' }}>  {dayjs(chat.timestamp).format('h:mm:ss A')} </Typography>
                </Box>
            })}
            <Box sx={{ py: "10px" }} >
                <TextField sx={{ pl: "10px", width: 170, "& .MuiInputBase-root": { height: 40 }, }} pl="10px" id="outlined-basic" label="Chat here" variant="outlined" value={message} onChange={(event) => { setMessage(event.target.value) }} />
                <Button sx={{ ml: "15px", mr: "10px", fontSize: ".75em" }} size="small" onClick={sendMessage}>Send Message</Button>
            </Box>
        </Box>
        ) : (
            <Box 
            sx={{ ml: "10px", backgroundColor: theme.palette.primary.main }} >
                <IconButton
                size='large'
                edge='start'
                color='#000000'
                aria-label='logo'
                onClick={() => setChatOpen(true)}
                sx={{
                    alignSelf: "stretch",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                }}
            >
                   Chat
                <ArrowDropUpIcon />
            </IconButton>
            </Box>
        )
       
    )

}

export default Chat; 