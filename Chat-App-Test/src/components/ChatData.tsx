export default class ChatData {
  chat_id: string;
  chat_name: string;
  participants: { name: string; id: string; avatar: string }[];
  messages: { sender_id: string; text: string; timestamp: number }[];

  constructor(
    chat_id: string,
    chat_name: string,
    participants: { name: string; id: string; avatar: string }[],
    messages: { sender_id: string; text: string; timestamp: number }[]
  ) {
    this.chat_id = chat_id;
    this.chat_name = chat_name;
    this.participants = participants;
    this.messages = messages;
  }
}