document.addEventListener("DOMContentLoaded", () => {
  //////////////////////// INICIO - Cargar localStorage ////////////////////////
  //Carga del localStorage la info de usuario y la inserta en el HTML
  infoCuenta();

  //Cargar del localStorage el saldo real
  let totalMovimientos = JSON.parse(localStorage.getItem("totalMovimientos"));

  //Carga del localStorage las transacciones
  let misTransacciones = JSON.parse(localStorage.getItem("misTransacciones"));

  // Comprobamos si el flag "serviciosAPagar" ya existe en localStorage
  if (localStorage.getItem("serviciosAPagar") === null) {
    // Si no existe, lo establecemos como "false"
    localStorage.setItem("serviciosAPagar", "false");
  }

  //Convertir a booleano
  let flag = localStorage.getItem("serviciosAPagar") === "true";

  if (!flag) {
    function cargarServicios() {
      //Creamos objeto de los servicios a pagar
      let servicios = {
        aguaPagada: false,
        energiaPagada: false,
        telefonoPagada: false,
        internetPagada: false,
      };

      //Guardamos en el localStorage los servicios a pagar
      localStorage.setItem("servicios", JSON.stringify(servicios));

      //Actualizar flag localStorage
      localStorage.setItem("serviciosAPagar", "true");
    }

    //Cargamos una vez
    cargarServicios();
  } else {
    //Si hace refresh de la página y ya están pagados, deshabilita las opciones
    //Cargamos el objeto de los servicios
    let servicios = JSON.parse(localStorage.getItem("servicios"));
    let dropdownServicio = document.getElementById("dropdownServicio");

    //Desactivamos la option del dropdown
    if (servicios.aguaPagada === true) {
      dropdownServicio.options[1].disabled = "true";
    }
    if (servicios.energiaPagada === true) {
      dropdownServicio.options[2].disabled = "true";
    }
    if (servicios.telefonoPagada === true) {
      dropdownServicio.options[3].disabled = "true";
    }
    if (servicios.internetPagada === true) {
      dropdownServicio.options[4].disabled = "true";
    }
  }
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

      //Guardamos la transacción en el localStorage
      localStorage.setItem(
        "misTransacciones",
        JSON.stringify(misTransacciones)
      );

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
  //////////////////////// FIN - Consultar Saldo ////////////////////////

  //////////////////////// INICIO - Pagar Servicios ////////////////////////
  //Seleccionar el servicio a pagar
  let dropdownServicio = document.getElementById("dropdownServicio");
  let amountPlaceholder = document.getElementById("amountPlaceholder");
  let montoCantidad = document.getElementById("montoCantidad");
  let submitPagar = document.getElementById("submitPagar");

  //Agregamos el listener al dropdown
  dropdownServicio.addEventListener("change", dropdownContent);

  //Función para cambiar el tipo de servicio a pagar
  function dropdownContent() {
    switch (dropdownServicio.selectedIndex) {
      case 1:
        amountPlaceholder.classList.add("show");
        montoCantidad.innerHTML = "18.95";
        break;
      case 2:
        amountPlaceholder.classList.add("show");
        montoCantidad.innerHTML = "65.82";
        break;
      case 3:
        amountPlaceholder.classList.add("show");
        montoCantidad.innerHTML = "5.99";
        break;
      case 4:
        amountPlaceholder.classList.add("show");
        montoCantidad.innerHTML = "31.50";
        break;

      default:
        break;
    }
  }

  //Agregamos el listener al botón submitPagar
  submitPagar.addEventListener("click", pagarServicio);

  //Pagar servicio y bloquear opción
  function pagarServicio() {
    let datoMontoCantidad = montoCantidad.innerHTML;

    // Mostramos un modal con SweetAlert indicando que tiene saldo insuficiente
    if (totalMovimientos.saldo === 0) {
      Swal.fire({
        icon: "error",
        title: "Saldo insuficiente",
        text: "No tienes los fondos necesarios para retirar este monto.",
      });
    } else if (dropdownServicio.selectedIndex === 0) {
      // Mostramos un modal con SweetAlert indicando que no ha seleccionado opción
      Swal.fire({
        icon: "error",
        title: "Seleccionar Servicio",
        text: "Debes seleccionar un servicio a pagar.",
      });
    } else {
      //Realizamos el pago si todo esta bien
      //Resta del saldo anterior con el pago realizado
      let nuevoSaldo = totalMovimientos.saldo - datoMontoCantidad;
      totalMovimientos.saldo = nuevoSaldo;

      //Convertimos el monto a tipo número
      let datoMontoCantidadNumero = Number(datoMontoCantidad);

      //Registro de transacción de pago
      let nuevaTransaccion = {
        tipo: "Pago",
        monto: datoMontoCantidadNumero,
        fecha: new Date().toISOString(),
      };

      //Hacemos push de la transacción al localStorage para no borrar la data
      misTransacciones.push(nuevaTransaccion);

      //Guardamos la transacción en el localStorage
      localStorage.setItem(
        "misTransacciones",
        JSON.stringify(misTransacciones)
      );

      //Resta del egreso anterior menos el pago realizado
      let nuevoEgreso = totalMovimientos.egresos + datoMontoCantidadNumero;

      //Asignamos el valor del egreso en el localStorage
      totalMovimientos.egresos = nuevoEgreso;

      //Asignamos el valor del nuevo saldo en el localStorage
      totalMovimientos.saldo = nuevoSaldo;

      //Guardamos el nuevo saldo en el localStorage
      localStorage.setItem(
        "totalMovimientos",
        JSON.stringify(totalMovimientos)
      );

      //Limpiamos cantidad y bloqueamos la selección del servicio pagado
      switch (dropdownServicio.selectedIndex) {
        case 1:
          //Desactivamos la option del dropdown
          dropdownServicio.options[dropdownServicio.selectedIndex].disabled =
            "true";

          //Quitamos la selección
          dropdownServicio.selectedIndex = 0;

          //Removemos la clase para mostrar la cantidad
          amountPlaceholder.classList.remove("show");

          //Agregamos la clase para esconder la cantidad
          amountPlaceholder.classList.add("hide");

          //Cargamos el localStorage de lo que se ha pagado
          let servicioAguaPagado = JSON.parse(
            localStorage.getItem("servicios")
          );

          //Cambiamos a servicio pagado true
          servicioAguaPagado.aguaPagada = true;

          //Actualizamos transacción del pago de servicio en el localStorage
          localStorage.setItem("servicios", JSON.stringify(servicioAguaPagado));

          break;
        case 2:
          //Desactivamos la option del dropdown
          dropdownServicio.options[dropdownServicio.selectedIndex].disabled =
            "true";

          //Quitamos la selección
          dropdownServicio.selectedIndex = 0;

          //Removemos la clase para mostrar la cantidad
          amountPlaceholder.classList.remove("show");

          //Agregamos la clase para esconder la cantidad
          amountPlaceholder.classList.add("hide");

          //Cargamos el localStorage de lo que se ha pagado
          let servicioEnergiaPagado = JSON.parse(
            localStorage.getItem("servicios")
          );

          //Cambiamos a servicio pagado true
          servicioEnergiaPagado.energiaPagada = true;

          //Actualizamos transacción del pago de servicio en el localStorage
          localStorage.setItem(
            "servicios",
            JSON.stringify(servicioEnergiaPagado)
          );

          break;
        case 3:
          //Desactivamos la option del dropdown
          dropdownServicio.options[dropdownServicio.selectedIndex].disabled =
            "true";

          //Quitamos la selección
          dropdownServicio.selectedIndex = 0;

          //Removemos la clase para mostrar la cantidad
          amountPlaceholder.classList.remove("show");

          //Agregamos la clase para esconder la cantidad
          amountPlaceholder.classList.add("hide");

          //Cargamos el localStorage de lo que se ha pagado
          let servicioTelefonoPagado = JSON.parse(
            localStorage.getItem("servicios")
          );

          //Cambiamos a servicio pagado true
          servicioTelefonoPagado.telefonoPagada = true;

          //Actualizamos transacción del pago de servicio en el localStorage
          localStorage.setItem(
            "servicios",
            JSON.stringify(servicioTelefonoPagado)
          );

          break;
        case 4:
          //Desactivamos la option del dropdown
          dropdownServicio.options[dropdownServicio.selectedIndex].disabled =
            "true";

          //Quitamos la selección
          dropdownServicio.selectedIndex = 0;

          //Removemos la clase para mostrar la cantidad
          amountPlaceholder.classList.remove("show");

          //Agregamos la clase para esconder la cantidad
          amountPlaceholder.classList.add("hide");

          //Cargamos el localStorage de lo que se ha pagado
          let servicioInternetPagado = JSON.parse(
            localStorage.getItem("servicios")
          );

          //Cambiamos a servicio pagado true
          servicioInternetPagado.internetPagada = true;

          //Actualizamos transacción del pago de servicio en el localStorage
          localStorage.setItem(
            "servicios",
            JSON.stringify(servicioInternetPagado)
          );

          break;

        default:
          break;
      }

      //Confirmación exitosa de pago de servicio
      Swal.fire({
        title: "Pago realizado",
        text: `Has pagado correctamente $${datoMontoCantidadNumero} de tu servicio.`,
        icon: "success",
      });

      //Actualizamos el localStorage de lo que se ha pagado
    }
  }

  //////////////////////// FIN - Pagar Servicios ////////////////////////
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
