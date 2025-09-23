//obtenemos referencias de elementos del DOM

const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const progressBar = document.getElementById("progressBar");
const progress = document.getElementById("progress");

//evento cuando se arrastra un archivo sobre la zona
dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
});
dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
});
//evento cuando se suelta un archivo en la zona
dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    const files = e.dataTransfer.files; //obtiene los archivos soltados
    if (files.length > 0) {
        uploadFile(files[0]); //en caso de que exista archivo y ademas sean mas de uno solo transfiero el primero
    }
});

//evento para permitir seleccion de archivos haciendo click
dropZone.addEventListener("click", () => {
    fileInput.click(); //dispara sobre el fileInput el evento click
});
//evento cuando se selecciona un archivo mediante el dialogo
fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
        uploadFile(fileInput.files[0]); //sube primer archivo seleccionado
    }
});
//funcion para manejar subida de archivos al servidor
function uploadFile(file) {
    //creamos objeto formData para enviar el archivo
    const formData = new FormData();
    formData.append("file", file);

    //Mostrar y resetear la barra de progreso
    progressBar.style.display = "block";
    progress.style.width = "0%";

    //creamos y configuramos la peticion AJAX
    const xhr = new XMLHttpRequest();

    //evento para actualizar la barra de progreso
    xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
            //Calculamos y mostramos el progreso
            const percentComplete = (e.loaded / e.total) * 100;
            progress.style.width = percentComplete + "%";
        }
    });
    //evento cuando la subida se completa
    xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
            alert("archivo subido correctamente");
        } else {
            alert("ha ocurrido un erro, no se ha subido el archivo");
        }
        //Ocultamos la barra de progreso despues de 1 segundo
        setTimeout(() => {
            progressBar.style.display = "none";
            progress.style.width = "0%";
        }, 1000);
    });
    //evento en caso de error de subida
    xhr.addEventListener("error", () => {
        alert("Error al subir el archivo");
        progressBar.style.display = "none";
    });
    //configuramos y enviamos la peticion
    xhr.open("POST", "http://localhost:3000/upload", true);
    xhr.send(formData);
}
