/*--- Simulador interactivo Cotizacion Transporte 2 - Javascript - German Montalbetti -----*/
/*---------------------------------------- Proyecto Final ------------------------------------------*/

/**Declaracion de variables */
let verHistorial = document.getElementById('verHistorial');
let borrarHistorial = document.getElementById('borrarHistorial');
let borrarRegistro = document.getElementById('borrarRegistro');
let alertas = document.getElementById('alertas');
var datosHistorial = JSON.parse(localStorage.getItem('Historial'));

verHistorial.addEventListener('click', mostarStorage);

function mostarStorage() {
  let cantidadRegistros = document.getElementById('cantidadRegistros');
  let verDatosHistorial = document.getElementById('tbodyDatos');
  let localStorageHistorial = JSON.parse(localStorage.getItem("Historial")) || [];
  let cantidadItemsHistorial = localStorageHistorial.length;

  cantidadRegistros.innerHTML = `Cantidad de Registros: <span class="badge rounded-pill bg-dark">${cantidadItemsHistorial}</span>`;

  borrarRegistro.disabled = cantidadItemsHistorial > 0 ? false : true;

  if (cantidadItemsHistorial > 0) {
    /*------------------- Simula conexión lenta a Servidor -------------------------*/
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function simulacion() {
      for (const dato of datosHistorial) {
        var serverTime = Math.random() * 800;
        await delay(serverTime);
        if (datosHistorial) {

          dato[0].tipoTransporte === "E" ? banderaTipoTransporte = "danger" : banderaTipoTransporte = "success";

          if (dato[0].tipoDeCarga === "normal") {
            banderaTipoCarga = "success";
          } else if (dato[0].tipoDeCarga === "fragil") {
            banderaTipoCarga = "info";
          } else if (dato[0].tipoDeCarga === "cuidado") {
            banderaTipoCarga = "warning";
          } else {
            banderaTipoCarga = "danger";
          }

          verDatosHistorial.innerHTML += (`<tr>
                                            <th scope="row">${dato[0].id}</th>
                                            <td>${dato[0].nombre}</td>
                                            <td><span class="badge bg-${banderaTipoCarga}">${dato[0].tipoDeCarga}</span></td>
                                            <td>${dato[0].pesoCarga} Kg</td>
                                            <td>${dato[0].trayecto} Km</td>
                                            <td><span class="badge bg-${banderaTipoTransporte}">${dato[0].tipoTransporte}</span></td>
                                            <td>$${dato[0].valorCarga}</td>
                                            <td>${dato[0].fecha}</td>
                                            <td>${dato[0].ciudad}</td>
                                            <td>${dato[0].distancia} Km</td>
                                            <td>${dato[0].fechaActual}</td>
                                            <td><input class="form-check-input" type="checkbox" value="" id="${dato[0].id}"></td>
                                        </tr>`);
        }
      };
    }
    simulacion();
    verHistorial.disabled = true;
    verHistorial.style.opacity = (0.4);
    borrarHistorial.disabled = false;
    borrarHistorial.style.opacity = (1);
  } else {
    verDatosHistorial.innerHTML += (`<tr>
                                        <td scope="col" colspan="11" class="text-center"><i class="fa fa-info-circle" aria-hidden="true"></i> No existen datos que mostrar en esta tabla</td> 
                                     </tr>`);
    borrarHistorial.disabled = true;
    borrarHistorial.style.opacity = (0.4);
    verHistorial.disabled = true;
    verHistorial.style.opacity = (0.4);
  }

};

function confirmDelete(index, variabledato, contador) {
  arrayIndex.push(index);
  return (index, variabledato, contador);
}

borrarHistorial.addEventListener('click', () => {

  Swal.fire({
    title: 'Está seguro de eliminar el localStorage?',
    text: "Este paso no se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      borrarHistorial.disabled = true;
      borrarHistorial.style.opacity = (0.4);
      borrarRegistro.disabled = true;
      borrarRegistro.style.opacity = (0.4);
      verHistorial.disabled = false;
      verHistorial.style.opacity = (1);

      Swal.fire(
        'Eliminado!',
        'El localStorage fue eliminado completamente.',
        'success'
      )
    }
  });
});

borrarRegistro.addEventListener('click', () => {
  let contador = 0;
  alertas.innerHTML = "";
  var datosHistorial = JSON.parse(localStorage.getItem('Historial'));
  arrayIndex = [];
  for (const dato of datosHistorial) {

    if (document.getElementById(dato[0].id).checked) {

      var index = datosHistorial.findIndex(id => id === dato);
      var variabledato = dato[0].id;

      if (index !== -1) {
        confirmDelete(index, variabledato, contador);
      }
      contador++
    }
  }

  if (contador === 0) {  /* Si no hay ningún checkBox seleccionado */
    alertas.innerHTML = "";

    Toastify({
      text: "Debe seleccionar una key para eliminar desde Acción!",
      duration: 2200,
      destination: "#",
      // newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #FF203d, #96733d)",
      },
      offset: {
        x: 10, // horizontal axis
        y: 50, // vertical axis
      },
      // onClick: function(){} // Callback after click
    }).showToast();

  } else if (contador === 1) {  /* Si solo hay un solo checkBox seleccionado */

    Swal.fire({
      title: 'Está seguro de eliminar el Registro id: ' + variabledato + ' ?',
      text: "Este paso no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        datosHistorial.splice(index, 1);
        localStorage.setItem('Historial', JSON.stringify(datosHistorial));  //esta linea elimina el registro del localStorage
        console.log('Registro Eliminado: ' + index);
        let timerInterval
        Swal.fire({
          title: 'El Registro id: ' + variabledato + ', fue eliminado correctamente!',
          icon: 'success',
          timer: 1250,
          timerProgressBar: true,

          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (result) {
            window.location = "./historial.html";
          }
        });
      }
    });

  } else {  /* Cuando hay dos o mas checkBox seleccionados */

    Swal.fire({
      title: 'Está seguro de eliminar los ' + contador + ' Registros seleccionados?',
      text: "Este paso no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        for (let i = arrayIndex.length - 1; i >= 0; i--) {  /*esta linea es fundamental para reorrer el array de atrás para adelante*/
          datosHistorial.splice(arrayIndex[i], 1);
          localStorage.setItem('Historial', JSON.stringify(datosHistorial));  //esta linea elimina el registro del localStorage
        }

        let timerInterval
        Swal.fire({
          title: 'Registros Eliminados correctamente!',
          icon: 'success',
          timer: 1250,
          timerProgressBar: true,

          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (result) {
            window.location = "./historial.html";
          }
        });
      }
    });
  };

});