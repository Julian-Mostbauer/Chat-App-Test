import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useRef, useEffect } from "react";

import { Participant } from "./ChatData";

interface props {
  IP: string;
  Adress:string;
  UpdateFunction: any;
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
    change_name(newData, Input.Adress);
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

function change_name(newData: Participant, adress:string) {
  fetch(adress + "/rename", {
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
