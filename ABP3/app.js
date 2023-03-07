const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");

//Establecer la ubicacion de los partials
const partialsDir = path.join(__dirname, "views", "partials");
// Registrar todas las partials en el directorio
hbs.registerPartials(partialsDir);

const countries = require("./countries.js");
const data = countries
  .map((element) => {
    const valores = Object.values(element);
    return valores.map((value) => value);
  })
  .flat();
//hbs.registerPartial("card", "{{card}}");
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("index", { data });
});

app.listen(3000, () => {
  console.log("Servidor iniciado");
});
