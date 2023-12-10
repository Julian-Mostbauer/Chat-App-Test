import { useRef, useState } from "react";

interface props {
  Sender: string;
}

class Message {
  sender_id: string;
  text: string;
  timestamp: number;

  constructor(
    sender_id: string,
    text: string,
    timestamp: number,
  ) {
    this.sender_id = sender_id;
    this.text = text;
    this.timestamp = timestamp;
  }
}

export default function ChatSendBox(Input: props) {
  const inputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    const text = inputRef.current.value;
    inputRef.current.value = ""; // Clear Input Box

    const message = new Message(Input.Sender, text, timestamp)

    console.log(JSON.stringify(message));
  };

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <input ref={inputRef} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
