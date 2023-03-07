const express = require("express");
const app = express();
const hbs = require("hbs");

const countries = require("./countries.js");

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render(
    "index",
    { countries }
    /*    countries.forEach((element) => {
      for (let clave in element) {
        console.log(element[clave].Continente);
        return {
          continente: element[clave].Continente,
        };
      }
    })*/
  );
});

app.listen(3000, () => {
  console.log("Servidor iniciado");
});
