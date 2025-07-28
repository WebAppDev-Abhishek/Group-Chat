# Group Chat WebApp

A real-time group chat web application with persistent user IDs, file-based message storage, and live user list display. Built with Node.js, Express, and Socket.IO. The UI is a single-page app with a modern chat overlay and a live user list shown at the top of the page.

## Features

- Real-time group chat for all users
- Each user is assigned a persistent random ID (stored in localStorage)
- Only one user per device/browser
- Messages auto-delete after 60 seconds
- Chat history is stored in a local file (messages.json)
- User list is updated in real time and displayed at the top of the page
- Clean, responsive UI with overlay chat box
- No map or geolocation display (background is solid black)

## Getting Started

### Prerequisites
- Node.js (v14 or newer recommended)

### Installation
1. Clone this repository:
   ```sh
   git clone <your-repo-url>
   cd <repo-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the App
Start the server:
```sh
node server.js
```
Or, for development with auto-reload (if nodemon is installed):
```sh
npx nodemon server.js
```

Open your browser and go to [http://localhost:3000](http://localhost:3000)

## Project Structure

- `server.js` - Main Express server and API endpoints
- `groupUsers.js` - Manages group membership and user IDs
- `chatFileStore.js` - Handles file-based message storage
- `index.html` - Main frontend UI (chat, user list, overlay)
- `messages.json` - Stores chat messages
- `package.json` - Project dependencies and scripts

## API Endpoints

- `GET /api/join` - Join the group, returns a random user ID
- `GET /api/users` - Get the current list of users

## Customization
- To change the background color, edit the `#map-bg` style in `index.html`.
- To adjust chat box appearance, edit the inline styles in `index.html`.

## License
MIT

---

**Author:** Your Name Here
