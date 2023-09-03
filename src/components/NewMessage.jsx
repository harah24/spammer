import { useState } from "react";
import { API } from "../api";

export default function NewMessage(props) {
  const fetchMessages = props.fetchMessages;

  const [inputMessage, setInputMessage] = useState("");

  const handleNewMessage = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputMessage,
      }),
    });
    const info = await res.json();
    if (info.success) {
      fetchMessages();
      setInputMessage("");
    }
  };

  return (
    <>
      <form className="main-form" onSubmit={handleNewMessage}>
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          type="text"
          placeholder="Write a message"
        />
        <button className="post-btn" type="submit">
          Post Message
        </button>
      </form>
    </>
  );
}
