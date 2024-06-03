document.addEventListener("DOMContentLoaded", () => {
  //Data del usuario localStorage
  let userStoredData = JSON.parse(localStorage.getItem("userData"));

  //Información del nombre de usuario de localStorage accountUser
  const accountUser = document.getElementById("accountUser");
  accountUser.textContent = userStoredData.nombre;

  //Información del número de la cuenta de localStorage accountNumber
  const accountNumber = document.getElementById("accountNumber");
  accountNumber.textContent = userStoredData.cuenta;

  //Data inicial de transacciones
  let transacciones = [
    {
      tipo: "Retiro",
      monto: 50.0,
      fecha: new Date("2024-05-20T00:14:13.750Z").toISOString(),
    },
    {
      tipo: "Deposito",
      monto: 200.0,
      fecha: new Date("2024-05-20T00:14:26.750Z").toISOString(),
    },
    {
      tipo: "Retiro",
      monto: 10.25,
      fecha: new Date("2024-05-20T00:14:40.750Z").toISOString(),
    },
    {
      tipo: "Retiro",
      monto: 50.0,
      fecha: new Date("2024-05-20T00:15:10.750Z").toISOString(),
    },
    {
      tipo: "Deposito",
      monto: 200.0,
      fecha: new Date("2024-05-20T00:15:19.750Z").toISOString(),
    },
    {
      tipo: "Pago",
      monto: 3.99,
      fecha: new Date("2024-05-20T00:16:31.750Z").toISOString(),
    },
    {
      tipo: "Pago",
      monto: 25.6,
      fecha: new Date("2024-05-20T00:16:42.750Z").toISOString(),
    },
    {
      tipo: "Deposito",
      monto: 314.84,
      fecha: new Date("2024-05-20T00:18:18.750Z").toISOString(),
    },
    {
      tipo: "Retiro",
      monto: 75.0,
      fecha: new Date("2024-05-20T00:18:20.750Z").toISOString(),
    },
  ];

  // Comprobamos si el flag "transaccionesCargada" ya existe en localStorage
  if (localStorage.getItem("transaccionesCargada") === null) {
    // Si no existe, lo establecemos como "false"
    localStorage.setItem("transaccionesCargada", "false");
  }

  //Convertir a booleano
  let flag = localStorage.getItem("transaccionesCargada") === "true";
  if (!flag) {
    function cargarData() {
      //Guardamos esas transacciones en el localStorage
      localStorage.setItem("misTransacciones2", JSON.stringify(transacciones));

      //Asignamos los Ingresos, Egresos realizados de mis transacciones
      let ingresos = 0;
      let egresos = 0;
      let saldo = 0;
      let transaccionesCargada = true;

      //Hacemos el cálculo y asignamos
      transacciones.forEach((transaccion) => {
        if (transaccion.tipo === "Deposito") {
          ingresos += transaccion.monto;
        } else if (
          transaccion.tipo === "Retiro" ||
          transaccion.tipo === "Pago"
        ) {
          egresos += transaccion.monto;
        }
      });

      //Calculo de movimientos totales
      saldo = saldo - egresos + ingresos;

      //Redondeamos el objeto
      ingresos = Number(ingresos.toFixed(2));
      egresos = Number(egresos.toFixed(2));
      saldo = Number(saldo.toFixed(2));

      //Creamos el objeto
      let totalMovimientos = {
        ingresos: ingresos,
        egresos: egresos,
        saldo: saldo,
      };

      //Guardamos los movimientos totales en el localStorage y el saldo que tiene
      localStorage.setItem(
        "totalMovimientos",
        JSON.stringify(totalMovimientos)
      );

      //Actualizar flag localStorage
      localStorage.setItem("transaccionesCargada", "true");
    }

    //Cargar data una vez
    cargarData();

    //Hacemos el gráfico
    initializeCharts();
  } else {
    //Hacemos el gráfico
    initializeCharts();
  }
});

//Pie Chart
function initializeCharts() {
  //Cargamos ingresos, egresos y saldo del localStorage
  let localtotalMovimientos = JSON.parse(
    localStorage.getItem("totalMovimientos")
  );

  const ingresos = document.getElementById("ingresos");
  ingresos.textContent = "$ " + localtotalMovimientos.ingresos.toFixed(2);
  const egresos = document.getElementById("egresos");
  egresos.textContent = "$ " + localtotalMovimientos.egresos.toFixed(2);
  const saldo = document.getElementById("saldos");
  saldo.textContent = "$ " + localtotalMovimientos.saldo.toFixed(2);

  //Traemos la data del localStorage del total de movimientos
  const totalMovimientos = JSON.parse(localStorage.getItem("totalMovimientos"));

  let d = totalMovimientos.ingresos;
  let r = totalMovimientos.egresos;
  let p = totalMovimientos.saldo;
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
      labels: ["Ingresos", "Egresos", "Saldo"],
      datasets: [
        {
          label: "Transacciones",
          data: [d, r, p],
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(11, 156, 49, 0.2)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(11, 156, 49, 1)",
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
