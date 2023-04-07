import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  const [message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", {message})
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message); 
    })
  }, [socket])


  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
         <div>
          <input placeholder = "Message..." onChange={(event) => {setMessage(event.target.value) }} />
          <button onClick={sendMessage}>Send Message</button>
          <h1> Message </h1>
          {messageReceived}
         </div>

         
       

          <p>
            Fusce porta diam ac tortor elementum, ut imperdiet metus volutpat.
            Suspendisse posuere dapibus maximus. Aliquam vitae felis libero. In
            vehicula sapien at semper ultrices. Vivamus sed feugiat libero. Sed
            sagittis neque id diam euismod, ut egestas felis ultricies. Nullam
            non fermentum mauris. Sed in enim ac turpis faucibus pretium in sit
            amet nisi.
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
