/**
 * crear codigo que reciba un arreglo de strings
 * y genere un nuevo arreglo que contenga aquellas palabras
 * que tengan solamente 3 letras
 */

let arrayPrueba = ["auto", "gato", "oso", "aro", "cebolla"];
let filtro = (arreglo, letras) => {
    const arregloFiltrado = [];
    for (palabra of arreglo) {
        if (palabra.length === letras) {
            arregloFiltrado.push(palabra);
        }
    }
    return arregloFiltrado;
};
let nuevoArray = filtro(arrayPrueba, 3);
console.log(nuevoArray);
