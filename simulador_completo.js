let clientes = [];
  let creditos = [];
 
  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;
 
function ocultarSecciones(){
  let componente= document.getElementById("parametros");
  let listaClass = componente.classList;
  listaClass.remove("activa");  // oculta
 
  let componente2 = document.getElementById("clientes");
  let listaClass2 = componente2.classList;
  listaClass2.remove("activa");
}
 
 
function mostrarSeccion(id){
  ocultarSecciones();
 
  let componente= document.getElementById(id);
  let listaClass = componente.classList;
  listaClass.add("activa");  //activa
}
 
function guardarTasa() {
  let ImputTaza = recuperarInt('tasaInteres')
  if (ImputTaza > 10 && ImputTaza < 20  ) {
    tasaInteres = ImputTaza;
    mostrarTexto('mensajeTasa','tazaConfigurada') 

  }else {
    mostrarTexto('mensajeTasa','tazamalconfigurada')
  }
  
}

function guardarClientes() {
  let Cedula = recuperaraTexto("idCedula");
  let Nombre = recuperaraTexto("idNombre");
  let Apellido = recuperaraTexto("idApellido");
  let Ingresos= recuperarFloat("idIngresos");
  let Egresos= recuperarFloat("idEgresos")

  let index = clientes.findIndex(c => c.Cedula === Cedula);
    if (index === -1) {
        clientes.push({ Cedula, Nombre, Apellido, Ingresos, Egresos });
    } else {
        clientes[index] = { Cedula, Nombre, Apellido, Ingresos, Egresos };
    } 
   pintarClientes();
}


 function pintarClientes() {
   let arreglo = document.getElementById("tablaClientes");
   arreglo.innerHTML=""; 
   clientes.forEach(c => { 
    arreglo.innerHTML += `<tr>
            <td>${c.Cedula}</td><td>${c.Nombre}</td><td>${c.Ingresos}</td><td>${c.Egresos}</td>
            <td> <button> Actualizar </button> </td>
        </tr>`; 
   } 

   )

 }


//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios
 