const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

let cont = 0;
let totalEnProductos = 0;
let costoTotal = 0;

let datos = new Array(); //[];

function validarCantidad(){
    if(txtNumber.value.length==0){
        return false;
    } // Tenga información

    if(isNaN(txtNumber.value)){
        return false;
    } // Tiene que ser un número

    if (Number(txtNumber.value)<=0){
        return false;
    }// Mayor que 0

    return true;
}

    function getPrecio(){
    return Math.round(Math.random() * 10000) /100;
    } // getPrecio


// Botón agregar click
btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    let isValid = true;
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtName.style.border="";
    txtNumber.style.border="";
    // Name
    // Validar que tenga información mínimo 3 letras
    if(txtName.value.length<3){
        txtName.style.border="medium red solid";
    // mensaje de error
        alertValidacionesTexto.innerHTML="<strong>El nombre del producto no es correcto</strong>";
        alertValidaciones.style.display="block";
        isValid =false;
    }// <3

if(! validarCantidad()){
    txtNumber.style.border="medium red solid";
    alertValidacionesTexto.innerHTML+="<strong>La cantidad no es correcta</strong>";
    alertValidaciones.style.display="block";
    isValid=false;
} // ! Validar cantidad

if (isValid){
   cont++;
   let precio = getPrecio();
   let row=`<tr>
                <td>${cont}</td>
                <td>${txtName.value}</td>
                <td>${txtNumber.value}</td>
                <td>${precio}</td>
            </tr>
   `;
   let elemento = {
    "cont" : cont,
    "nombre" : txtName.value,
    "cantidad" : txtNumber.value,
    "precio" : precio,
   };

   datos.push(elemento);
   localStorage.setItem("datos", JSON.stringify(datos));

    cuerpoTabla.insertAdjacentHTML("beforeend", row);
    contadorProductos.innerText=cont;
    totalEnProductos += Number(txtNumber.value);
    productosTotal.innerText = totalEnProductos;
    costoTotal += precio * Number(txtNumber.value);
    //costoTotal.toFixed(2); forma fácil de quitar los 0, pero no pone "," para separar miles
    precioTotal.innerText = new Intl.NumberFormat("es-MX", 
                    { style: "currency", currency: "MXN" }).format(costoTotal);
    
    let resumen = {
        "cont" : cont,
        "totalEnProductos" : totalEnProductos,
        "costoTotal" : costoTotal,
    };

    localStorage.setItem("resumen", JSON.stringify(resumen) );

    txtName.value ="";
    txtNumber.value ="";
    txtName.focus();
}//isValid


});//btnAgregar click

