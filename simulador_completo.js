
 let clientesArreglo = [];
let creditos = [];

let tasaInteres = 15;
let montoMaximo = 10000;

let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;

// ================= UTIL =================
function recuperaraTexto(id){
    return document.getElementById(id).value;
}

function recuperarFloat(id){
    return parseFloat(document.getElementById(id).value);
}

function mostrarTexto(id, texto){
    document.getElementById(id).innerHTML = texto;
}

function mostrarTextoEnCaja(id, texto){
    document.getElementById(id).value = texto;
}

// ================= SECCIONES =================
function ocultarSecciones(){
    document.getElementById("parametros").style.display = "none";
    document.getElementById("clientes").style.display = "none";
    document.getElementById("creditos").style.display = "none";
}

function mostrarSeccion(id){
    ocultarSecciones();
    document.getElementById(id).style.display = "block";
}

// ================= PARAMETROS =================
function guardarTasa(){
    let tasa = recuperarFloat("tasaInteres");
    if(tasa >= 10 && tasa <= 20){
        tasaInteres = tasa;
        mostrarTexto("mensajeTasa","Correcto");
    } else {
        mostrarTexto("mensajeTasa","Debe ser entre 10 y 20");
    }
}

function guardarMontoMaximo(){
    let valor = recuperarFloat("montoMaximo");

    if(valor > 0){
        montoMaximo = valor;
        mostrarTexto("mensajeMontoMaximo","Guardado");
    } else {
        mostrarTexto("mensajeMontoMaximo","Error");
    }
}

// ================= CLIENTES =================
function guardarCliente(){

    let cliente = {
        cedula: recuperaraTexto("idCedula"),
        nombre: recuperaraTexto("idNombre"),
        apellido: recuperaraTexto("idApellido"),
        telefono: recuperaraTexto("idTelefono"),
        ingresos: recuperarFloat("idIngresos"),
        egresos: recuperarFloat("idEgresos")
    };

    let existente = buscarCliente(cliente.cedula);

    if(existente == null){
        clientesArreglo.push(cliente);
    } else {
        Object.assign(existente, cliente);
    }

    pintarClientes();
    limpiar();
}

function pintarClientes(){
    let tabla = document.getElementById("tablaClientes");
    tabla.innerHTML = "";

    clientesArreglo.forEach(c => {
        tabla.innerHTML += `
        <tr>
            <td>${c.cedula}</td>
            <td>${c.nombre}</td>
            <td>${c.apellido}</td>
            <td>${c.telefono}</td>
            <td>${c.ingresos}</td>
            <td>${c.egresos}</td>
            <td>
                <button onclick="seleccionarCliente('${c.cedula}')">Editar</button>
            </td>
        </tr>`;
    });
}

function buscarCliente(cedula){
    return clientesArreglo.find(c => c.cedula == cedula) || null;
}

function seleccionarCliente(cedula){
    let c = buscarCliente(cedula);
    if(c){
        clienteSeleccionado = c;
        mostrarTextoEnCaja("idCedula",c.cedula);
        mostrarTextoEnCaja("idNombre",c.nombre);
        mostrarTextoEnCaja("idApellido",c.apellido);
        mostrarTextoEnCaja("idTelefono",c.telefono);
        mostrarTextoEnCaja("idIngresos",c.ingresos);
        mostrarTextoEnCaja("idEgresos",c.egresos);
    }
}

function limpiar(){
    ["idCedula","idNombre","idApellido","idTelefono","idIngresos","idEgresos"]
    .forEach(id => document.getElementById(id).value = "");
}

// ================= CREDITOS =================
function buscarClienteCredito(){
    let cedula = recuperaraTexto("buscarCedulaCredito");
    let cliente = buscarCliente(cedula);

    if(!cliente){
        document.getElementById("datosClienteCredito").innerHTML = "No encontrado";
    } else {
        clienteSeleccionado = cliente;
        document.getElementById("datosClienteCredito").innerHTML =
        `${cliente.nombre} ${cliente.apellido}`;
    }
}

function calcularCredito(){

    let monto = recuperarFloat("montoCredito");
    let plazo = recuperarFloat("plazoCredito");

    if(monto > montoMaximo){
        mostrarTexto("resultadoCredito","Supera monto máximo");
        document.getElementById("montoCredito").value = "";
        return;
    }

    let capacidad = clienteSeleccionado.ingresos - clienteSeleccionado.egresos;
    let total = monto * (1 + tasaInteres / 100);
    let cuota = total / plazo;

    cuotaCalculada = cuota;
    montoCalculado = monto;
    plazoCalculado = plazo;

    let resultado = cuota <= capacidad * 0.4 ? "APROBADO" : "RECHAZADO";

    document.getElementById("btnAsignarCredito").disabled = resultado !== "APROBADO";

    mostrarTexto("resultadoCredito", resultado);
}

function asignarCredito(){
    creditos.push({
        cedula: clienteSeleccionado.cedula,
        nombre: clienteSeleccionado.nombre,
        apellido: clienteSeleccionado.apellido,
        monto: montoCalculado,
        tasa: tasaInteres,
        plazo: plazoCalculado,
        cuota: cuotaCalculada
    });

    alert("Crédito asignado");
}

// ================= HISTORIAL =================
function buscarCreditosCliente(){
    let cedula = recuperaraTexto("buscarCedulaHistorial");
    pintarCreditos(creditos.filter(c => c.cedula == cedula));
}

function pintarCreditos(lista){
    let tabla = document.getElementById("tablaCreditos");
    tabla.innerHTML = "";

    lista.forEach(c => {
        tabla.innerHTML += `
        <tr>
            <td>${c.cedula}</td>
            <td>${c.nombre}</td>
            <td>${c.apellido}</td>
            <td>${c.monto}</td>
            <td>${c.tasa}</td>
            <td>${c.plazo}</td>
            <td>${c.cuota}</td>
        </tr>`;
    });
}

// ================= VIP =================
function mostrarCreditosVIP(){
    pintarCreditos(creditos.filter(c => c.monto > 5000));
}

// ================= ACERCA DE =================
function acercaDe(){
    document.getElementById("seccionAcercaDe").innerHTML = `
    <h2>Acerca de</h2>
    <p>Oscar David Gómez</p>
    <p>Desarrollo de Software</p>
    <p>"El código es el futuro"</p>`;
}