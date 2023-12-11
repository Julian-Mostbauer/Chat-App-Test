interface props {
  Data: {sender_id: string; text: string; timestamp: number };
  Participants: { name: string; id: string; avatar: string }[];
  CurrentUser_id: string
}

export default function Message(Input: props) {
  const data = Input.Data;
  const name = name_from_id(Input.Participants, data.sender_id);
  const owner_status = data.sender_id == Input.CurrentUser_id ? "Self" : "Other";
  return (
    <>
    <div className={"MessageContainer-" + owner_status}>
      <p className={"MessageSenderName-" + owner_status}>{name != "error - unable to find sender" ? name : Input.CurrentUser_id}</p>
      <p className={"MessageContent-" + owner_status}>{data.text}</p>
    </div>
    </>
  );

}

function name_from_id(participant_data: { name: string; id: string; avatar: string }[], id: string) {
  let search_result = "error - unable to find sender";
  participant_data.forEach((participant) => {
    if (participant.id == id) {
      search_result = participant.name;
    }
  });

  return search_result;
}
