// Este código importa la librería Express.js e inicializa una aplicación Express.
const express = require("express");
const app = express();

// Este código importa dos arrays con datos sobre animales del zodiaco chino y signos del zodiaco occidental.
const zodiacAnimals = require("./zodiacAnimals");
const zodiacSigns = require("./zodiacSigns");

// Este código establece una ruta para la página de inicio, que simplemente envía la cadena "home" como respuesta.
app.get("/", (req, res) => {
  res.send("home");
});

// Este código establece una ruta para la página de astrología china, que toma un año como parámetro y devuelve el animal del zodiaco correspondiente y su descripción.
app.get("/astrologia-china/:date", (req, res) => {
  const year = parseInt(req.params.date.slice(0, 4));
  const animal = zodiacAnimals.find((element) => element.dates.includes(year));
  res.send(`<h1>Eres ${animal.animal}!</h1>
            <div>${animal.description}</div>`);
});

// Este código establece una ruta para la página del zodiaco occidental, que toma una fecha en formato MMDD y devuelve el signo del zodiaco correspondiente y su descripción.
app.get("/zodiaco/:date", (req, res) => {
  const date = parseInt(req.params.date.slice(4));
  const index = zodiacSigns.findIndex(
    (element) => element.start <= date && element.end >= date
  );
  res.send(`<h1>Tu signo es ${zodiacSigns[index].zodiacSign}</h1>
            <div>${zodiacSigns[index].description}</div>`);
});
// Este código establece una ruta para todas las demás páginas que no tienen una ruta definida, que devuelve un mensaje de error.
app.get("*", (req, res) => {
  res.status(400).send("Página no encontrada :(");
});

// Este código inicia el servidor en el puerto 3000 y muestra un mensaje en la consola indicando que el servidor ha comenzado.
app.listen("3000", () => {
  console.log("¡Servidor iniciado!");
});
