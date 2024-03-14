import  {getDatos, generarTransaccion, consolidar} from './transacciones.js';

const transacciones = []; //generar las dummy transactions

for (let i = 0; i<15; i++) {
    transacciones.push(generarTransaccion());
}

/* const datos = getDatos(transacciones); */

const datos = consolidar(transacciones);
let d = datos.deposito;
let r = datos.retiro;
let p = datos.pago;
console.log(d);
console.log(r);
console.log(p);

document.getElementById('depositos_valor').textContent = d;
document.getElementById('retiros_valor').textContent = r;
document.getElementById('pagos_valor').textContent = p;


for (let index = 0; index < datos.length; index++) {
    console.log(transacciones[index]);
    
}
// Obtener el contexto del canvas
var ctx = document.getElementById('doughnutChart').getContext('2d');

// Crear el gráfico
var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut', //tipo del grafico
    data: {
        // Etiquetas para cada sección del gráfico
        labels: ["Deposito", "Retiro","Pago"],
        datasets: [{
            label: 'Transacciones',
            // Datos reales para cada sección
            data: [d,r,p],
            // Colores de fondo para cada sección
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            // Colores de borde para cada sección
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            // Ancho del borde de cada sección
            borderWidth: 1
        }]
    },
    // Opciones de configuración del gráfico
    options: {
        // Permitir que el gráfico sea responsive (se adapte al tamaño del contenedor)
        responsive: true,
        // Configuración de plugins (en este caso, legend y title)
        plugins: {
            // Configuración de la leyenda
            legend: {
                // Posición de la leyenda (en la parte superior)
                display: true,
                position: 'top',
                labels: {
                    color: 'rgb(0,0,0)',
                    
                }
            },
            title: {
                display: true,
                text: 'Mis transacciones'
            }
        }
    }
});