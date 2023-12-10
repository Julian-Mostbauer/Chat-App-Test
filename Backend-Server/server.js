const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json()); // for parsing application/json

app.post('/save', (req, res) => {
  const newMessage = req.body;

  fs.readFile('C:/Users/julia/OneDrive/Dokumente/GitHub/Chat-App-Test/Chat-App-Test/public/Data/history.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Fehler beim Lesen der Datei:', err);
      return res.status(500).send('Error reading file');
    }

    // Parsen Sie die gelesenen Daten in ein JavaScript-Objekt
    const obj = JSON.parse(data);

    // Fügen Sie die neue Nachricht zum messages-Array hinzu
    obj.messages.push(newMessage);

    // Schreiben Sie das aktualisierte Objekt zurück in die Datei
    fs.writeFile('C:/Users/julia/OneDrive/Dokumente/GitHub/Chat-App-Test/Chat-App-Test/public/Data/history.json', JSON.stringify(obj, null, 2), (err) => {
      if (err) {
        console.error('Fehler beim Schreiben der Datei:', err);
        return res.status(500).send('Error writing file');
      } else {
        res.status(200).send('Successfully wrote to file');
        console.log('Successfully wrote to file')
      }
    });
  });
});

app.listen(3000, () => console.log('Server is running'));

app.get("/", (req, res) => {res.send("You should not get")})
