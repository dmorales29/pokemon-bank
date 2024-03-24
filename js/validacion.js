export function alert() {document
  .getElementById("botonFiltrar")
  .onclick(
    swal(
      "Error",
      "La fecha final debe ser mayor a la fecha inicial.",
      "error"
    )
  );
}
