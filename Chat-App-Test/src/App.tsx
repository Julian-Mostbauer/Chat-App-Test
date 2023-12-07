import { useState, useEffect } from 'react'
import './App.css'


import ChatTitleBar from './components/ChatTitleBar'
import ChatArea from './components/ChatArea'
import ChatData from './components/ChatData'
import ChatSendBox from './components/ChatSendBox'

function App() {
  const [chatData, setChatData] = useState(new ChatData("0","ERROR - LOADING CHAT NOT POSSIBLE", [], []));

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('Data/history.json');
      const data = await response.text();
      setChatData(JSON.parse(data));
    };
 
    fetchData();
  }, []);



  return (
    <>
      <ChatTitleBar Name={chatData.chat_name}/>
      <ChatArea Data={chatData}/>
      <ChatSendBox/>
      
    </>
  )
}

export default App
