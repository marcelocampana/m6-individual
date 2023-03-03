process.stdout.write("Introduce la fecha de inicio (AAAA-MM-DD):");

let startDate = null;
let endDate = null;

process.stdin.on("data", function (data) {
  if (startDate === null) {
    startDate = new Date(data);
    process.stdout.write("Introduce la fecha final (AAAA-MM-DD): ");
  } else if (endDate === null) {
    endDate = new Date(data);

    let values = [];
    let valuesSaturday = [];
    const weekHourValue = 7100;
    const saturdayHourValue = 12300;
    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const weekDay = date.toLocaleDateString("es-CL", {
        weekday: "short",
      });

      let value = 0;

      switch (weekDay) {
        case "lun":
          value = 7;
          values.push(value);
          break;
        case "mar":
          value = 8;
          values.push(value);
          break;
        case "mié":
          value = 7;
          values.push(value);
          break;
        case "jue":
          value = 8;
          values.push(value);
          break;
        case "vie":
          value = 7;
          values.push(value);
          break;
        case "sáb":
          value = 5;
          valuesSaturday.push(value);
          break;
        default:
      }
    }
    const weekhours = values.reduce((a, b) => a + b, 0);
    const weekPayment = weekhours * weekHourValue;
    const saturdayhours = valuesSaturday.reduce((a, b) => a + b, 0);
    const saturdayPayment = saturdayhours * saturdayHourValue;
    const total = weekPayment + saturdayPayment;

    const ouput = `Cantidad Horas Lun-Vie:${weekhours} hrs.
    valor hora=${"$" + Intl.NumberFormat("es-CL").format(weekHourValue)}
    SubTotal = ${"$" + Intl.NumberFormat("es-CL").format(weekPayment)}
    ----------------------------------------------------------------
    Cantidad Horas Sáb:${saturdayhours} hrs.
    valor hora=${"$" + Intl.NumberFormat("es-CL").format(saturdayHourValue)}
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

    console.log(ouput);
    process.exit();
  }
});
