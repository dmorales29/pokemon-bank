function dataTableFormat() {
  //funcion para llenar la tabla que muestra el historico de transacciones
  const table = document.getElementById("tablaTransacciones");
  let misTransacciones = JSON.parse(localStorage.getItem("misTransacciones"));

  var inicio = document.getElementById("start").value;
  var fin = document.getElementById("end").value;

  //filtra todas las transacciones retrieved del localStorage basadas en la fecha del datePicker
  misTransacciones
    .filter(
      (element) =>
        new Date(element.fecha) >= new Date(inicio) &&
        new Date(element.fecha) <= new Date(fin)
    )
    .forEach((element) => {
      //crea una fila para cada una de las transacciones retrieved del localStorage
      const fila = table.insertRow();
      const cellDate = fila.insertCell(0);
      const cellTipo = fila.insertCell(1);
      const cellMonto = fila.insertCell(2);
      cellDate.textContent = element.fecha;
      cellTipo.textContent = element.tipo;
      cellMonto.textContent = "$ " + element.monto.toFixed(2);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const botonFiltrar = document.getElementById("botonFiltrar");
  if (botonFiltrar) {
    botonFiltrar.addEventListener("click", dataTableFormat);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const botonFiltrar_sm = document.getElementById("botonFiltrar-sm");
  if (botonFiltrar_sm) {
    botonFiltrar_sm.addEventListener("click", dataTableFormat);
  }
});
