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

app.use(express.static("public"));

app.get("/data", (req, res) => {
  res.json({ humidity: humidityData });
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
