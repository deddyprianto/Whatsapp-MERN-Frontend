import React, { useContext } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { ContextProvider } from "./App";
function SidebarChat() {
  const data = useContext(ContextProvider);
  return (
    <div className="sidebarChat">
      <Avatar src="/img/1.jpg" />
      <div className="sidebarChat__info">
        <h2>Deddy Prianto</h2>
        <p>Hai Deddy</p>
      </div>
    </div>
  );
}

export default SidebarChat;
