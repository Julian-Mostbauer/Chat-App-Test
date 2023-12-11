import { useState, useEffect } from "react";
import "./App.css";

import ChatTitleBar from "./components/ChatTitleBar";
import ChatArea from "./components/ChatArea";
import {ChatData} from "./components/ChatData";
import ChatSendBox from "./components/ChatSendBox";
import GetIP from "./components/IP";
import AccountSettings from "./components/AccountSettings";
import Hash from "./components/Hash.tsx";

function App() {
  const [chatData, setChatData] = useState(
    new ChatData("0", "ERROR - LOADING CHAT NOT POSSIBLE", [], [])
  );
  const [IP, setIP] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("Data/history.json");
      const data = await response.text();
      setChatData(JSON.parse(data));
    };

    fetchData();
  }, []);

  GetIP(setIP);
  return (
    <>
      <AccountSettings IP={Hash(IP)}/>
      <ChatTitleBar Name={chatData.chat_name} />
      <ChatArea Data={chatData} IP={Hash(IP)} />
      <ChatSendBox Sender={Hash(IP)} />
    </>
  );
}

export default App;
