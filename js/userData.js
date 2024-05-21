/* guardar en localStorage los datos de la cuenta con la que se va a trabajar */
const user = 
{nombre : "Ash Ketchum", PIN:"1234", cuenta:"0987654321",saldoI:500};

localStorage.setItem('userData',JSON.stringify(user));

