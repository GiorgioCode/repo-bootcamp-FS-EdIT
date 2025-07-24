/*
let nombreUsuario = prompt("Ingrese su nombre");
let edadUsuario = +prompt("Ingrese su edad"); // + sugar syntax para conversion a tipo Number
let decisionUsuario = confirm("Desea participar en el sorteo?");
console.log("nombre del usuario = " + nombreUsuario);
console.log("edadUsuario = " + edadUsuario);
console.log("decisionUsuario = " + decisionUsuario);
alert("Su nombre es " + nombreUsuario + " y tiene " + edadUsuario + " años.");
*/

//CONDICIONAL IF - ELSE
let edad = +prompt("Ingrese su edad");
console.log("Evaluacion IF");

if (edad > 0) {
    if (edad < 16) {
        console.log(
            "Disculpe, pero no cumple con la edad para utilizar el sistema"
        );
    } else if (edad >= 16 && edad < 18) {
        console.log(
            "Usted cumple con las condiciones para VOTAR en la elección"
        );
    } else if (edad >= 18) {
        console.log("Usted ademas de poder VOTAR puede Tomar alcohol.");
    } else {
        console.log("Ha ocurrido un error en el sistema. Intentelo de nuevo.");
    }
} else {
    console.warn("La edad ingresa es invalida");
}
