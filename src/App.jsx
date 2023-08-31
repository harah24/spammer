import "./App.css";
import { useEffect, useState } from "react";
import { API } from "./api";
import Messages from "./components/Messages";
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

  console.log(messages);
  return (
    <>
      <h1>Spammer</h1>

      <NewMessage fetchMessages={fetchMessages} />

      {messages.map((message) => (
        <Messages
          key={message.id}
          messages={message}
          fetchMessages={fetchMessages}
        />
      ))}
    </>
  );
}

export default App;
