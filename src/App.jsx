import "./App.css";
import { useEffect, useState } from "react";
import { API } from "./api";
import Message from "./components/Message";
import NewMessage from "./components/NewMessage";

function App() {
  const [messages, setMessages] = useState([]);

  async function fetchMessages() {
    const res = await fetch(`${API}/messages`);
    const info = await res.json();
    setMessages(info.messages);
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <h1>Spammer</h1>

      <NewMessage fetchMessages={fetchMessages} />

      {messages.map((message) => (
        <Message
          key={message.id}
          messages={message}
          fetchMessages={fetchMessages}
        />
      ))}
    </>
  );
}

export default App;
