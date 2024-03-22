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
            data: [d,r,p],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
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
                text: 'Mis transacciones',
                font : {
                    size: 30,
                }
            }
        }
    }
}

);