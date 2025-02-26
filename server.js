const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins
        methods: ["GET", "POST"]
    }
});


io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("message", (msg) => {
        console.log("Message received:", msg);
        const say = require('say');

// Speak the text
say.speak(msg);

// Speak with a different speed
// say.speak("Hello my name is Harshit pandey", "Microsoft David Desktop", 1);

// Stop speaking
setTimeout(() => {
    say.stop();
}, 3000);
        io.emit("message", msg); // Send the message to all clients
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});


server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
