import './App.css';
import io from "socket.io-client";
import { nanoid } from "nanoid";
import { useEffect, useState } from 'react';

const socket = io.connect("http://localhost:5000")
const userName = nanoid(4);

function App() {

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  }

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChats([...chats, payload]);
    })
  });

  return (
    <div className="App">
      <header className="App-header">
        <h3>Chat App - LD</h3>
        <form onSubmit={sendChat}>
          <input type="text" placeholder="send messsage..." name="chat" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button type="submit">Send</button>
        </form>
        {chats.map((payload, index) => {
          return <>
            <p key={index}>{payload.userName} : {payload.message}</p>
          </>
        })}
      </header>
    </div>
  );
}

export default App;
