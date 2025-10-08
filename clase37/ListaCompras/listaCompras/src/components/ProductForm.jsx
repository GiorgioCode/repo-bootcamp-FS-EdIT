// Formulario controlado que recibe `onAdd` por props y envía { nombre, cantidad }
import React, { useState } from "react"; // importa React y useState

export default function ProductForm({ onAdd }) {
    // componente que recibe onAdd como prop
    const [nombre, setNombre] = useState(""); // estado para el campo nombre (string)
    const [cantidad, setCantidad] = useState("1"); // estado para la cantidad (string para el input)

    // handleAdd valida y transforma los valores antes de llamar a onAdd
    function handleAdd() {
        const n = nombre.trim(); // elimina espacios al inicio/fin
        const c = parseInt(cantidad, 10); // convierte la cantidad a número entero base 10
        if (!n) return; // si no hay nombre válido, no hace nada
        if (Number.isNaN(c) || c < 1) return; // cantidad mínima 1, si inválida no hace nada

        // llama al callback del padre pasándole el objeto con nombre y cantidad
        onAdd({ nombre: n, cantidad: c });

        // limpia los inputs tras agregar
        setNombre("");
        setCantidad("1");
    }

    // Render del formulario: inputs controlados y botón
    return (
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {/* Input para el nombre del producto: value viene del estado `nombre` */}
            <input
                placeholder="Producto"
                value={nombre} // value controlado por el estado
                onChange={(e) => setNombre(e.target.value)} // actualiza el estado al escribir
            />

            {/* Input para la cantidad inicial: value es string para controlar el input */}
            <input
                type="number" //campo tipo numerico
                placeholder="Cantidad"
                value={cantidad} // value controlado por el estado
                onChange={(e) => setCantidad(e.target.value)} // actualiza la cantidad (string)
                style={{ width: 80 }}
            />

            {/* Botón que ejecuta handleAdd al click */}
            <button onClick={handleAdd}>Agregar</button>
        </div>
    );
}
