interface props {
  Name: string;
}

export default function ChatTitleBar(Input: props) {
  return (
    <>
      <div className="ChatTitleBarContainer">
        <h2>{Input.Name}</h2>
      </div>
    </>
  );
}
