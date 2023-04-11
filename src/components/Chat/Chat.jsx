import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")


function Chat() {
    //get current user
    const user = useSelector((store) => store.user)

    //get all chats from db/store
    const allChats = useSelector((store) => store.chat)
    console.log('allChats:', allChats)

    //get current stream id
    // const streamId = useSelector((store) => store.currentStream)
    // console.log(streamId);

    const dispatch = useDispatch();

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
        <div>
            <h2>Chatroom</h2>
            {console.log(allChats)}
            {allChats?.map(chat => {
                return (<p>{chat.username}: {chat.text} sent at {chat.timestamp}</p>)
            })}
            <input placeholder="Message..." value={message} onChange={(event) => { setMessage(event.target.value) }} />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    )

}

export default Chat; 