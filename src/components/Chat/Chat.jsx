import React, { useState, useEffect } from "react";

import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")


function Chat() {
    const [message, setMessage] = useState("")
    const [messageReceived, setMessageReceived] = useState("");
    const sendMessage = () => {
        socket.emit("send_message", { message })
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageReceived(data.message);
        })
    }, [socket])

    return (
        <div>
        <input placeholder="Message..." onChange={(event) => { setMessage(event.target.value) }} />
        <button onClick={sendMessage}>Send Message</button>
        <h1> Message </h1>
        {messageReceived}
      </div>
    )

}

export default Chat; 