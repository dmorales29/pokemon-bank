/* Todo en este archivo es para generar las dummy transactions o para retrieve la info de las transacciones generadas */
export function generarTransaccion(){
    const transacciones = ["Deposito","Retiro","Pago"]; //acciones que se pueden realizar, no se incluye mostrar saldo porque eso es solo una vista
    const colectores = ["Electricidad", "Agua","Internet","Teléfono","Otro"]; //para pagar servicios, se necesita saber el colector a quien se le va a pagar, agregue unos genericos

    const tipo = transacciones[Math.floor(Math.random()*transacciones.length)]; //random genera un numero entre 0y uno que se multiplica por la longitud del vector y floor lo convierte a un int para generar un index del vector y elegir un tipo de transaccion
    const monto = Math.floor(Math.random()*100)+1 ;
    //inicializar objeto
    let transaccion = {

        tipo: tipo,
        monto: monto,
        fecha: new Date().toISOString()
    }
    //si al generar una transaccion random, se genera un pago, 
    if (tipo == "Pago") {
        transaccion.colector = colectores[Math.floor(Math.random()*colectores.length)];
    }
    return  transaccion;
}



export function getDatos(transacciones ) {
    var categorias = [];
    var montos = [];

    //llenar vectores con info para el grafico
    transacciones.forEach(transaccion => {
        categorias.push(transaccion.categorias);
        montos.push(transaccion.monto);
    });
    return {
        categorias: categorias,
        montos: montos,
    }
}

//funcion que consolida los totales de depositos, retiros o pagos para poder mostrarlos en el pie chart 
export function consolidar (transacciones){
    let deposito =0; 
    let retiro = 0; 
    let pago=0 ;

    transacciones.forEach(transaccion => {
        if (transaccion.tipo=="Deposito") {
            deposito += transaccion.monto; 
        } else if (transaccion.tipo == "Retiro") {
            retiro += transaccion.monto;
            
        } else{
            pago += transaccion.monto;
        }
        
    });
    return { deposito, retiro,pago}
}
export function saldos (transacciones){
    //funcion para las cards que muestran ingresos, egresos y saldo final. el saldo inical se establece como
    //que viene de la info de user data 500 por requerimientos de la ruta de aprendizaje
    let userStoredData =JSON.parse(localStorage.getItem('userData'));
    let egresos = 0; 
    let saldoI=userStoredData.saldoI ;
    let ingresos=+saldoI;
    let saldo = 0;

    transacciones.forEach(transaccion => {
        if (transaccion.tipo=="Deposito") {
            ingresos += transaccion.monto; 
        } else if (transaccion.tipo == "Retiro" || transaccion.tipo == "Pago" ) {
            egresos += transaccion.monto;
            
        }
    });
    saldo = saldoI + ingresos - egresos;

    return { saldoI, ingresos, egresos,saldo}
}