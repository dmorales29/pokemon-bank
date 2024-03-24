
import { dataTableFormat } from './tabla.js';
import  {getDatos, generarTransaccion, consolidar} from './transacciones.js';

document.addEventListener('DOMContentLoaded', ()=>{
const thisPage =window.location.pathname;
if (thisPage.includes('graphs.html')) {
const transacciones = []; //generar las dummy transactions

for (let i = 0; i<15; i++) {
    transacciones.push(generarTransaccion());
}
//fin de generacion de dummy transsactions

/* const datos = getDatos(transacciones); */
const datos = consolidar(transacciones);
let d = datos.deposito;
let r = datos.retiro;
let p = datos.pago;
console.log(d);
console.log(r);
console.log(p);

/* asignar valores a elementos que se muestran en la pantalla de graficos */
/*     document.getElementById('depositos_valor').textContent = d;
    document.getElementById('retiros_valor').textContent = r;
    document.getElementById('pagos_valor').textContent = p; */

for (let index = 0; index < datos.length; index++) {
    console.log(transacciones[index]);
    
}
const image = new Image();
image.src = "";

const plugin ={
    id : 'customCanvasImage',
    beforeDraw: (chart)=> {
        if (image.complete) {
            const ctx = chart.ctx;
            const { top, left, width, height } = chart.chartArea;
            const x = left + width / 2 - image.width / 2;
            const y = top + height / 2 - image.height / 2;
            ctx.drawImage(image, x, y);
        } else {
            image.onload = () => chart.draw();
        }

    }
}
Chart.register(plugin);
// Obtener el contexto del canvas
var ctx = document.getElementById('doughnutChart').getContext('2d');

// Crear el gráfico
var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut', //tipo del grafico
    data: {
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
        }]
    },
    options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
            
            // Configuración de la leyenda
            legend: {
                display: true,
                position: 'top',
                
                labels: {
                    color: 'rgb(0,0,0)',
                    font: {
                    size: 17,  
                    } 
                    
                }

            },
            title: {
                display: true,
                text: 'Mis transacciones',
                font : {
                    size: 30,
                }
            },      
            layout: {
                padding: {
                    top: 0,
                }
            },
            
        },
        cutout: '65%',
        layout: {
            autoPadding: true,
        }
    }
});
/* var ctxt =document.getElementById('doughnutChart-sm').getContext('2d');
// Crear el gráfico
var myDoughnutChart2 = new Chart(ctxt, {
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
                text: 'Mis transacciones',
                font : {
                    size: 30,
                }
            },         
        }
    }
}

); */
}
});