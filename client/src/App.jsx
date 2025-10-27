import React, { useState, useEffect, useRef } from "react";
import socket from "./socket/socket";

function App() {
  const [username, setUsername] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Log connection
    socket.on("connect", () => {
      console.log("✅ Connected to server with ID:", socket.id);
    });

    // Listen for incoming messages
    socket.on("chatMessage", (msgData) => {
      setMessages((prev) => [...prev, msgData]);
    });

    // Listen for typing events
    socket.on("userTyping", (user) => {
      if (user !== username) {
        setTypingUser(user);
        setTimeout(() => setTypingUser(""), 2000);
      }
    });

    // Listen for join/leave notifications
    socket.on("notification", (msg) => {
      setMessages((prev) => [...prev, { username: "System", text: msg }]);
    });

    return () => {
      socket.off("chatMessage");
      socket.off("userTyping");
      socket.off("notification");
    };
  }, [username]);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      socket.emit("chatMessage", { username, text: message });
      setMessage("");
    }
  };

  const handleTyping = () => {
    socket.emit("userTyping", username);
  };

  const handleLogin = () => {
    if (inputUsername.trim()) {
      setUsername(inputUsername.trim());
      socket.emit("join", inputUsername.trim());
    }
  };

  if (!username) {
    return (
      <div style={styles.loginContainer}>
        <h2>Enter your username</h2>
        <input
          type="text"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          style={styles.input}
          placeholder="Your name..."
        />
        <button onClick={handleLogin} style={styles.button}>
          Join Chat
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>💬 Real-Time Chat ({username})</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={
              msg.username === username
                ? styles.myMsg
                : msg.username === "System"
                ? styles.systemMsg
                : styles.msg
            }
          >
            <strong>{msg.username}:</strong> {msg.text}
          </div>
        ))}
        {typingUser && <p style={styles.typing}>{typingUser} is typing...</p>}
        <div ref={chatEndRef}></div>
      </div>
      <div style={styles.inputContainer}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { width: "400px", margin: "50px auto", textAlign: "center" },
  chatBox: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    height: "300px",
    overflowY: "auto",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  msg: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
    color: "#000",
    padding: "8px 12px",
    borderRadius: "10px",
    maxWidth: "80%",
  },
  myMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#4caf50",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "10px",
    maxWidth: "80%",
  },
  systemMsg: {
    alignSelf: "center",
    backgroundColor: "#ddd",
    color: "#333",
    fontStyle: "italic",
    borderRadius: "6px",
    padding: "4px 8px",
  },
  typing: { fontStyle: "italic", color: "#999", marginTop: "5px" },
  inputContainer: { display: "flex", gap: "10px" },
  input: { flex: 1, padding: "8px" },
  button: {
    padding: "8px 16px",
    cursor: "pointer",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
  loginContainer: { textAlign: "center", marginTop: "100px" },
};

export default App;
