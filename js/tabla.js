import { generarTransaccion } from "./transacciones.js";

const formatoDate = (fechaISO) =>{
    const fecha =new Date(fechaISO);
    const year = fecha.getFullYear();
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const dia = ('0' + fecha.getDate()).slice(-2);
    return  `${year}-${mes}-${dia}`;
}

export function dataTableFormat() {
    const table = document.getElementById('tablaTransacciones');
    
    for (let  i = 0; i < 15; i++) {
        const transaccion = generarTransaccion();
        const fila =table.insertRow();
        const cellDate = fila.insertCell(0);
        const cellTipo = fila.insertCell(1);
        const cellMonto = fila.insertCell(2);
        
        cellDate.textContent = formatoDate(transaccion.fecha);
        cellTipo.textContent = transaccion.tipo;
        cellMonto.textContent = transaccion.monto;
    }
    
}

document.addEventListener('DOMContentLoaded',() =>{
    const botonFiltrar = document.getElementById('botonFiltrar');
    if (botonFiltrar) {
        botonFiltrar.addEventListener('click',dataTableFormat)
        
    }
});
