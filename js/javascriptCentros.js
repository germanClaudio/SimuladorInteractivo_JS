/*--- Simulador interactivo Cotizacion Transporte - Javascript - German Montalbetti -----*/
/*---------------------------------------- Proyecto Final ------------------------------------------*/

let verCentrosDistribucion = document.getElementById('verCentrosDistribucion');
	verCentrosDistribucion.addEventListener('click', buscarDestinos);
	
	function buscarDestinos() {
		let url = '../json/ciudades.json';

		fetch(url)
			.then(response => response.json())
			.then(data => mostrarData(data))
			.catch(error => console.log(error));

		const mostrarData = (data) => {
			
			function delay (ms) {
				return new Promise((resolve) => setTimeout(resolve,ms));
			}
			/*------------------- Simula conexión lenta a Servidor -------------------------*/
			async function simulacion () {
				var body = "";

				for (let i = 0; i <= data.length; i++){
					var serverTime = Math.random()*700;
					await delay(serverTime);
										
					if (i < data.length){
						body += `<tr><td>${data[i].id}</td>
											<td>${data[i].nombre}</td>
											<td>${data[i].distancia} Km</td>
											<td>${data[i].telefono}</td>
											<td>${data[i].asistentes}</td>
											<td><ul><strong>Camiones:</strong> ${data[i].flota[0].camiones}</ul>
												<ul><strong>Utilitarios:</strong> ${data[i].flota[0].utilitarios}</ul>
												<ul><strong>Motos:</strong> ${data[i].flota[0].motos}</ul>
											</td>
										</tr>`;
				
			 			document.getElementById('tbodyCentros').innerHTML = body;

					} else if (i = data.length) {
						
						body += `<tr>
			 							<td scope="col" colspan="6" class="text-center">
			 								<i class="fa fa-info-circle" aria-hidden="true"></i>
			 									---------------------- Fin de Tabla Centros de Distribucion ----------------------- 
			 								<i class="fa fa-info-circle" aria-hidden="true"></i>
			 							</td> 
			 						  </tr>`;
						document.getElementById('tbodyCentros').innerHTML = body;;
					} 
				}
				
			}
			
			simulacion();
	
				let cantidadCentros = document.getElementById('cantidadCentros');
				let cantidadItemsCentros = data.length;
				
				cantidadCentros.innerHTML = `Cantidad de Centros: <span class="badge rounded-pill bg-dark">${cantidadItemsCentros}</span>`;

				verCentrosDistribucion.disabled = true;
				verCentrosDistribucion.style.opacity = (0.4);

                setTimeout(btnVolverFocus, 13000);
				
                function btnVolverFocus(){
					document.getElementById('btnVolver').focus();
				}
		}
	
	}