import { useState, useEffect } from 'react'
import './App.css'


import ChatTitleBar from './components/ChatTitleBar'
import ChatArea from './components/ChatArea'
import ChatData from './components/ChatData'
import ChatSendBox from './components/ChatSendBox'
import GetIP from './components/IP'

function App() {
  const [chatData, setChatData] = useState(new ChatData("0","ERROR - LOADING CHAT NOT POSSIBLE", [], []));
  const [IP, setIP] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('Data/history.json');
      const data = await response.text();
      setChatData(JSON.parse(data));
    };
 
    fetchData();
  }, []);

  GetIP(setIP);

  return (
    <>
      <ChatTitleBar Name={chatData.chat_name}/>
    <p>Logged in as {IP.padStart(3, "?")}</p> 
      <ChatArea Data={chatData}/>
      <ChatSendBox Sender={IP}/>
    </>
  )
}

export default App
