const formulario = document.getElementById("formulario");
const textNota = document.getElementById("textoNota");
const contenedorNotas = document.getElementById("contenedorNotas");

let notas = JSON.parse(localStorage.getItem("notas")) || [];
console.log(notas);

function colorAleatorio() {
    const colores = [
        "#fffa65",
        "#ff9ff3",
        "#7efff5",
        "#feca58",
        "#ff6b6b",
        "#48dbfb",
    ];
    return colores[Math.floor(Math.random() * colores.length)];
}

function guardarNotas() {
    localStorage.setItem("notas", JSON.stringify(notas));
}

function renderizarNotas() {
    contenedorNotas.innerHTML = "";
    notas.forEach((nota, indice) => {
        const div = document.createElement("div");
        div.classList.add("nota");
        div.style.backgroundColor = nota.color;
        div.textContent = nota.texto;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.classList.add("btnEliminar");
        btnEliminar.addEventListener("click", () => {
            notas.splice(indice, 1);
            guardarNotas();
            renderizarNotas();
        });
        div.appendChild(btnEliminar);
        contenedorNotas.appendChild(div);
    });
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = textNota.value.trim();
    if (texto) {
        notas.push({ texto, color: colorAleatorio() });
    }
    guardarNotas();
    renderizarNotas();
    textoNota.value = "";
});
renderizarNotas();
