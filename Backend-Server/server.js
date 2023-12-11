const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json()); // for parsing application/json

app.post("/save", (req, res) => {
  const newMessage = req.body;

  if (securityCheck(newMessage)) {
    fs.readFile(
      "C:/Users/julia/OneDrive/Dokumente/GitHub/Chat-App-Test/Chat-App-Test/public/Data/history.json",
      "utf8",
      (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return res.status(500).send("Error reading file");
        }

        const obj = JSON.parse(data);
        obj.messages.push(newMessage);

        fs.writeFile(
          "C:/Users/julia/OneDrive/Dokumente/GitHub/Chat-App-Test/Chat-App-Test/public/Data/history.json",
          JSON.stringify(obj, null, 2),
          (err) => {
            if (err) {
              console.error("Error writing file:", err);
              return res.status(500).send("Error writing file");
            } else {
              res
                .status(200)
                .send(
                  "Successfully wrote to file\n" +
                    `${JSON.stringify(newMessage)}`
                );
              console.log(
                "Successfully wrote to file\n" + `${JSON.stringify(newMessage)}`
              );
            }
          }
        );
      }
    );
  } else {
    console.error("Invalid Identifier", JSON.stringify(newMessage));
    return res.status(400).send("Error - Invalid Identifier");
  }
});

app.post("/rename", (req, res) => {
  const newData = req.body;
  console.log("--------------------------------------------")
  console.log(req);
  console.log("--------------------------------------------")

  if (securityCheck(newData)) {
    fs.readFile(
      "C:/Users/julia/OneDrive/Dokumente/GitHub/Chat-App-Test/Chat-App-Test/public/Data/history.json",
      "utf8",
      (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return res.status(500).send("Error reading file");
        }

        const obj = JSON.parse(data);

        let isNew = true;
        obj.participants.forEach((participant) => {
          if (participant.id == newData.id) {
            participant.name = newData.name;
            isNew = false;
          }
        });

        if (isNew) {
          obj.participants.push(newData);
        }

        fs.writeFile(
          "C:/Users/julia/OneDrive/Dokumente/GitHub/Chat-App-Test/Chat-App-Test/public/Data/history.json",
          JSON.stringify(obj, null, 2),
          (err) => {
            if (err) {
              console.error("Error writing file:", err);
              return res.status(500).send("Error writing file");
            } else {
              res
                .status(200)
                .send("Successfully renamed\n" + `${JSON.stringify(newData)}`);
              console.log(
                "Successfully renamed\n" + `${JSON.stringify(newData)}`
              );
            }
          }
        );
      }
    );
  }
});

app.listen(3000, () => console.log("Server is running"));

app.get("/", (req, res) => {
  res.send("You should not get");
});

function getDiff(messageTimestamp) {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();

  const diff = timestamp - messageTimestamp;
  return diff;
}

function securityCheck(newMessage) {
  const diff = getDiff(Number(newMessage.timestamp));

  return diff > 0 && diff < 2000;
}

