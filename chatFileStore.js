// Simple file-based message storage for chat
const fs = require('fs');
const path = require('path');

const MSG_FILE = path.join(__dirname, 'messages.json');

function loadMessages() {
    try {
        const data = fs.readFileSync(MSG_FILE, 'utf8');
        const arr = JSON.parse(data);
        // Only keep messages from the last 60 seconds
        const now = Date.now();
        return arr.filter(m => now - m.time < 60000);
    } catch (e) {
        return [];
    }
}

function saveMessages(messages) {
    fs.writeFileSync(MSG_FILE, JSON.stringify(messages), 'utf8');
}

function addMessage(userId, msg) {
    const messages = loadMessages();
    messages.push({ userId, msg, time: Date.now() });
    saveMessages(messages);
}

module.exports = { loadMessages, addMessage };
