import React, { useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import "./Chatbot.css";

const initialMessages = [
  {
    id: "welcome",
    role: "ai",
    text: "Hello! I'm Zaalima Assistant. Ask me about the site or your job search — I can help.",
    ts: Date.now(),
  },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    // Auto-scroll when messages change
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open, isTyping]);

  function handleToggle() {
    setOpen((v) => !v);
  }

  function handleClose() {
    setOpen(false);
  }

  function pushMessage(role, text) {
    setMessages((m) => [...m, { id: `${role}_${Date.now()}`, role, text, ts: Date.now() }]);
  }

  function sendUserMessage() {
    const trimmed = input.trim();
    if (!trimmed) return;
    pushMessage("user", trimmed);
    setInput("");

    // Simulate AI reply (since backend not connected yet)
    setIsTyping(true);
    // small random delay to feel natural
    const delay = 800 + Math.floor(Math.random() * 900);
    setTimeout(() => {
      // simple canned response — keep it helpful and generic
      const reply = `I got your question: "${trimmed}". This is a simulated reply (chat not yet connected).`;
      pushMessage("ai", reply);
      setIsTyping(false);
    }, delay);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendUserMessage();
    }
  }

  return (
    <>
      {/* Floating button */}
      <div className="chatbot-floating">
        {!open && (
          <IconButton
            color="primary"
            aria-label="open chat"
            className="chatbot-fab"
            onClick={handleToggle}
            size="large"
          >
            <ChatIcon fontSize="inherit" />
          </IconButton>
        )}
      </div>

      {/* Chat window */}
      {open && (
        <div className="chatbot-container" role="dialog" aria-label="Chatbot window">
          <Paper elevation={6} className="chatbot-card">
            <div className="chatbot-header">
              <div className="chatbot-header-left">
                <Avatar sx={{ bgcolor: "#1976d2", width: 36, height: 36 }}>
                  <SmartToyIcon />
                </Avatar>
                <div className="chatbot-title">
                  <div className="chatbot-name">Zaalima Assistant</div>
                  <div className="chatbot-sub">How can I help you today?</div>
                </div>
              </div>
              <div className="chatbot-header-right">
                <IconButton aria-label="close chat" onClick={handleClose} size="large">
                  <CloseIcon />
                </IconButton>
              </div>
            </div>

            <div className="chatbot-body" ref={listRef}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`chatbot-message ${m.role === "user" ? "user" : "ai"}`}
                >
                  {m.role === "ai" ? (
                    <div className="chatbot-message-inner">
                      <div className="chatbot-avatar">
                        <SmartToyIcon />
                      </div>
                      <div className="chatbot-bubble">{m.text}</div>
                    </div>
                  ) : (
                    <div className="chatbot-message-inner user-inner">
                      <div className="chatbot-bubble user-bubble">{m.text}</div>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="chatbot-message ai typing">
                  <div className="chatbot-message-inner">
                    <div className="chatbot-avatar">
                      <SmartToyIcon />
                    </div>
                    <div className="chatbot-bubble">
                      <div className="typing-indicator">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="chatbot-footer">
              <TextField
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                variant="outlined"
                size="small"
                multiline
                maxRows={4}
                className="chatbot-input"
                InputProps={{
                  sx: { borderRadius: "16px", backgroundColor: "#fff" },
                }}
                aria-label="Chat input"
              />

              <Button
                variant="contained"
                color="primary"
                onClick={sendUserMessage}
                className="chatbot-send"
                aria-label="Send message"
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </div>
          </Paper>
        </div>
      )}
    </>
  );
}
