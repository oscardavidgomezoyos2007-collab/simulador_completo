function recuperaraTexto(idComponente){
    let componente = document.getElementById(idComponente);
    return componente.value;
}

function recuperarInt(idComponente){
    return parseInt(recuperaraTexto(idComponente));
}

function recuperarFloat(idComponente){
    return parseFloat(recuperaraTexto(idComponente));
}

function mostrarTexto(idComponente,mensaje){
    document.getElementById(idComponente).innerText = mensaje;
}

function mostrarTextoEnCaja(idComponente,mensaje){
    document.getElementById(idComponente).value = mensaje;
}

function mostrarImagen(idComponente,rutaImagen){
    document.getElementById(idComponente).src = rutaImagen;
}

// NUEVAS FUNCIONES

function limpiarCaja(idComponente){
    document.getElementById(idComponente).value = "";
}

function limpiarCajas(ids){
    for(let i = 0; i < ids.length; i++){
        limpiarCaja(ids[i]);
    }
}

function mostrarElemento(idComponente){
    document.getElementById(idComponente).style.display = "block";
}

function ocultarElemento(idComponente){
    document.getElementById(idComponente).style.display = "none";
}

function deshabilitarComponente(idComponente){
    document.getElementById(idComponente).disabled = true;
}

function habilitarComponente(idComponente){
    document.getElementById(idComponente).disabled = false;
}

function estaVacio(valor){
    return valor == null || valor.trim() === "";
}

function esNumero(valor){
    return !isNaN(valor);
}

function mostrarAlerta(mensaje){
    alert(mensaje);
}