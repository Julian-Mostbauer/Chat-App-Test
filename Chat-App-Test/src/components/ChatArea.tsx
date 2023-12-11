import Message from './Message.tsx'
import {ChatData} from './ChatData'
interface props {
  Data: ChatData;
  IP: string
}

export default function ChatArea(Input: props) {
 
  const chat_history = Input.Data.messages.map(message => 
    <ul key={message.timestamp}>
      <Message Data={message} Participants={Input.Data.participants} CurrentUser_id={Input.IP}/>
    </ul>
  )

  return (
    <>
      <div className="ChatArea">
        {chat_history}
      </div>
    </>
  );
}
