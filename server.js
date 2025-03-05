const express = require("express");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const app = express();
const port = 3000;

// Mets le bon port COM ici
const serialPort = new SerialPort({ path: "COM16", baudRate: 9600 });
const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\n" }));

let humidityData = "Aucune donnée";

parser.on("data", (data) => {
    console.log(`Donnée reçue : ${data}`);
    humidityData = data.trim();
});

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static("public"));

app.get("/data", (req, res) => {
  try {
      let parsedData = JSON.parse(humidityData); // Convertir la chaîne en JSON
      res.json({ humidity: parsedData.value }); // Retourner uniquement la valeur
  } catch (error) {
      res.json({ humidity: "Erreur" });
  }
});

// Redirection vers index.html si on accède à la racine
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
