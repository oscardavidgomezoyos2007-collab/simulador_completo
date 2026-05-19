function calcularCredito(cliente, montoSolicitado, plazo) {
    // Aquí reutilizas las funciones para calcular la capacidad de pago, total a pagar, cuota mensual
    let capacidadPago = cliente.ingresos - cliente.egresos;
    let totalPagar = montoSolicitado * (1 + 0.1); // Suponiendo que el interés es 10%
    let cuotaMensual = totalPagar / plazo;

    return {
        capacidadPago: capacidadPago,
        totalPagar: totalPagar,
        cuotaMensual: cuotaMensual
    };
} 

function mostrarResultadoCredito(resultado) {
    let resultadoCredito = document.getElementById('resultadoCredito');
    resultadoCredito.innerHTML = `
        Capacidad de pago: ${resultado.capacidadPago}<br>
        Total a pagar: ${resultado.totalPagar}<br>
        Cuota mensual: ${resultado.cuotaMensual}<br>
        RESULTADO: ${resultado.resultado}
    `;

    // Aplicar estilos según el resultado
    if (resultado.resultado === "APROBADO") {
        resultadoCredito.className = "aprobado";
    } else {
        resultadoCredito.className = "rechazado";
    }
} 
