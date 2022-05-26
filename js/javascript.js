/*--- Simulador interactivo Cotizacion Transporte - CoderHouse - Javascript - German Montalbetti -----*/
/*---------------------------------------- Proyecto Final ------------------------------------------*/
/**Declaracion de letiables */
const precioPeso = 18.25;
const precioKm = 3.95;
let descuento = 0;
let transporte = "";

/*--------------funcion remover elementos si se ingresan datos erroneos ----------------*/
function remover() {
	let elemento = document.getElementById('datos');
	elemento.parentNode.removeChild(elemento);
	return false;
}

/*------------------ Evento cantidad de caracteres Nombre Producto -----------------------*/
let inputNombreProducto = document.getElementById('inputNombreProducto');
inputNombreProducto.addEventListener("input", validarNombreProducto);

function validarNombreProducto() {
	
	let valorNombreProducto = document.getElementById('inputNombreProducto').value;
	let caracteres = inputNombreProducto.value.length;
	
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
let clearForm = document.getElementById('reseteo');
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
	document.getElementById('message3').innerHTML = "";
	document.getElementById('datos').style.opacity = (0);
	document.getElementById('inputNombreProducto').focus();
}

/*----------------------------- Evento select -------------------------*/
let selectTipoCarga = document.getElementById('tipoNivel');
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
let campoValorDeclarado = document.getElementById('inputValorDeclarado');
campoValorDeclarado.addEventListener("keypress", soloNumerosValorDeclarado, false);
campoValorDeclarado.addEventListener('input', habilitarCampoValorDeclarado);

function habilitarCampoValorDeclarado() {
	
	if (campoValorDeclarado.value === "" || campoValorDeclarado.value == null) {
		document.getElementById('botonSubmit').disabled = true;
		document.getElementById('botonSubmit').style.opacity = (0.4);
	} else {
		document.getElementById('inputPesoDeclarado').disabled = false;
	}
}

//Solo permite introducir numeros y el "."
function soloNumerosValorDeclarado(e){
	let key = window.event ? e.which : e.keyCode;
	
	if (key < 46 || key > 57) {
	  e.preventDefault();
	} 
  }

/*---------------- Evento campo Peso carga declarado ----------------------*/
let campoPesoDeclarado = document.getElementById('inputPesoDeclarado');
campoPesoDeclarado.addEventListener('input', habilitarCampoPesoDeclarado);
campoPesoDeclarado.addEventListener("keypress", soloNumeros, false);

function habilitarCampoPesoDeclarado() {
	if (campoPesoDeclarado.value === "" || campoPesoDeclarado.value === null) {
		document.getElementById('botonSubmit').disabled = true;
		document.getElementById('botonSubmit').style.opacity = (0.4);
	} else {
		document.getElementById('inputTrayecto').disabled = false;
	}
}

//Solo permite introducir numeros
function soloNumeros(e){
	let key = window.event ? e.which : e.keyCode;
	
	if (key < 48 || key > 57) {
	  e.preventDefault();
	} 
  }

/*----------------------- Evento campo trayecto --------------------------*/
let campoInputTrayecto = document.getElementById('inputTrayecto');
campoInputTrayecto.addEventListener('input', habilitarCampoFecha);
campoInputTrayecto.addEventListener('keypress', soloNumeros, false);
campoInputTrayecto.addEventListener('change', habilitarFocus);

function habilitarCampoFecha() {

	if (campoInputTrayecto.value === "" || campoInputTrayecto.value === null) {
		document.getElementById('botonSubmit').disabled = true;
		document.getElementById('botonSubmit').style.opacity = (0.4);
		 
	} else {
		document.getElementById('fecha').disabled = false;
	}
}

function habilitarFocus(){
	document.getElementById('fecha').focus();
}


/*----------------------- Evento campo fecha --------------------------*/
let campoInputFecha = document.getElementById('fecha');
campoInputFecha.addEventListener('change', habilitarBotonSubmit);

function habilitarBotonSubmit() {

	if (campoInputFecha.value === "" || campoInputFecha.value === null) {
		document.getElementById('botonSubmit').disabled = true;
		document.getElementById('botonSubmit').style.opacity = (0.4);
		
	} else {
		document.getElementById('botonSubmit').disabled = false;
		document.getElementById('botonSubmit').style.opacity = (1);
	}
}


/*------ Evento limitar fecha de salida carga no menor a hoy -----------*/
let limitarFecha = document.getElementById('fecha');
limitarFecha.addEventListener('click', limitarMinMaxFechaHoy);

function limitarMinMaxFechaHoy(){
	let today = new Date().toISOString().slice(0, -14);
	let tomorrow = new Date();
	
	let limiteFechaFutura = tomorrow.setTime(tomorrow.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 días desde hoy.

	let tomorrowDate = new Date(limiteFechaFutura).toISOString().slice(0, -14);
	
	let input = document.getElementById('fecha');
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

		if (this.tipo === "normal"){
			tipoCarga = [1, "Normal", "success"];
		}
		else if (this.tipo === "fragil") {
			tipoCarga = [2, "Frágil", "primary"];
		} 
		else if (this.tipo === "cuidado"){
			tipoCarga = [3, "Requiere Conservación", "warning"];
		}
		else if (this.tipo === "peligro") {
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
				text: "Debe ingresar un dato numerico para Valor Declarado!",
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

let tipoNivel = document.getElementById('tipoNivel');
tipoNivel.addEventListener("change", update);

function update() {
	let select = document.getElementById('tipoNivel');
	let option = select.options[select.selectedIndex];
	
	if (option.value != null) {
	document.getElementById('valorTipoNivel').value = option.value;
	return option.value;
	}
}

let botonSubmit = document.getElementById('botonSubmit');
botonSubmit.addEventListener("click", obtenerDatosForm);


/**--------------------- funcion para obtener datos del form ------------------------------- */
function obtenerDatosForm() {

		let pesoCarga = document.getElementById('inputPesoDeclarado').value;
		let trayecto = document.getElementById('inputTrayecto').value;
		let tipoTransporteExclusivo = document.getElementById('gridRadios1').value;
		let tipoTransporteComun = document.getElementById('gridRadios2').value;
		let container = document.getElementById('salida');
		let tipoTransporte;
		
		document.getElementById('gridRadios1').checked ? tipoTransporte=tipoTransporteExclusivo : tipoTransporte=tipoTransporteComun;
		
		let nombreProducto = document.getElementById('inputNombreProducto').value;
		let tiponivel = update();
		let valordeclarado = document.getElementById('inputValorDeclarado').value;

		let transporte1 = new Producto(	nombreProducto,
										tiponivel,
										valordeclarado,
										);
		let nombre = transporte1.nombre;
		let tipoCarga = transporte1.generarConstTipo(transporte1.tipo);
		let valorCarga = transporte1.generarConstValor(transporte1.valor);
		let clasificacion = transporte1.generarClasificacion(tipoCarga, valorCarga);
		let precioPorKilo = 0;
		let fecha = document.getElementById('fecha').value;
		
		let result = [pesoCarga, trayecto, tipoTransporte, nombre, tipoCarga, valorCarga, clasificacion, fecha];

		if (result[0] > 0 && result[1] > 0) {
			let precioPorKilo = parseFloat(precioPeso * result[0]);
			
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

		let precioPorKilometro = parseFloat(result[1] * precioKm);
		
		let ul = document.getElementById('ul');
		let li = document.createElement('li');
		
		li.innerHTML = (`Precio por distancia <span class="badge bg-primary"> ${result[1]} Km.</span> es: $ ${precioPorKilometro.toFixed(2)} <br>`);
		
		let subtotal = parseFloat((precioPorKilo + precioPorKilometro) * clasificacion);
	
		li.innerHTML += (`<li>Tipo de carga declarada: <span class="badge bg-${tipoCarga[2]} "> ${tipoCarga[1]} </span></li>
						  <li>Valor de carga declarada: <strong>$ ${valorCarga[1]} </strong></li>
						  <li>Coeficiente de carga: <span class="badge rounded-pill bg-dark">x ${clasificacion} </span></li>
						  <li>SubTotal sin IVA es: <strong>$${subtotal.toFixed(2)}</strong></li>`);

		let iva = parseFloat(subtotal * 0.21);
		li.innerHTML += (`<li>El IVA es: $${iva.toFixed(2)}</li><br>`);

		ul.appendChild(li);

		if (tipoTransporte === "E") {
			transporte = "Exclusivo";
			li.innerHTML += (`<li>Tipo de transporte: <span class="badge bg-danger"> ${transporte} </span> (No posee descuento)</li>`);
		} else {
			descuento = parseFloat(precioPorKilometro * 0.055);
			transporte = "Común";
			li.innerHTML += (`<li>Tipo de transporte: <span class="badge bg-success"> ${transporte}</span></li>
							  <li>Descuento es de: $${descuento.toFixed(2)}</li><br>`);
		} 
		

		function calculoFechaEntrega() {
			let dateTime = luxon.DateTime;
			let dt = dateTime.now();
			let fechaActual = dt.toLocaleString(dateTime.DATETIME_SHORT);
				
				li.innerHTML += (`<li>Fecha ingreso pedido (actual): ${fechaActual} hs</li>
								  <li>Fecha salida carga: ${result[7]}</li>`);
							
			/* -------Funcion para mostrar la fecha de entrega a partir de hoy según tipoTransporte y distancia -------*/
				const fechaFutura = (dias) => {
					let futuro = new Date(result[7]);
					futuro.setDate(futuro.getDate() + dias);

					let dia = futuro.getDate(),
						mes = futuro.getMonth() + 1, 
						anio = futuro.getFullYear(),
						fechaFuturaMuestra;
					
						dia < 10 ? dia = "0"+dia : dia;
						mes < 10 ? mes = "0"+mes : mes;
							
					fechaFuturaMuestra = dia + "-" + mes + "-" + anio;
					return fechaFuturaMuestra;
				}	
				
				if ((tipoTransporte == "E") && trayecto <= 250) {
					let dias = 3;
					li.innerHTML += (`<li>Fecha entrega carga: ${fechaFutura()} </li><span class="badge rounded-pill bg-success">${dias-1} días</span> destino en radio menor a 250Km<br><br></div>`);
				}
				else if ((tipoTransporte == "E") && trayecto > 250 ) {
					let dias = 4;
					li.innerHTML += (`<li>Fecha entrega carga: ${fechaFutura()}</li><span class="badge rounded-pill bg-info"> ${dias-1} días</span> destino en radio mayor a 250Km<br><br></div>`);
				}
				else if ((tipoTransporte == "C") && trayecto <= 250 ) {
					let dias = 6;
					li.innerHTML += (`<li>Fecha entrega carga: ${fechaFutura()}</li><span class="badge rounded-pill bg-dark"> ${dias-1} días</span> destino en radio menor a 250Km<br><br></div>`);
				}
				else {
					let dias = 8;
					li.innerHTML += (`<li>Fecha entrega carga: ${fechaFutura()}</li><span class="badge rounded-pill bg-danger"> ${dias-1} días</span> destino en radio mayor a 250Km<br><br></div>`);
				}
			};

			calculoFechaEntrega();

			let precioTotal = parseFloat(subtotal + iva - descuento).toFixed(2);
			
			container.innerHTML += (`<div class="w-50 p-2 alert alert-primary mx-auto" role="alert">
										El <b>Precio Total</b> del transporte del producto<br><strong> ${result[3]} </strong><br>es: <strong>$ ${precioTotal} </strong>
									</div>
									<div class="contenedorBotones" id="contenedorBotones">  
										<button id="destinos" type="button" class="btn btn-success my-3 mx-2" style="width: 13rem" title="Ver destinos posibles, respecto trayecto ingresado" >Ver destinos posibles <i class="fa fa-map-marker" aria-hidden="true"></i></button>
										<button id="recotizar" type="button" class="btn btn-secondary my-3 me-2" style="width: 8rem" onclick="recotizar()">Recotizar <i class="fa fa-usd"></i></button>  
										<button type="button" class="btn btn-danger my-3 ms-2" style="width: 8rem" onclick="cerrar_pagina();">Salir <i class="fa fa-sign-out"></i></button>
									</div>`);
																														
		/*-------- funcion para ver los destinos posibles según distancia ingresada -------------------*/
		let destinos = document.getElementById('destinos');

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
							let allButtons = document.querySelectorAll('div.card-body button');	
								
								allButtons.forEach(function(btn){
									btn.addEventListener("click", cargaHistorial);
								});
															
									function generateRandomInteger(max, min) {
										return Math.floor(Math.random() * (max-min+1)) + min;
									}
									
									function cargaHistorial(e) {
										let indice = parseInt(e.target.id);
										let keyStorage = "Historial";  
										let historialLocalStorage = localStorage.getItem(`${keyStorage}`);
										let arrayHistorial = [];
										let dateTime = luxon.DateTime;
										let dt = dateTime.now();
										let fechaActual = dt.toLocaleString(dateTime.DATETIME_SHORT);
								
										let resulta2 = [
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
							Toastify({
								text: "No existen Centros de Distribución posibles con el dato ingresado!!",
								duration: 2750,
								destination: "#",
								// newWindow: true,
								close: true,
								gravity: "bottom", // `top` or `bottom`
								position: "center", // `left`, `center` or `right`
								stopOnFocus: true, // Prevents dismissing of toast on hover
								style: {
								  background: "linear-gradient(to right,  #e52d4d, #da2f54, #70111f, #620810)",
								},
								offset: {
								  x: 10, // horizontal axis
								  y: 50, // vertical axis
								},
								// onClick: function(){} // Callback after click
							  }).showToast();
							destinos.disabled = true;  
							destinos.style.opacity = (.4);  
							document.getElementById('datosRow').appendChild(listaDestinos);
							document.getElementById('inputTrayecto').focus();
						}
				}
			}		
		
		return result;

} /* --------- fin funcion obtenerDatos() -------*/ 


/* ------- funciones para botones --------- */
function recotizar(){
		location.reload('index.html');
}
		
let btnSalida = document.getElementById('cerrarPagina');
btnSalida.addEventListener('click',cerrar_pagina);

function cerrar_pagina() {
	Swal.fire({
		title: 'Realmente quieres cerrar esta página?',
		text: "Lo extrañaremos!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#308530',
		cancelButtonText: 'Me quedo',
		confirmButtonText: 'Si, Salir'
	  }).then((result) => {
		if (result.isConfirmed) {
			window.open("./pages/splashout.html", '_self');
		};
	});
}	
/* ------- fin funciones para botones --------- */

// let contenedor = document.getElementById("salida");

	const splash = document.querySelector('.splash');

	const sessionIniciada = sessionStorage.getItem("inicioSplash");
	
	if(sessionIniciada){
		document.getElementById('inputNombreProducto').focus();
		document.getElementById('botonSubmit').disabled = true;
		document.getElementById('botonSubmit').style.opacity = (0.4);
		splash.classList.add('display-none-init');
	
	} else {
		document.addEventListener('DOMContentLoaded', (e)=>{
			sessionStorage.setItem('inicioSplash', true);
			
			setTimeout(()=>{
				splash.classList.add('display-none');
			}, 3800);
			e.preventDefault();

			document.getElementById('inputNombreProducto').focus();
			document.getElementById('botonSubmit').disabled = true;
			document.getElementById('botonSubmit').style.opacity = (0.4);
		});
	};