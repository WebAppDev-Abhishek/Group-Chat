
const express = require('express');
const path = require('path');
const groupUsers = require('./groupUsers');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// API to join group (returns random user id)
app.get('/api/join', (req, res) => {
    const userId = groupUsers.addUser();
    res.json({ userId });
});

// API to get all users in the group
app.get('/api/users', (req, res) => {
    res.json({ users: groupUsers.getUsers() });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
