import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useRef, useState } from "react";

import {Participant} from "./ChatData";

interface props {
  IP: string;
}

export default function AccountSettings(Input: props) {
  const inputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const text = inputRef.current.value;
    inputRef.current.value = ""; // Clear Input Box

    const newData = new Participant(text, Input.IP);
    change_name(newData)
  };

  return (
    <>
      <Popup trigger={<button>Settings</button>} position="bottom center">
        <div className="App">
          <form onSubmit={submitHandler}>
            <p>Change Name:</p>
            <input ref={inputRef} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </Popup>
    </>
  );
}

function change_name(newData: Participant){
  fetch('http://localhost:3000/rename', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch((error) => {
    console.error('Error:', error);
  });
}