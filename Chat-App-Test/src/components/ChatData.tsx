export class ChatData {
  chat_id: string;
  chat_name: string;
  participants: Participant[];
  messages: Message[];

  constructor(
    chat_id: string,
    chat_name: string,
    participants: Participant[],
    messages: Message[]
  ) {
    this.chat_id = chat_id;
    this.chat_name = chat_name;
    this.participants = participants;
    this.messages = messages;
  }
}

export class Participant{
  name: string;
  id: string;

  constructor(name: string, id:string){
    this.name = name;
    this.id = id;
  }
}
export class Message{
  sender_id: string; 
  text: string; 
  timestamp: number;

  constructor(sender_id: string, text:string, timestamp:number){
    this.sender_id = sender_id;
    this.text = text;
    this.timestamp = timestamp;
  }
}