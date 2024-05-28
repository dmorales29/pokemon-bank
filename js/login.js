let userP = JSON.parse(localStorage.getItem("userData"));
let storedData = localStorage.getItem("graphsData");

function loguear() {
  let acc = document.getElementById("accountNumber").value;
  let pin = document.getElementById("inputPassword").value;

  if (acc == userP.cuenta && pin === userP.PIN) {
    console.log("logueado");
    window.location.href = "mis-finanzas.html";
  }
}

document.getElementById("loginId").addEventListener("click", function (event) {
  event.preventDefault();
  swal(
    "Error",
    "Has ingresado mal tu usario o contraseña, por favor intenta de nuevo.",
    "error"
  );
});
