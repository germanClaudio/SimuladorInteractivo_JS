/*--- Simulador interactivo Cotizacion Transporte - CoderHouse - Javascript - German Montalbetti -----*/
/**Declaracion de variables */
const precioPeso = 18.25;
const precioKm = 3.95;
var descuento = 0;
var transporte = "";

/*--------------funcion remover elementos si se ingresan datos erroneos ----------------*/
function remover() {
	let elemento = document.getElementById('datos');
	elemento.parentNode.removeChild(elemento);
	return false;
}

/*------------------ Evento cantidad de caracteres Nombre Producto -----------------------*/
var inputNombreProducto = document.getElementById('inputNombreProducto');
inputNombreProducto.addEventListener("input", validarNombreProducto);

function validarNombreProducto() {
	
	var valorNombreProducto = document.getElementById('inputNombreProducto').value;
	var caracteres = inputNombreProducto.value.length;
	
	if (valorNombreProducto !== "" || valorNombreProducto !== null) {
		if (valorNombreProducto.length < 6) {
			document.getElementById('message').style.color = 'red';
			document.getElementById('message').innerHTML
				= '☒ El nombre del Producto debe ser mínimo 6 caracteres y van: '+ caracteres;
			document.getElementById('botonSubmit').disabled = true;
			document.getElementById('botonSubmit').style.opacity = (0.4);
			document.getElementById('tipoNivel').disabled = true;
		} else {
			document.getElementById('message').style.color = 'green';
			document.getElementById('message').innerHTML
				= '🗹 Largo de Nombre Producto aceptable!';
			document.getElementById('tipoNivel').disabled = false;	
		}
	} else {
		document.getElementById('message').innerHTML = "";
		document.getElementById('botonSubmit').disabled = true;
		document.getElementById('botonSubmit').style.opacity = (0.4);
		document.getElementById('tipoNivel').disabled = true;
	}
}

/*------------------ Evento limpiar campos Form -----------------------*/
var clearForm = document.getElementById('reseteo');
clearForm.addEventListener('click', limpiarForm);

function limpiarForm(){
	document.getElementById('botonSubmit').disabled = false;
	document.getElementById('botonSubmit').style.opacity = (0.4);
	document.getElementById('message').innerHTML = "";
	document.getElementById('tipoNivel').disabled = true;
	document.getElementById('inputValorDeclarado').disabled = true;
	document.getElementById('inputPesoDeclarado').disabled = true;
	document.getElementById('inputTrayecto').disabled = true;
	document.getElementById('fecha').disabled = true;

	document.getElementById('salida').innerHTML = "";
	document.getElementById('datos').innerHTML = "";
}

/*----------------------------- Evento select -------------------------*/
var selectTipoCarga = document.getElementById('tipoNivel');
selectTipoCarga.addEventListener('change', habilitarBtnSubmit);

function habilitarBtnSubmit() {
	if (selectTipoCarga.value === "selection") {
		document.getElementById('botonSubmit').disabled = true;
		document.getElementById('botonSubmit').style.opacity = (0.4);
		document.getElementById('inputValorDeclarado').disabled = true;
	} else {
		document.getElementById('inputValorDeclarado').disabled = false;
		document.getElementById('inputValorDeclarado').focus();
	}
}

/*---------------- Evento campo valor declarado ----------------------*/
var campoValorDeclarado = document.getElementById('inputValorDeclarado');
campoValorDeclarado.addEventListener("keypress", soloNumeros, false);
campoValorDeclarado.addEventListener('input', habilitarCampoValorDeclarado);

function habilitarCampoValorDeclarado() {
	
	if (campoValorDeclarado == "") {
		document.getElementById('botonSubmit').disabled = true;
		document.getElementById('inputPesoDeclarado').disabled = true; 
	} else {
		document.getElementById('inputPesoDeclarado').disabled = false;
	}
}

//Solo permite introducir numeros y el "."
function soloNumeros(e){
	var key = window.event ? e.which : e.keyCode;
	console.log("tecla: " + key);
	if (key < 46 || key > 57) {
	  e.preventDefault();
	} 
  }


/*---------------- Evento campo Peso carga declarado ----------------------*/
var campoPesoDeclarado = document.getElementById('inputPesoDeclarado');
campoPesoDeclarado.addEventListener('input', habilitarCampoPesoDeclarado);
campoPesoDeclarado.addEventListener("keypress", soloNumerosPeso, false);

function habilitarCampoPesoDeclarado() {
	if (campoPesoDeclarado == "") {
		document.getElementById('botonSubmit').disabled = true;
		document.getElementById('inputTrayecto').disabled = true; 
	} else {
		document.getElementById('inputTrayecto').disabled = false;
	}
}

//Solo permite introducir numeros
function soloNumerosPeso(e){
	var key = window.event ? e.which : e.keyCode;
	console.log("tecla: " + key);
	if (key < 48 || key > 57) {
	  e.preventDefault();
	} 
  }

/*----------------------- Evento campo trayecto --------------------------*/
var campoFechaSalida = document.getElementById('inputTrayecto');
campoFechaSalida.addEventListener('change', habilitarCampoFecha);
campoFechaSalida.addEventListener("keypress", soloNumerosTrayecto, false);

function habilitarCampoFecha() {

	if (campoFechaSalida.value == "today") {
		document.getElementById('botonSubmit').disabled = true;
		document.getElementById('fecha').disabled = true; 
	} else {
		document.getElementById('botonSubmit').disabled = false;
		document.getElementById('botonSubmit').style.opacity = (1);
		document.getElementById('fecha').disabled = false;
	}
}

//Solo permite introducir numeros
function soloNumerosTrayecto(e){
	var key = window.event ? e.which : e.keyCode;
	console.log("tecla: " + key);
	if (key < 48 || key > 57) {
	  e.preventDefault();
	} 
  }

/*------ Evento limitar fecha de salida carga no menor a hoy -----------*/
var limitarFecha = document.getElementById('fecha');
limitarFecha.addEventListener('click', limitarMinMaxFechaHoy);

function limitarMinMaxFechaHoy(){
	var today = new Date().toISOString().slice(0, -14);
	var tomorrow = new Date();
	
	var limiteFechaFutura = tomorrow.setTime(tomorrow.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 días desde hoy.

	var tomorrowDate = new Date(limiteFechaFutura).toISOString().slice(0, -14);
	
	var input = document.getElementById('fecha');
	input.setAttribute('min', today);
	input.setAttribute('max', tomorrowDate);

	document.getElementById('message3').innerHTML
				= `🗹 Fecha máxima salida de carga: ${tomorrowDate}`;
}
/*--------------------------------------- fin Eventos --------------------------------------*/

class Producto {
    constructor(nombre, tipo, valor) {
        this.nombre = nombre.toUpperCase();
		this.tipo = tipo;
		this.valor = valor;
	}
    
	generarConstTipo() {
		let tipoCarga = [];

		if (this.tipo == "normal"){
			tipoCarga = [1, "Normal", "success"];
		}
		else if (this.tipo == "fragil") {
			tipoCarga = [2, "Frágil", "primary"];
		} 
		else if (this.tipo == "cuidado"){
			tipoCarga = [3, "Requiere Conservación", "warning"];
		}
		else if (this.tipo == "peligro") {
			tipoCarga = [5, "Peligroso", "danger"];
		}
		return tipoCarga;
	}

	generarConstValor(){
		let valorDeclarado = [];

		if (this.valor > 0 && this.valor <= 5000){
			valorDeclarado = [1, this.valor];
		}
		else if (this.valor > 5000 && this.valor <= 10000) {
			valorDeclarado = [2, this.valor];
		}
		else if (this.valor > 10000 && this.valor <= 50000) {
			valorDeclarado = [3, this.valor];
		}
		else if (this.valor > 50000 && this.valor <= 80000) {
			valorDeclarado = [4, this.valor];
		}
		else if (this.valor > 80000) {
			valorDeclarado = [5, this.valor];
		}
		else {
			Toastify({
				text: "Debe ingresar un dato numerico para Valor declarado!",
				duration: 2500,
				destination: "#",
				// newWindow: true,
				close: true,
				gravity: "top", // `top` or `bottom`
				position: "center", // `left`, `center` or `right`
				stopOnFocus: true, // Prevents dismissing of toast on hover
				style: {
				  background: "linear-gradient(to right,  #e52d4d, #da2f54, #ce325b, #c2365f, #b53963, #aa355c, #a03255, #952e4e, #89243d, #7d1a2e, #70111f, #620810)",
				},
				offset: {
				  x: 10, // horizontal axis
				  y: 50, // vertical axis
				},
				// onClick: function(){} // Callback after click
			  }).showToast();
			  remover();
		}
		return valorDeclarado;			
	}

	generarClasificacion(tipoCarga, valorCarga) {
		let clasificacion = parseInt(tipoCarga[0] * valorCarga[0]);
		return clasificacion;
	}
}

var tipoNivel = document.getElementById('tipoNivel');
tipoNivel.addEventListener("change", update);

function update() {
	var select = document.getElementById('tipoNivel');
	var option = select.options[select.selectedIndex];
	
	if (option.value != null) {
	document.getElementById('valorTipoNivel').value = option.value;
	return option.value;
	}
}

var botonSubmit = document.getElementById('botonSubmit');
botonSubmit.addEventListener("click", obtenerDatosForm);

/**--------------------- funcion para obtener datos del form ------------------------------- */
function obtenerDatosForm() {
		var pesoCarga = document.getElementById('inputPesoDeclarado').value;
		var trayecto = document.getElementById('inputTrayecto').value;
		var tipoTransporteExclusivo = document.getElementById('gridRadios1').value;
		var tipoTransporteComun = document.getElementById('gridRadios2').value;
		var tipoTransporte;
		
		document.getElementById('gridRadios1').checked ? tipoTransporte=tipoTransporteExclusivo : tipoTransporte=tipoTransporteComun;
		
		var nombreProducto = document.getElementById('inputNombreProducto').value;
		var tiponivel = update();
		var valordeclarado = document.getElementById('inputValorDeclarado').value;

		var transporte1 = new Producto(	nombreProducto,
										tiponivel,
										valordeclarado,
										);
		var nombre = transporte1.nombre;
		var tipoCarga = transporte1.generarConstTipo(transporte1.tipo);
		var valorCarga = transporte1.generarConstValor(transporte1.valor);
		var clasificacion = transporte1.generarClasificacion(tipoCarga, valorCarga);
				
		var fecha = document.getElementById('fecha').value;
		
		var result = [pesoCarga, trayecto, tipoTransporte, nombre, tipoCarga, valorCarga, clasificacion, fecha];

		let container = document.getElementById('salida');

		if (result[0] > 0 && result[1] > 0) {
			var precioPorKilo = parseFloat(precioPeso * result[0]);
			
			container.innerHTML = (`<ul id="ul">
										<li>Precio por carga <span class="badge bg-secondary"> ${result[0]} Kg.</span> es: $${precioPorKilo.toFixed(2)}</li>
									</ul>`);
		} else {
			Toastify({
				text: "Debe ingresar un dato numerico para Peso de Carga y/o trayecto!",
				duration: 2500,
				//destination: "#",
				// newWindow: true,
				close: true,
				gravity: "top", // `top` or `bottom`
				position: "center", // `left`, `center` or `right`
				stopOnFocus: true, // Prevents dismissing of toast on hover
				style: {
				  background: "linear-gradient(to right, #DC2424 0%, #4A569D  51%, #DC2424  100%)",
				},
				offset: {
				  x: 10, // horizontal axis
				  y: 50, // vertical axis
				},
				// onClick: function(){} // Callback after click
			  }).showToast();
			  remover();
		}

		var precioPorKilometro = parseFloat(result[1] * precioKm);
		
		let ul = document.getElementById('ul');
		let li = document.createElement('li');
		
		li.innerHTML = (`Precio por distancia <span class="badge bg-primary"> ${result[1]} Km.</span> es: $ ${precioPorKilometro.toFixed(2)} <br>`);
		
		var subtotal = parseFloat((precioPorKilo + precioPorKilometro) * clasificacion);
	
		li.innerHTML += (`<li>Tipo de carga declarada: <span class="badge bg-${tipoCarga[2]} "> ${tipoCarga[1]} </span></li>`);
		li.innerHTML += (`<li>Valor de carga declarada: <strong>$ ${valorCarga[1]} </strong></li>`);
		li.innerHTML += (`<li>Coeficiente de carga: <span class="badge rounded-pill bg-dark">x ${clasificacion} </span></li>`);
		li.innerHTML += (`<li>SubTotal sin IVA es: <strong>$${subtotal.toFixed(2)}</strong></li>`);


		var iva = parseFloat(subtotal * 0.21);
		li.innerHTML += (`<li>El IVA es: $${iva.toFixed(2)}</li><br>`);

		ul.appendChild(li);

		if (tipoTransporte == "E") {
			transporte = "Exclusivo";
			li.innerHTML += (`<li>Tipo de transporte: <span class="badge bg-danger"> ${transporte} </span> (No posee descuento)</li>`);
		} else {
			descuento = parseFloat(precioPorKilometro * 0.055);
			transporte = "Común";
			li.innerHTML += (`<li>Tipo de transporte: <span class="badge bg-success"> ${transporte}</span></li>`);
			li.innerHTML += (`<li>Descuento es de: $${descuento.toFixed(2)}</li><br>`);
		} 
		

		function calculoFechaEntrega() {
			var dateTime = luxon.DateTime;
			var dt = dateTime.now();
			var fechaActual = dt.toLocaleString(dateTime.DATETIME_SHORT);
				
				li.innerHTML += (`<li>Fecha ingreso pedido (actual): ${fechaActual} hs</li>`);
				li.innerHTML += (`<li>Fecha salida carga: ${result[7]}</li>`);
							
			/* -------Funcion para mostrar la fecha de entrega a partir de hoy según tipoTransporte y distancia -------*/
				const fechaFutura = () => {
					var futuro = new Date(result[7]);
					futuro.setDate(futuro.getDate() + dias);

					var dia = futuro.getDate(),
						mes = futuro.getMonth() + 1, 
						anio = futuro.getFullYear(),
						fechaFuturaMuestra;
					
						dia < 10 ? dia = "0"+dia : dia;
						mes < 10 ? mes = "0"+mes : mes;
							
					fechaFuturaMuestra = dia + "-" + mes + "-" + anio;
					return fechaFuturaMuestra;
				}	
				
			
				if ((tipoTransporte == "E") && trayecto <= 200) {
					var dias = 3;
					li.innerHTML += (`<li>Fecha entrega carga: ${fechaFutura()} </li><span class="badge rounded-pill bg-success">${dias-1} días</span> destino en radio menor a 200Km<br><br></div>`);
				}
				else if ((tipoTransporte == "E") && trayecto > 200 ) {
					var dias = 4;
					li.innerHTML += (`<li>Fecha entrega carga: ${fechaFutura()}</li><span class="badge rounded-pill bg-info"> ${dias-1} días</span> destino en radio mayor a 200Km<br><br></div>`);
				}
				else if ((tipoTransporte == "C") && trayecto <= 200 ) {
					var dias = 6;
					li.innerHTML += (`<li>Fecha entrega carga: ${fechaFutura()}</li><span class="badge rounded-pill bg-dark"> ${dias-1} días</span> destino en radio menor a 200Km<br><br></div>`);
				}
				else {
					var dias = 8;
					li.innerHTML += (`<li>Fecha entrega carga: ${fechaFutura()}</li><span class="badge rounded-pill bg-danger"> ${dias-1} días</span> destino en radio mayor a 200Km<br><br></div>`);
				}
			};

			calculoFechaEntrega();

			var precioTotal = parseFloat(subtotal + iva - descuento).toFixed(2);
			
			container.innerHTML += (`<div class="w-50 p-2 alert alert-primary mx-auto" role="alert">
										El <b>Precio Total</b> del transporte del producto<br><strong> ${result[3]} </strong><br>es: <strong>$ ${precioTotal} </strong>
									</div>
									<div class="contenedorBotones" id="contenedorBotones">  
										<button type="button" class="btn btn-secondary my-3 me-2" style="width: 8rem" onclick="recotizar();">Recotizar <i class="fa fa-usd"></i></button> 
										<button id="destinos" type="button" class="btn btn-success my-3 mx-2" style="width: 13rem" title="Ver destinos posibles, respecto trayecto ingresado" >Ver destinos posibles <i class="fa fa-map-marker" aria-hidden="true"></i></button>
										<button type="button" class="btn btn-danger my-3 ms-2" style="width: 8rem" onclick="cerrar_pagina();">Salir <i class="fa fa-sign-out"></i></button>
									</div>`);
		
		/*-------- funcion para ver los destinos posibles según distancia ingresada -------------------*/

		var destinos = document.getElementById('destinos');

		if (destinos) {
		destinos.addEventListener("click", verDestinos);
		}

			function verDestinos() { 
				let datos = document.getElementById("datos");
				datos.style.opacity = 1;

				let trayecto = parseInt(document.getElementById('inputTrayecto').value);
				let radio = 10;

				let radioDestino = trayecto + radio;
				/*-----------------------------------------------*/
				let url = './json/ciudades.json';
				
				fetch(url)
				 	.then(response => response.json())
				 	.then(data => mostrarDataCentros(data))
				 	.catch(error => console.log(error));
				
					 /*------------------------ Mostrar destinos ---------------------------*/
				 mostrarDataCentros = (data) => {
						let destinosFiltrados = data.filter(data => data.distancia <= radioDestino);
						destinosFiltrados.sort((a, b) => b.distancia - a.distancia);

						let listaDestinos = document.createElement('div');
						listaDestinos.classList.add('row');
					
							if (destinosFiltrados.length > 0) {
							datos.innerHTML = (`Centros de Distribución posibles según distancia ingresada (${trayecto} Km. mas un radio de ${radio} Km)`);
		
							for (const ciudad of destinosFiltrados) {
								listaDestinos.innerHTML += (`<div class="col-3">
																<div class="card text-white bg-success my-3 mx-auto" style="max-width: 18rem;">
																	<div class="card-header">Centro Distribución Ciudad de</div>
																		<div class="card-body">
																			<h5 class="card-title"><strong>${ciudad.nombre}</strong></h5>
																			<p class="card-text">Distancia desde Córdoba<br><strong>${ciudad.distancia}</strong> Km.</p>
																			<button type="button" id="${ciudad.id}" class="btn btn-dark botonSeleccionable">Elegir</button>
																		</div>		
																	</div>
																</div>
															 </div>`);
															
								document.getElementById('datos').appendChild(listaDestinos);
							}
							/*------------------------ Cargar registros al localStorge ---------------------------*/
							var allButtons = document.querySelectorAll('div.card-body button');	
								//console.log(allButtons);
								
								allButtons.forEach(function(btn){
									btn.addEventListener("click", cargaHistorial);
								});
															
									function generateRandomInteger(max, min) {
										return Math.floor(Math.random() * (max-min+1)) + min;
									}
									
									function cargaHistorial(e) {
										var indice = parseInt(e.target.id);
										var keyStorage = "Historial";  
										var historialLocalStorage = localStorage.getItem(`${keyStorage}`);
										let arrayHistorial = [];
										var dateTime = luxon.DateTime;
										var dt = dateTime.now();
										var fechaActual = dt.toLocaleString(dateTime.DATETIME_SHORT);
								
										var resulta2 = [
											{id: generateRandomInteger(100, 99999),
											nombre: nombre,
											tipoDeCarga: tiponivel,
											pesoCarga: pesoCarga,
											trayecto: trayecto,
											tipoTransporte: tipoTransporte,
											valorCarga: valorCarga[1],
											clasificacion: clasificacion,
											fecha: fecha,
											ciudad: data[indice].nombre,
											distancia: data[indice].distancia,
											fechaActual: fechaActual,
											}
										];
								
										if (historialLocalStorage !== null) {
											arrayHistorial = JSON.parse(historialLocalStorage);
										}
										
										arrayHistorial.push(resulta2);
										
										const enJSON = JSON.stringify(arrayHistorial);
								
										localStorage.setItem(`${keyStorage}`, enJSON);
								
										allButtons.forEach(function(e){
											e.disabled = true;
											e.style.opacity = (0.4);
										});
								
										Swal.fire({
												title: 'Genial!',
												text: `El registro #${resulta2[0].id} se cargó con éxito en el localStorage`,
												icon: 'success',
												confirmButtonText: 'OK',
												showDenyButton: true,
												showCancelButton: true,
												confirmButtonText: 'Ver Historial',
												denyButtonText: `Cargar otro Registro`,
										}).then((result) => {
											if (result.isConfirmed) {
												window.location = "./pages/historial.html";
											} else if (result.isDenied) {
												recotizar();
											}
										  });
								
										document.getElementById('destinos').disabled = true;
										document.getElementById('destinos').style.opacity = (0.4);
										document.getElementById('botonSubmit').disabled = true;
										document.getElementById('botonSubmit').style.opacity = (0.4);
									};
								/*------------------------- fin Local Storge sigue en javascriptHistorial.js------------------------*/
							
						} else {
							listaDestinos.innerHTML = (`No existen Centros de Distribución posibles con el dato ingresado!!`);
							document.getElementById('datosRow').appendChild(listaDestinos);
							document.getElementById('inputTrayecto').focus();
						}
				}
			}		
		
		return result;
} 
/* --------- fin funcion obtenerDatos() -------*/

/* ------- funciones para botones --------- */
function recotizar(){
	location.reload('index.html');
}
								
function cerrar_pagina() {
	Swal.fire({
		title: 'Realmente quieres cerrar esta página?',
		text: "Lo extrañaremos!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		cancelButtonText: 'Me quedo',
		confirmButtonText: 'Si, Salir'
	  }).then((result) => {
		if (result.isConfirmed) {
			window.close();
		}
	});
}	
/* ------- fin funciones para botones --------- */

let contenedor = document.getElementById("salida");

//var body = document.body.addEventListener("load", inicio);						

function inicio() {
	document.getElementById('inputNombreProducto').focus();
	document.getElementById('botonSubmit').disabled = true;
	document.getElementById('botonSubmit').style.opacity = (0.4);
};


