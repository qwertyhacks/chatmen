const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (e.g., your HTML, CSS, and JS)
app.use(express.static('public'));

// On new connection, handle real-time messaging
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for incoming messages and broadcast them to all clients
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg);  // Broadcast message to all users
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
