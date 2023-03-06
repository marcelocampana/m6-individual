let fecha1 = new Date("2022-03-01");
let fecha2 = new Date("2022-02-01");

let diferenciaEnMilisegundos = fecha1 - fecha2;

let dias = diferenciaEnMilisegundos / (1000 * 60 * 60);

console.log("La diferencia entre las fechas es de " + dias + " días.");
