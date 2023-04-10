import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")


function Chat() {
    //get current user
    const user = useSelector((store) => store.user)

    const [message, setMessage] = useState("")
    //fullchat is all of the messages
    const [fullchat, setFullChat] = useState([])
    const sendMessage = () => {
        socket.emit("send_message", { message, user })
        //reset input field
        setMessage("");
    };

    useEffect(() => {
        const receiveMessage = (data) => {
            setFullChat(fullchat => [...fullchat, data]);
        }
        socket.on("receive_message", receiveMessage)
        return () => {
            socket.off("receive_message", receiveMessage)
        }
    }, [])

    return (
        <div>
            <h2>Chatroom</h2>
            {console.log(fullchat)}
            {fullchat?.map(chat => {
                return (<p>{chat.user?.username}: {chat.message}</p>)
            })}
            <input placeholder="Message..." value={message} onChange={(event) => { setMessage(event.target.value) }} />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    )

}

export default Chat; 