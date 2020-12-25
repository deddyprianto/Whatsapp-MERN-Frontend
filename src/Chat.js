import React, { useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";
import axios from "./axios";
import { useStateValueContext } from "./StateProvider";
function Chat({ message }) {
  const [{ user }, dispatch] = useStateValueContext();
  const [input, setInput] = useState("");
  // ketika tombol  send input di tekan
  const handlerButton = async (e) => {
    const tanggal = new Date();
    e.preventDefault();
    await axios.post("/api/backend", {
      message: input,
      name: user.username,
      timestamp: tanggal,
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src="/img/1.jpg" />
        <div className="chat__headerInfo">
          <h3>{user.username}</h3>
          <p>Online</p>
        </div>
        <div className="chat__headerRight">
          <IconButton children={<SearchOutlined />} />
          <IconButton children={<AttachFile />} />
          <IconButton children={<MoreVert />} />
        </div>
      </div>
      {/* ending */}
      <div className="chat__body">
        {message.map((data) => (
          <p
            className={`chat__message ${
              data.name === user.username && "chat__receiver"
            }`}
          >
            <span className="chat__name">{data.name}</span>
            {data.message}
            <span className="chat__timestamp">{data.timestamp}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
          />
          <button onClick={handlerButton} type="submit"></button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
