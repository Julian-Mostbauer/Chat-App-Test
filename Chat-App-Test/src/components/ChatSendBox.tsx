import { FormEventHandler, useRef } from "react";

interface props {
  Sender: string;
  Adress: string;
}

class Message {
  sender_id: string;
  text: string;
  timestamp: number;

  constructor(sender_id: string, text: string, timestamp: number) {
    this.sender_id = sender_id;
    this.text = text;
    this.timestamp = timestamp;
  }
}

export default function ChatSendBox(Input: props) {
  const inputRef = useRef();

  const submitHandler = (e: FormEventHandler<HTMLFormElement>) => {
    e.preventDefault();

    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    const text = inputRef?.current?.value;
    inputRef.current.value = ""; // Clear Input Box

    const message = new Message(Input.Sender, text, timestamp);

    if (text != "") {
      send_message(message, Input.Adress);
    } else {
      inputRef.current.value = prompt("Enter your Message first");
    }
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

function send_message(data: Message, adress: string) {
  fetch(adress + "/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Error:", error);
    });
}
