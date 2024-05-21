import { dataTableFormat } from "./tabla.js";
import {
  getDatos,
  generarTransaccion,
  consolidar,
  saldos,
} from "./transacciones.js";

document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();

  const thisPage = window.location.pathname;
  if (thisPage.includes("graphs.html")) {
    let storedData = localStorage.getItem("graphsData");

    if (storedData !== null) {
      //validar si la data en localStorage ya existe, si ya existe solo se carga
      try {
        const data = JSON.parse(storedData);
        initializePageWithData(data);
      } catch (error) {
        console.error("Error al analicar JSON", error);
      }
    } else {
      //si no existe, se generan las dummy transactions, se guarda la info en localStorage
      //y luego se carga la info de la página
      const transacciones = generateDummyTransactions();
      localStorage.setItem("graphsData", JSON.stringify(transacciones));
      initializePageWithData(transacciones);
    }
  }
});

function initializePageWithData(transacciones) {
  //funcion para cargar la info que esta en las cards, ingresos, egresos y saldo
  let userStoredData = JSON.parse(localStorage.getItem("userData"));
  const amt = saldos(transacciones);
  console.log(amt.ingresos);
  const ingresos = document.getElementById("ingresos");
  ingresos.textContent = "$ " + amt.ingresos.toFixed(2);
  const egresos = document.getElementById("egresos");
  egresos.textContent = "$ " + amt.egresos.toFixed(2);
  const dispobible = document.getElementById("saldos");
  dispobible.textContent = "$ " + amt.saldo.toFixed(2);

  //información del nombre de usuario retrieved del localStorage accountUser
  const accountUser = document.getElementById("accountUser");
  accountUser.textContent = userStoredData.nombre;

  //información del número de la cuenta retrieved del localStorage accountNumber
  const accountNumber = document.getElementById("accountNumber");
  accountNumber.textContent = userStoredData.cuenta;

  //funcion para cargar la info en el pieChart
  initializeCharts(transacciones);
}
function initializeCharts(transacciones) {
  //se usa la funcion consolidar, definida en el archivo transacciones para poder generar los datos
  //para el pie chart
  const datos = consolidar(transacciones);
  let d = datos.deposito;
  let r = datos.retiro;
  let p = datos.pago;
  const image = new Image();
  image.src = "";

  const plugin = {
    id: "customCanvasImage",
    beforeDraw: (chart) => {
      if (image.complete) {
        const ctx = chart.ctx;
        const { top, left, width, height } = chart.chartArea;
        const x = left + width / 2 - image.width / 2;
        const y = top + height / 2 - image.height / 2;
        ctx.drawImage(image, x, y);
      } else {
        image.onload = () => chart.draw();
      }
    },
  };
  Chart.register(plugin);
  // Obtener el contexto del canvas
  var ctx = document.getElementById("doughnutChart").getContext("2d");

  // Crear el gráfico
  var myDoughnutChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Deposito", "Retiro", "Pago"],
      datasets: [
        {
          label: "Transacciones",
          data: [d, r, p],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",

          labels: {
            color: "rgb(0,0,0)",
            font: {
              size: 17,
            },
          },
        },
        title: {
          display: true,
          text: "Mis transacciones",
          font: {
            size: 30,
          },
        },
        layout: {
          padding: {
            top: 0,
          },
        },
      },
      cutout: "65%",
      layout: {
        autoPadding: true,
      },
    },
  });
}

//generar las dummy transactions
function generateDummyTransactions() {
  const transacciones = [];
  for (let i = 0; i < 15; i++) {
    transacciones.push(generarTransaccion());
    const saldo = saldos(transacciones);
    if (saldo.egresos > saldo.ingresos) {
      i = 15;
    }
  }
  return transacciones;
}
