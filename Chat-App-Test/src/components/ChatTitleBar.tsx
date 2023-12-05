interface props {
  Name: string;
}

export default function ChatTitleBar(Input: props) {
  return (
    <>
      <div className="ChatTitleBarContainer">
        <h1>{Input.Name}</h1>
      </div>
    </>
  );
}
