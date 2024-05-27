document.addEventListener("DOMContentLoaded", () => {
  //////////////////////// INICIO - Cargar localStorage ////////////////////////
  //Carga del localStorage la info de usuario y la inserta en el HTML
  infoCuenta();

  //Cargar del localStorage el saldo real
  let totalMovimientos = JSON.parse(localStorage.getItem("totalMovimientos"));

  //Carga del localStorage las transacciones
  let misTransacciones = JSON.parse(localStorage.getItem("misTransacciones"));
  //////////////////////// FIN - Cargar localStorage ////////////////////////

  ///////////// INICIO - Formateo de datos a depositar /////////////
  //Capturar cantidad ingresada
  const montoADepositarInput = document.getElementById("montoADepositar");

  //Formatear decimales
  montoADepositarInput.addEventListener("input", function () {
    limitDecimals(this);
  });

  //Formatear decimales al ser entero
  montoADepositarInput.addEventListener("blur", function () {
    formatToTwoDecimals(this);
  });

  //Bloquear signos y exponencial
  montoADepositarInput.addEventListener("keydown", function (e) {
    formatSigns(e);
  });

  //Capturar la descripción a depositar
  function descripcionADepositar() {
    let descripcionADepositar = document.getElementById(
      "descripcionADepositar"
    ).value;

    return descripcionADepositar;
  }
  ///////////// FIN - Formateo de datos a depositar /////////////

  ///////////// INICIO - Formateo de datos a retirar /////////////
  //Capturar cantidad ingresada
  const montoARetirarInput = document.getElementById("montoARetirar");

  //Formatear decimales
  montoARetirarInput.addEventListener("input", function () {
    limitDecimals(this);
  });

  //Formatear decimales al ser entero
  montoARetirarInput.addEventListener("blur", function () {
    formatToTwoDecimals(this);
  });

  //Bloquear signos y exponencial
  montoARetirarInput.addEventListener("keydown", function (e) {
    formatSigns(e);
  });
  ///////////// FIN - Formateo de datos a retirar /////////////

  ///////// INICIO - Enviar Depósito al localStorage /////////
  //Agregar el listener y trigger para enviar depósito
  let submitDeposito = document.getElementById("submitDeposito");
  submitDeposito.addEventListener("click", depositarDinero);

  function depositarDinero() {
    //Capturamos el monto a depositar
    let montoADepositar = parseFloat(
      document.getElementById("montoADepositar").value
    );

    if ((!montoADepositar && montoADepositar !== 0) || montoADepositar === 0) {
      // Mostramos un modal con SweetAlert indicando que el campo monto está vacío
      Swal.fire({
        icon: "error",
        title: "Campo Vacío",
        text: "Debes ingresar un número en el monto a depositar.",
      });
    } else {
      //Suma de saldo anterior más el depósito realizado
      let nuevoSaldo = totalMovimientos.saldo + montoADepositar;
      totalMovimientos.saldo = nuevoSaldo;

      //Registro de transacción de depósito
      let nuevaTransaccion = {
        tipo: "Deposito",
        monto: montoADepositar,
        fecha: new Date().toISOString(),
      };

      //Hacemos push de la transacción al localStorage para no borrar la data
      misTransacciones.push(nuevaTransaccion);

      //Guardamos la transacción en el localStorage
      localStorage.setItem(
        "misTransacciones",
        JSON.stringify(misTransacciones)
      );

      //Suma del ingreso anterior más el depósito realizado
      let nuevoIngreso = totalMovimientos.ingresos + montoADepositar;

      //Asignamos el valor del ingreso en el localStorage
      totalMovimientos.ingresos = nuevoIngreso;

      //Asignamos el valor del nuevo saldo en el localStorage
      totalMovimientos.saldo = nuevoSaldo;

      //Guardamos el nuevo saldo en el localStorage
      localStorage.setItem(
        "totalMovimientos",
        JSON.stringify(totalMovimientos)
      );

      //Confirmación exitosa de Depósito
      Swal.fire({
        title: "Depósito realizado",
        text: `Has depositado correctamente $${montoADepositar.toFixed(
          2
        )} a tu cuenta.`,
        icon: "success",
      });

      //Limpiamos el input
      document.getElementById("montoADepositar").value = "";
    }
  }
  ///////// FIN - Enviar Depósito al localStorage /////////

  ///////// INICIO - Retirar Depósito del localStorage /////////
  //Agregar el listener y trigger para retirar depósito
  let submitRetirar = document.getElementById("submitRetirar");
  submitRetirar.addEventListener("click", retitarDinero);

  function retitarDinero() {
    //Capturamos el monto a retirar
    let montoARetirar = parseFloat(
      document.getElementById("montoARetirar").value
    );

    if ((!montoARetirar && montoARetirar !== 0) || montoARetirar === 0) {
      // Mostramos un modal con SweetAlert indicando que el campo monto está vacío
      Swal.fire({
        icon: "error",
        title: "Campo Vacío",
        text: "Debes ingresar un número en el monto a retirar.",
      });
    } else if (montoARetirar > totalMovimientos.saldo) {
      // Mostramos un modal con SweetAlert indicando saldo insuficiente
      Swal.fire({
        icon: "error",
        title: "Saldo insuficiente",
        text: "No tienes los fondos necesarios para retirar este monto.",
      });

      //Limpiamos el input
      document.getElementById("montoARetirar").value = "";
    } else {
      //Resta del saldo anterior con el retiro realizado
      let nuevoSaldo = totalMovimientos.saldo - montoARetirar;
      totalMovimientos.saldo = nuevoSaldo;

      //Registro de transacción de retiro
      let nuevaTransaccion = {
        tipo: "Retiro",
        monto: montoARetirar,
        fecha: new Date().toISOString(),
      };

      //Hacemos push de la transacción al localStorage para no borrar la data
      misTransacciones.push(nuevaTransaccion);

      //Resta del egreso anterior menos el retiro realizado
      let nuevoEgreso = totalMovimientos.egresos + montoARetirar;

      //Asignamos el valor del egreso en el localStorage
      totalMovimientos.egresos = nuevoEgreso;

      //Asignamos el valor del nuevo saldo en el localStorage
      totalMovimientos.saldo = nuevoSaldo;

      //Guardamos el nuevo saldo en el localStorage
      localStorage.setItem(
        "totalMovimientos",
        JSON.stringify(totalMovimientos)
      );

      //Confirmación exitosa de Retiro
      Swal.fire({
        title: "Retiro realizado",
        text: `Has retirado correctamente $${montoARetirar.toFixed(
          2
        )} de tu cuenta.`,
        icon: "success",
      });

      //Limpiamos el input
      document.getElementById("montoARetirar").value = "";
    }
  }
  ///////// FIN - Enviar Depósito al localStorage /////////

  //////////////////////// INICIO - Consultar Saldo ////////////////////////
  //Agregar el listener y trigger para consultar saldo
  let submitConsultarSaldo = document.getElementById("submitConsultarSaldo");
  submitConsultarSaldo.addEventListener("click", consultarSaldo);

  function consultarSaldo() {
    //Carga del localStorage la info del saldo
    let saldo = parseFloat(
      JSON.parse(localStorage.getItem("totalMovimientos")).saldo
    ).toFixed(2);

    Swal.fire({
      title: "Consultar saldo",
      text: `Tu saldo actual es: $${saldo}.`,
      icon: "success",
    });
  }
});

//Cargar info de la cuenta
function infoCuenta() {
  //Cargar la info que esta en las cards, ingresos, egresos y saldo
  let userStoredData = JSON.parse(localStorage.getItem("userData"));

  //información del nombre de usuario retrieved del localStorage accountUser
  const accountUser = document.getElementById("accountUser");
  accountUser.textContent = userStoredData.nombre;

  //información del número de la cuenta retrieved del localStorage accountNumber
  const accountNumber = document.getElementById("accountNumber");
  accountNumber.textContent = userStoredData.cuenta;
}

//Limitar máximo de decimales a 2 en input
function limitDecimals(input) {
  const value = input.value;

  // Permitir hasta dos decimales
  const regex = /^[0-9]*\.?\d{0,2}$/;
  if (!regex.test(value)) {
    const parts = value.split(".");
    if (parts.length === 2) {
      input.value = parts[0] + "." + parts[1].substring(0, 2);
    }
  }
}

//Agregar 2 decimales en blur input
function formatToTwoDecimals(input) {
  const value = parseFloat(input.value);
  if (!isNaN(value)) {
    input.value = value.toFixed(2);
  }
}

//Formateo de signos y exponencial
function formatSigns(e) {
  // Obtiene la tecla presionada
  const key = e.key;

  // Si la tecla presionada es el signo -, + o la exponencial "e", lo bloquea
  if (key === "-" || key === "+" || key === "e" || key === "E") {
    e.preventDefault();
  }
}
