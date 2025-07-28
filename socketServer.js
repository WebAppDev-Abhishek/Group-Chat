// Socket.IO server setup for real-time chat
const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const groupUsers = require('./groupUsers');
const chatFileStore = require('./chatFileStore');


const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

// Store user locations in memory (userId -> {lat, lng})
const userLocations = {};

app.use(express.static(__dirname));

app.get('/api/join', (req, res) => {
    const userId = groupUsers.addUser();
    res.json({ userId });
});

app.get('/api/users', (req, res) => {
    res.json({ users: groupUsers.getUsers() });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    // Send recent messages to new client
    const recentMessages = chatFileStore.loadMessages();
    socket.emit('clear');
    recentMessages.forEach(m => {
        socket.emit('chat', { userId: m.userId, msg: m.msg });
    });

    socket.on('join', (userId) => {
        socket.userId = userId;
        io.emit('userlist', groupUsers.getUsers());
        // Send all user locations to this client
        socket.emit('locations', userLocations);
    });

    // Receive and store user location, then broadcast all locations
    socket.on('location', ({ userId, lat, lng }) => {
        if (userId && typeof lat === 'number' && typeof lng === 'number') {
            userLocations[userId] = { lat, lng };
            io.emit('locations', userLocations);
        }
    });
    socket.on('chat', (msg) => {
        chatFileStore.addMessage(socket.userId, msg);
        io.emit('chat', { userId: socket.userId, msg });
    });
    socket.on('disconnect', () => {
        // Optionally remove user from groupUsers if you want
        // Remove user location on disconnect
        if (socket.userId && userLocations[socket.userId]) {
            delete userLocations[socket.userId];
            io.emit('locations', userLocations);
        }
        io.emit('userlist', groupUsers.getUsers());
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
