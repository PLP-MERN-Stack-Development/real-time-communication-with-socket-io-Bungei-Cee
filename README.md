# Real-Time Chat Application with Socket.io

A real-time chat app built with Node.js, Express, Socket.io and React.  
Features: global & private messaging, multiple rooms, typing indicators, presence, notifications, and optional file sharing and read receipts.

---

## 🔧 Project structure
socketio-chat/
├── client/ # React front-end
│ ├── public/
│ └── src/
│ ├── components/
│ ├── context/
│ ├── hooks/
│ ├── pages/
│ ├── socket/
│ └── App.jsx
├── server/ # Node.js back-end
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── socket/
│ └── server.js
└── README.md

---

## 🚀 Quick start (local)
Requirements: Node.js v18+, npm or yarn.

1. Clone your assignment repo:

```bash
git clone https://github.com/<your-username>/real-time-communication-with-socket-io-Bungei-Cee.git
cd real-time-communication-with-socket-io-Bungei-Cee

cd server
npm install

cd ../client
npm install

PORT=5000
MONGO_URI=your_mongo_uri_if_using_db
JWT_SECRET=changeme

PORT=3000
REACT_APP_SOCKET_URL=http://localhost:5000

cd server
npm run dev

cd client
npm run dev
🧩 Features to implement (minimum)

Username-based authentication (or JWT)

Global chat (everyone)

Private messages (direct)

Multiple rooms/channels

Typing indicator

Online/offline presence

Notifications for joins/leaves and unread counts

Advanced (pick ≥3):

File/image sharing (uploads + URLs)

Read receipts

Message reactions

Pagination & message history (MongoDB)

Browser notifications & sound

📁 Example API / Socket events

Socket events (recommended):

join — user joins with username

message — send message { to?, room?, text, ts }

typing — { isTyping }

private-message — server -> recipient

user-list — server -> all clients

notification — server -> all clients

message-read — acknowledge read

