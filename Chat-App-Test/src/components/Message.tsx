import ChatData from "./ChatData";

interface props {
  Data: {sender_id: string; text: string; timestamp: string };
}

export default function Message(Input: props) {
  const data = Input.Data;
  return (
    <>
      <h1>{data.text}</h1>
      <h1>{data.text}</h1>
    </>
  );

}

function name_from_id(data: ChatData, id: string) {
  let search_result = "error - unable to find sender";
  data.participants.forEach((participant) => {
    if (participant.id == id) {
      search_result = participant.name;
    }
  });

  return search_result;
}
