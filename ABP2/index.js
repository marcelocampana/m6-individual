const express = require("express");
const app = express();
const zodiacAnimals = require("./zodiacAnimals");
const zodiacSigns = require("./zodiacSigns");

app.get("/", (req, res) => {
  res.send("home");
});
app.get("/astrologia-china", (req, res) => {
  const year = parseInt(req.query.date.slice(0, 4));
  const animal = zodiacAnimals.find((element) => element.dates.includes(year));
  res.send(
    `Tú animal correspondiente al zodíaco chino es <strong>${animal.animal}<strong>`
  );
});
app.get("/zodiaco", (req, res) => {
  const date = parseInt(req.query.date.slice(4));
  console.log(zodiacSigns);
  const index = zodiacSigns.findIndex(
    (element) => element.start <= date && element.end >= date
  );

  console.log(index);

  res.send(`Tu signo es ${zodiacSigns[index].zodiacSign}`);
});
app.get("*", (req, res) => {
  res.status(400).send("Página no encontrada :(");
});

app.listen("3000", () => {
  console.log("server start!");
});
