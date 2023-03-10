// Importar Express
const express = require("express");
// Crear una instancia de la aplicación
const app = express();
// Importar el módulo File System de Node.js
const fs = require("fs");
// Importar el módulo Path de Node.js
const path = require("path");
// Definir la ruta del archivo JSON
const filePath = path.join(__dirname, "data/menu.json");
console.log(filePath);

// Definir la ruta principal "/"
app.get("/", (req, res) => {
  // Leer el archivo JSON
  fs.readFile(filePath, "utf-8", (err, data) => {
    console.log(data);
    if (err) throw err;

    // Imprimir el objeto JSON en la consola
    console.log(data);
    // Enviar el objeto JSON como respuesta
    res.send(data);
  });
});

// Definir la ruta "/actualizar-json/:nombre/:precio"
app.get("/update-json/:nombre/:precio", (req, res) => {
  // Leer el archivo JSON
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      throw err;
    } else if (req.params.nombre && req.params.precio) {
      // Convertir el contenido del archivo a un objeto JSON
      const jsonData = JSON.parse(data);
      // Agregar un nuevo objeto al array "almuerzos"
      jsonData.almuerzos.push({
        nombre: req.params.nombre,
        precio: parseInt(req.params.precio),
      });
      // Convertir el objeto JSON actualizado a una cadena de texto
      const newJsonData = JSON.stringify(jsonData);
      // Escribir el nuevo objeto JSON en el archivo
      fs.writeFile(filePath, newJsonData, "utf-8", (err) => {
        if (err) throw err;
        // Imprimir el objeto JSON actualizado en la consola
        console.log(jsonData);
        // Enviar el objeto JSON actualizado como respuesta
        res.send(jsonData);
      });
    }
  });
});

// Definir la ruta "/eliminar-json/:nombre"
app.get("/delete-json/:nombre", (req, res) => {
  // Leer el archivo JSON
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      throw err;
    } else if (req.params.nombre) {
      // Convertir el contenido del archivo a un objeto JSON
      const jsonData = JSON.parse(data);
      // Filtrar los objetos del array "almuerzos" que no tienen el nombre especificado
      let filterJsonData = jsonData.almuerzos.filter(
        (element) => element.nombre !== req.params.nombre
      );
      // Crear un nuevo objeto JSON con el array filtrado
      filterJsonData = { almuerzos: filterJsonData };
      // Convertir el objeto JSON filtrado a una cadena de texto
      const newJsonData = JSON.stringify(filterJsonData);
      // Escribir el nuevo objeto JSON en el archivo
      fs.writeFile(filePath, newJsonData, "utf-8", (err) => {
        if (err) throw err;
        // Imprimir el objeto JSON filtrado en la consola
        console.log(newJsonData);
        // Enviar el objeto JSON filtrado como respuesta
        res.send(newJsonData);
      });
    }
  });
});

// Definir la ruta por defecto ""
app.get("*", (req, res) => {
  // enviar respuesta de error para cualquier otra ruta que no se haya definido
  res.status(400).send("Página no encontrada");
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  // Imprimir un mensaje en la consola cuando el servidor esté corriendo
  console.log("Servidor corriendo");
});
