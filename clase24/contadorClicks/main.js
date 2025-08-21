let contador = localStorage.getItem("contador") || 0;
contador = +contador;

const contadorElemento = document.getElementById("contador");
const btnSumar = document.getElementById("sumar");
const btnSumar10 = document.getElementById("sumar10");
const btnRestar = document.getElementById("restar");
const btnReset = document.getElementById("reset");

function actualizarContador() {
    contadorElemento.textContent = contador;
    localStorage.setItem("contador", contador);
}

btnSumar.addEventListener("click", () => {
    contador++;
    actualizarContador();
});

btnReset.addEventListener("click", () => {
    contador = 0;
    actualizarContador();
});

btnRestar.addEventListener("click", () => {
    contador--;
    actualizarContador();
});
btnSumar10.addEventListener("click", () => {
    contador += 10;
    actualizarContador();
});

actualizarContador();
