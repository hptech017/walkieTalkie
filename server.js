const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const say = require("say"); // Import once

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

        // Speak the received message
        say.speak(msg, undefined, 1, (err) => {
            if (err) {
                console.error("Error speaking:", err);
            }
        });

        io.emit("message", msg); // Broadcast message to all clients
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Use dynamic port for deployment
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
