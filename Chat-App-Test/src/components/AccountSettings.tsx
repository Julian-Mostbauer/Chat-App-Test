import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useRef, useState } from "react";

import { Participant } from "./ChatData";
import {getTunnel, getLocal} from "./URLs";

interface props {
  IP: string;
}

export default function AccountSettings(Input: props) {
  const inputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const text = inputRef.current.value;
    inputRef.current.value = ""; // Clear Input Box

    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    const newData = new Participant(text, Input.IP, timestamp);
    change_name(newData);
  };

  return (
    <>
      <Popup
        trigger={<button className="SettingButton">Settings</button>}
        position="left top"
      >
        <div className="SettingMenu">
          <form onSubmit={submitHandler}>
            <p>Change Name:</p>
            <input ref={inputRef} />
            <button type="submit" className="SettingSubmitButton">
              Submit
            </button>
          </form>
        </div>
      </Popup>
    </>
  );
}

function change_name(newData: Participant) {
  fetch(getTunnel() + "/rename", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Error:", error);
    });
}
