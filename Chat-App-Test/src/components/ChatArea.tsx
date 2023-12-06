import ChatData from './ChatData'
interface props {
  Data: ChatData;
}

export default function ChatArea(Input: props) {
 
  const chat_history = Input.Data.messages.map(message => 
    <ul key={message.timestamp}>
      <span>{name_from_id(Input.Data, message.sender_id)}</span>
      <p>{message.text}</p>
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

function name_from_id(data: ChatData, id: string){
  let search_result = "error - unable to find sender"
  data.participants.forEach(participant => {
    if (participant.id == id){
      search_result = participant.name
    }
  });

  return search_result
}