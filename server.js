const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const say = require("say");


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


 

    let userCount=0;
    io.on("connection", (socket) => {
        userCount++;
        const userId=userCount;
        console.log(`user ${userId} connected`);
    
        socket.on("message", (msg) => {
            console.log("Message received:", msg);
    
            // Speak message with proper error handling
            say.speak(msg, undefined, 1, (err) => {
                if (err) {
                    console.error("Error speaking:", err);
                    return;
                }
                console.log("Message spoken successfully.");
            });
    
            io.emit("message", {userId,msg});
        });
    
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
  

// Use dynamic port for deployment
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
