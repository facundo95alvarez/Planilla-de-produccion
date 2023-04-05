
let count = 1;

document.getElementById("ingresar").addEventListener("click", agregarDatos);

function agregarDatos() {
    let inputValue = document.getElementById("Agregar");
    

    if (inputValue.value !== '') {
        let arrayString = inputValue.value.split("\n");

        for (let i = 0; i < arrayString.length; i++) {
            let inputString = arrayString[i].split("\t");

            switch(inputString[0]){
                case '91DK32X7000' : {
                    insertarFilaVacia(2);
                    break;
                }
                case 'DK43' : {
                    insertarFilaVacia(10);
                    break;
                }
            }

            const filas = document.getElementById("filas");
            filas.innerHTML += `<tr>
                <td>${count}</td>
                <td>${inputString[0] || ''}</td>
                <td>${inputString[1] || ''}</td>
                <td>${inputString[2] || ''}</td>
                <td>${inputString[3] || ''}</td>
                <td>${inputString[4] || ''}</td>
                <td>${inputString[5] || ''}</td>
                <td>${inputString[6] || ''}</td>
                <td>${inputString[7] || ''}</td>
                <td>${inputString[8] || ''}</td>
                <td>${inputString[9] || ''}</td>
                <td>${inputString[10] || ''}</td>
                <td>${inputString[11] || ''}</td>
                <td>${inputString[12] || ''}</td>
                <th><button onclick="makeEditable(this)">Editar</button></th>
                <th><button id="eliminar" onclick="eliminarFila(${i})">Eliminar</button></th>
             
          </tr>
      `;
            
            count = count + 1;
         

          const datos = {
            "Plan_Real": inputString[0],
            "Modelo": inputString[1],
            "Lote": inputString[2],
            "Cant": inputString[3],
            "PO": inputString[4],
            "IA": inputString[5],
            "CHASIS": inputString[6],
            "ALTERNO": inputString[7],
            "SEMIELABORADO": inputString[8],
            "OP": inputString[9],
            "ESTADO": inputString[10],
            "VERSION": inputString[11],
            "MONTAJE": inputString[12] 
          };

          const a =JSON.stringify({
            datos
          });
          console.log(a);
         
          fetch("http://localhost:8000/api/cargardata", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          
            //make sure to serialize your JSON body
            body: JSON.stringify({
              datos
            })
              

          })
          .then( (response) => { 
             //do something awesome that makes the world a better placec
             console.log(datos); 
          });
         

        }
    }

    inputValue.value = '';
    
}

function insertarFilaVacia(cantidad){
        const filas = document.getElementById("filas");
        for (let index = 0; index <= cantidad - 1; index++) {
            filas.innerHTML += `<tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>`;
    
 
                            }


}                        



  

   


  fetch('http://localhost:8000/api/obtenerPlanes') 
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      let table = document.getElementById("tabla");
      let row ;
      for (let i = 0; i < data.data.length; i++) {
        row = document.createElement("tr");
         row.innerHTML = `
         <td>${data.data[i]['id']}</td>
         <td>${data.data[i]['Plan_Real'] || ''}</td>
         <td>${data.data[i]['Modelo'] || ''}</td>
         <td>${data.data[i]['Lote'] || ''}</td>
         <td>${data.data[i]['Cant'] || ''}</td>
         <td>${data.data[i]['PO'] || ''}</td>
         <td>${data.data[i]['IA'] || ''}</td>
         <td>${data.data[i]['CHASIS'] || ''}</td>
         <td>${data.data[i]['ALTENO'] || ''}</td>
         <td>${data.data[i]['SEMIELABORADO'] || ''}</td>
         <td>${data.data[i]['OP'] || ''}</td>
         <td>${data.data[i]['ESTADO'] || ''}</td>
         <td>${data.data[i]['VERSION'] || ''}</td>
         <td>${data.data[i]['MONTAJE'] || ''}</td>
         <td><button onclick="makeEditable(this)">Editar</button></td>
         <td><button id="eliminar"onclick="eliminarFila(${data.data[i]['id']})">Eliminar</button></td>
       `;
       table.appendChild(row);
     }
   } else {
     console.error('Error:', data.data);
   }
 })
 .catch(error => console.error('Error:', error));



  function makeEditable(button) {
    var row = button.parentNode.parentNode; 
    var cells = row.getElementsByTagName('td'); 
    for (var i = 0; i < cells.length - 1; i++) { 
      cells[i].setAttribute('contenteditable', 'true'); 
    }
  }


  // function saveChanges(button) {
  //   var row = button.parentNode.parentNode; 
  //   var cells = row.getElementsByTagName('td'); 
  //   for (var i = 0; i < cells.length - 1; i++) { 
  //     cells[i].setAttribute('contenteditable', 'false');
  //   }
  // }


  function eliminarFila(id){
    fetch(`http://localhost:8000/api/plandeproduccion/deleat/${id}`,
    {
      method: 'DELETE',
    })
    .then(res => res.text()) // or res.json()
    .then(res => {

      fetch('http://localhost:8000/api/obtenerPlanes') 
      .then(response => response.json())
      .then(res => {
        location.reload(); 
      })
    
     .catch(error => console.error('Error:', error));

    })
  }
  
 
