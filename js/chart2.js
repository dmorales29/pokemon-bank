
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

  // Comprobamos si el flag "transaccionesCargada2" ya existe en localStorage
  if (localStorage.getItem("transaccionesCargada2") === null) {
    // Si no existe, lo establecemos como "false"
    localStorage.setItem("transaccionesCargada2", "false");
  }

  //Convertir a booleano
  let flag = localStorage.getItem("transaccionesCargada2") === "true";

  if (!flag) {
    function cargarData() {
      //Guardamos esas transacciones en el localStorage
      localStorage.setItem("misTransacciones", JSON.stringify(transacciones));

      //Asignamos los Ingresos, Egresos realizados de mis transacciones
      let depositos = 0;
      let retiros = 0;
      let pagos = 0;
      let transaccionesCargada2 = true;

      //Hacemos el cálculo y asignamos
      transacciones.forEach((transaccion) => {
        if (transaccion.tipo === "Deposito") {
          depositos=depositos+1;
          console.log(depositos);
        } else if (
          transaccion.tipo === "Retiro"){
            retiros=retiros+1;
            console.log(retiros);
            
          } else {
          pagos= pagos+1;
          console.log(pagos);
        }
      });

      //Redondeamos el objeto
      depositos = Number(depositos);
      retiros = Number(retiros);
      pagos = Number(pagos);
      console.log(depositos);
      console.log(retiros);
      console.log(pagos);

      //Creamos el objeto
      let totalMovimientos = {
        depositos: depositos,
        retiros: retiros,
        pagos: pagos,
      };

      //Guardamos los movimientos totales en el localStorage y el saldo que tiene
      localStorage.setItem(
        "totalTransacciones",
        JSON.stringify(totalMovimientos)
      );

      //Actualizar flag localStorage
      localStorage.setItem("transaccionesCargada2", "true");
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
    localStorage.getItem("totalTransacciones")
  );
  console.log(localtotalMovimientos);

  const deposit = document.getElementById("deposit");
  console.log(localtotalMovimientos.depositos==null);
  deposit.textContent = Number(localtotalMovimientos.depositos);
  const withdraw = document.getElementById("withdraw");
  console.log(localtotalMovimientos.retiros);
  withdraw.textContent =localtotalMovimientos.retiros;
  const pymt = document.getElementById("pymt");
  console.log(localtotalMovimientos.pagos);
  pymt.textContent =localtotalMovimientos.pagos;

  //Traemos la data del localStorage del total de movimientos
  const totalMovimientos = JSON.parse(localStorage.getItem("totalTransacciones"));

  let d = totalMovimientos.depositos;
  let r = totalMovimientos.retiros;
  let p = totalMovimientos.pagos;
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
  
  var ctx = document.getElementById("count").getContext("2d");

  // Crear el gráfico
  var myDoughnutChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Depositos", "Retiros", "Pagos"],
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
