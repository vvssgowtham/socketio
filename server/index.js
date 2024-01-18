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
const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"]
    }
});

server.listen(3001, ()=> {
    console.log("Listening on port 3001");
})