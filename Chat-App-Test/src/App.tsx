import { useState, useEffect } from "react";
import "./App.css";

import ChatTitleBar from "./components/ChatTitleBar";
import ChatArea from "./components/ChatArea";
import {ChatData} from "./components/ChatData";
import ChatSendBox from "./components/ChatSendBox";
import GetIP from "./components/IP";
import AccountSettings from "./components/AccountSettings";
import Hash from "./components/Hash.tsx";
import {getTunnel, getLocal} from "./components/URLs";
import { DummyHistory } from "./components/DummyHistory.tsx";

function App() {
  const [chatData, setChatData] = useState(
    DummyHistory()
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

  const ServerAdress = getLocal();

  return (
    <>
      <AccountSettings IP={Hash(IP)} Adress={ServerAdress} UpdateFunction={setChatData}/>
      <ChatTitleBar Name={chatData.chat_name} />
      <ChatArea Data={chatData} IP={Hash(IP)}/>
      <ChatSendBox Sender={Hash(IP)} Adress={ServerAdress} UpdateFunction={setChatData}/>
    </>
  );
}

export default App;
