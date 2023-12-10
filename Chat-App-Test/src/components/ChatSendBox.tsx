import { useRef, useState } from "react";

export default function ChatSendBox() {
  const [val, setVal] = useState('');
  const inputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    setVal(inputRef.current.value);
  }

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <input ref={inputRef} />
        <button type="submit">Submit</button>
      </form>

      <p>Submit Value: <b>{val}</b></p>
    </div>
  );
}