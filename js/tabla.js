function dataTableFormat() {
  //funcion para llenar la tabla que muestra el historico de transacciones
  const table = document.getElementById("tablaTransacciones");
  let misTransacciones = JSON.parse(localStorage.getItem("misTransacciones"));
  table.innerHTML ='';

  var inicio = document.getElementById("start").value;
  var fin = document.getElementById("end").value;

  const formatoDate = (fechaISO) =>{
    const fecha =new Date(fechaISO);
    const year = fecha.getFullYear();
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const dia = ('0' + fecha.getDate()).slice(-2);
    return  `${year}-${mes}-${dia}`;
}


  //filtra todas las transacciones retrieved del localStorage basadas en la fecha del datePicker
  misTransacciones
    .filter(
      (element) =>
        new Date(formatoDate(element.fecha)) >= new Date(formatoDate(inicio)) &&
        new Date(formatoDate(element.fecha)) <= new Date(formatoDate(fin))
        
    )
    .forEach((element) => {
      //crea una fila para cada una de las transacciones retrieved del localStorage   
        
      const fila = table.insertRow();
      const cellDate = fila.insertCell(0);
      const cellTipo = fila.insertCell(1);
      const cellMonto = fila.insertCell(2);
      cellDate.textContent = formatoDate(element.fecha);
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
