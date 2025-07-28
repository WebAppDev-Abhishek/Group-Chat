// This file will store the list of connected users in memory
// Each user will have a random ID
const users = new Set();

function generateRandomId() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function addUser() {
    let id;
    do {
        id = generateRandomId();
    } while (users.has(id));
    users.add(id);
    return id;
}

function getUsers() {
    return Array.from(users);
}

module.exports = { addUser, getUsers };
