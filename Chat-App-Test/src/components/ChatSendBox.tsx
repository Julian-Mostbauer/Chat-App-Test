import { FormEventHandler, useRef } from "react";
import {Message} from "./ChatData";
import { useState, useEffect } from "react";
import UpdateChat from "./UpdateChat";
import { ChatData } from "./ChatData";

interface props {
  Sender: string;
  Adress: string;
  UpdateFunction: any;
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


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("Data/history.json");
      const data = await response.text();
      console.log(data)
      Input.UpdateFunction(JSON.parse(data));
    };
    fetchData();
  }, [Input]);

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
