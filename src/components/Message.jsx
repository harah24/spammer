import { useState } from "react";
import { API } from "../api";

export default function Messages(props) {
  const { fetchMessages, messages } = props;

  const [isEditing, setIsEditing] = useState(false);

  const [editMessage, setEditMessage] = useState("");

  const [isReplying, setIsReplying] = useState(false);

  const [reply, setReply] = useState("");

  const handleDeleteMessage = async (messageId) => {
    const res = await fetch(`${API}/message/${messageId}`, {
      method: "DELETE",
    });
    const info = await res.json();
    if (info.success) {
      fetchMessages();
    }
  };

  const handleLikeMessage = async (message) => {
    const res = await fetch(`${API}/message/${message.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: message.likes + 1 }),
    });
    const info = await res.json();
    if (info.success) {
      fetchMessages();
    }
  };

  const handleEditMessage = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/message/${messages.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: editMessage }),
    });
    const info = await res.json();
    if (info.success) {
      setIsEditing(false);
      setEditMessage("");
      fetchMessages();
    }
  };

  const handleReplyMessage = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: reply,
        parentId: messages.id,
      }),
    });
    const info = await res.json();
    if (info.success) {
      setIsReplying(false);
      setReply("");
      fetchMessages();
    }
  };

  return (
    <div className="message-box">
      <div className="content">
        <p className="text">
          {messages.text}
          <button
            className="icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          >
            ✏️
          </button>
        </p>
        {isEditing && (
          <div>
            <form className="edit-form" onSubmit={handleEditMessage}>
              <input
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
                placeholder="Edit Message"
              />
              <button className="edit-btn">Edit Message</button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(false);
                }}
                className="cancel-btn"
              >
                Cancel
              </button>
            </form>
          </div>
        )}
        <div className="icon-container">
          <button
            className="icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsReplying(true);
            }}
          >
            ↩️
          </button>
          {isReplying && (
            <div>
              <form
                className="reply-form"
                onSubmit={(e) => {
                  handleReplyMessage(e);
                }}
              >
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Write a reply"
                />
                <button className="reply-btn">Reply</button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsReplying(false);
                  }}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
          <button className="icon" onClick={() => handleLikeMessage(messages)}>
            {" "}
            👍
            {messages.likes}
          </button>
          <button
            className="icon"
            onClick={() => handleDeleteMessage(messages.id)}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
