// Se imprime en la salida estándar un mensaje pidiendo al usuario que ingrese la fecha de inicio del período de pago.
process.stdout.write("Introduce la fecha de inicio (AAAA-MM-DD):");

// Se inicializan las variables startDate y endDate con el valor null.
let startDate = null;
let endDate = null;

// Se define un evento en el objeto process.stdin que se activará cada vez que el usuario ingrese datos en la consola.
process.stdin.on("data", function (data) {
  // Si startDate es null, se establece sux` valor como la fecha ingresada por el usuario mediante el objeto Date de JavaScript.
  if (startDate === null) {
    startDate = new Date(data);
    // Se imprime en la salida estándar un mensaje pidiendo al usuario que ingrese la fecha final del período de pago.
    process.stdout.write("Introduce la fecha final (AAAA-MM-DD): ");
  }
  // Si startDate no es null, se verifica si endDate es null.
  else if (endDate === null) {
    // Se establece el valor de endDate como la fecha ingresada por el usuario mediante el objeto Date de JavaScript.
    endDate = new Date(data);

    // Se inicializan dos arreglos vacíos: weekValues y saturdayValues.
    let weekValues = [];
    let saturdayValues = [];

    // Se definen las constantes weekHourValue y saturdayHourValue.
    const weekHourValue = 7100;
    const saturdayHourValue = 12300;

    // Se utiliza un ciclo for para iterar sobre cada día del período de pago.
    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      // Se utiliza el método toLocaleDateString para obtener el nombre corto del día de la semana en español Chile.
      const weekDay = date.toLocaleDateString("es-CL", {
        weekday: "short",
      });

      // Se inicializa la variable value en 0.
      let value = 0;

      // Se utiliza una sentencia switch para asignar la cantidad de horas trabajadas según el día de la semana.
      switch (weekDay) {
        case "lun":
        case "mié":
        case "vie":
          value = 7;
          weekValues.push(value);
          break;
        case "mar":
        case "jue":
          value = 8;
          weekValues.push(value);
          break;
        case "sáb":
          value = 5;
          saturdayValues.push(value);
          break;
        default:
      }
    }

    // Se calcula la cantidad total de horas trabajadas de lunes a viernes y los sábados, y el monto total a pagar.
    const weekhours = weekValues.reduce((a, b) => a + b, 0);
    const weekPayment = weekhours * weekHourValue;
    const saturdayhours = saturdayValues.reduce((a, b) => a + b, 0);
    const saturdayPayment = saturdayhours * saturdayHourValue;
    const total = weekPayment + saturdayPayment;

    // Se genera el mensaje que se imprimirá en la consola.
    const ouput = `Cantidad Horas Trabajadas Lun-Vie:${weekhours} hrs.
Valor hora=${"$" + Intl.NumberFormat("es-CL").format(weekHourValue)}
SubTotal = ${"$" + Intl.NumberFormat("es-CL").format(weekPayment)}
--------------------------------------------------
Cantidad Horas Trabajadas Sáb:${saturdayhours} hrs.
Valor hora=${"$" + Intl.NumberFormat("es-CL").format(saturdayHourValue)}
SubTotal = ${"$" + Intl.NumberFormat("es-CL").format(saturdayPayment)}

Total a pagar = ${
      "$" +
      Intl.NumberFormat("es-CL").format(weekPayment) +
      " + " +
      "$" +
      Intl.NumberFormat("es-CL").format(saturdayPayment) +
      " = " +
      "$" +
      Intl.NumberFormat("es-CL").format(total)
    }`;

    // Se imprime el mensaje en la consola.
    console.log(ouput);

    // Se finaliza la ejecución del programa.
    process.exit();
  }
});
