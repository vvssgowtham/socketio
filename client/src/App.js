import io from 'socket.io-client';
import {useEffect, useState} from "react";

//to establish the connection to socket io present in the backend
const socket = io.connect("http://localhost:3001");

function App() {
  //room states
  const [room,setRoom] = useState("");

  //message states
  const [message,setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if(room !== ""){
      socket.emit("join_room",room);
    }
  }

  const sendMessage = () => {
    socket.emit("send_message",{message : message,room});    
  };

  //the way we actually listen to that event obtained from backend is through using "useEffect" hook
  useEffect(()=> {
    socket.on("receive_message",(data) => {
      setMessageReceived(data.message)
    })
    // eslint-disable-next-line
  },[socket])

  return (
    <div className="App">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
