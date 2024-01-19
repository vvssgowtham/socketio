const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
//obtaining this library is not necessary because socket.io comes with inbuilt http protocol
const { Server } = require("socket.io");
//Server is the class which belongs to socket.io library

app.use(cors());

//creating server using http
const server = http.createServer(app);

//io is the variable which we will use to work on any related backend
//Server is class and server is the http connected one
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//to listen to an event we use on
io.on("connection", (socket) => {
  //console.log(`User Connected: ${socket.id}`);//this statement is just for checking whether server is running or not

  //creating room so that specified devices can only communicate with eachother
  //for this there is a specific event called "join_room"
  socket.on("join_room", (data) => {
    socket.join(data); //data is nothing but we are specifying room number something like that.
  });
  //on the backend means here we are listening to the event means we are listening to frontend i.e we are listening to frontend that is which room should this particular device should join.

  socket.on("send_message", (data) => {
    //broadcast will helps in delivering our message to every device which is connected to that port.
    //in the first argument we specify event and in the second we use the necessary 1.
    //socket.broadcast.emit("receive_message", data);
    socket.to(data.room).emit("receive_message", data);//this means we are emitting the event to the specific room that we are part of.
});
});

server.listen(3001, () => {
  console.log("Listening on port 3001");
});

//The way socket.io works is u create certain events and u name those events and basically u can either listen to those events or emit an event.
//Emit means i am sending or emitting some sort of data to all the people who were listening to that specific event including sending some data back.
