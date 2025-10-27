💬 Real-Time Chat Application with Socket.io

A full-stack real-time chat app built using React, Express, and Socket.io.
This project demonstrates bidirectional communication between the client and server, enabling instant messaging, typing indicators, and user presence updates.

🚀 Project Overview

This chat application allows multiple users to:

Join the chat with a custom username

Send and receive messages in real-time

See who is typing

Get notified when users join or leave

It’s a simple yet powerful example of using Socket.io for real-time web applications.

🧩 Tech Stack
Layer	Technology
Frontend	React + Vite
Backend	Node.js + Express
Realtime Engine	Socket.io
Styling	Inline CSS (simple and clean)

Setup Instructions

1️⃣ Clone the Repository
git clone <your-github-classroom-repo-url>
cd real-time-communication-with-socket-io-Bungei-Cee

2️⃣ Install Dependencies
Server
cd server
npm install
npm run dev
You should see:
Server running on port 5000
Client
Open a new terminal:
cd client
npm install
npm run dev

Then visit:
👉 http://localhost:5173/
💻 Features Implemented

✅ Real-time messaging between multiple clients
✅ Typing indicators ("user is typing…")
✅ System notifications for join/leave events
✅ Auto-scroll and user message differentiation
✅ Simple, responsive chat layout

🧠 How It Works

Each client connects to the Socket.io server upon loading.

When a user joins, their username is broadcasted to all connected users.

Every message emitted by one client is sent to all clients (including the sender).

“Typing” events are broadcast when a user starts typing, and cleared after a short timeout.

Disconnecting (closing tab or refreshing) triggers a “user left” message.

🖼️ Screenshots
Login Screen	Chat Window

	


