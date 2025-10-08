// Componente padre que mantiene el estado de los productos y pasa callbacks a los hijos
import React, { useState } from "react"; // importa React y useState
import ProductoRow from "./ProductoRow"; // componente fila
import ProductForm from "./ProductForm"; // componente formulario

export default function ListaComprasCantidades() {
    // estado inicial: array de objetos con id único, nombre y cantidad
    const [productos, setProductos] = useState([
        { id: 1, nombre: "Pan", cantidad: 2 },
        { id: 2, nombre: "Leche", cantidad: 1 },
    ]);

    // funcion generadora simple de ids (para demo). En producción usar UUID o DB id.
    function generarId() {
        return Date.now() + Math.floor(Math.random() * 1000); // combina timestamp + aleatorio
    }

    // onAdd: agrega un nuevo producto al estado (recibe { nombre, cantidad } desde ProductForm)
    function onAdd({ nombre, cantidad }) {
        const nuevo = { id: generarId(), nombre, cantidad }; // crea el objeto nuevo
        setProductos((prev) => [...prev, nuevo]); // agrega de forma inmutable al final
    }

    // onIncrement: incrementa la cantidad del producto con el id indicado
    function onIncrement(id) {
        setProductos((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
            )
        );
    }

    // onDecrement: decrementa la cantidad sin bajar de 0
    function onDecrement(id) {
        setProductos((prev) =>
            prev.map((p) =>
                p.id === id
                    ? { ...p, cantidad: Math.max(0, p.cantidad - 1) }
                    : p
            )
        );
    }

    // onDelete: elimina el producto filtrando por id
    function onDelete(id) {
        setProductos((prev) => prev.filter((p) => p.id !== id));
    }

    // totalItems: suma de todas las cantidades (derivada del estado)
    const totalItems = productos.reduce((s, p) => s + p.cantidad, 0);

    // Render: Formulario + lista de ProductoRow + resumen
    return (
        <div style={{ padding: 16, border: "1px solid #ddd", maxWidth: 520 }}>
            <h3>Lista de compras</h3>
            {/* ProductForm pasará los datos al padre mediante la prop onAdd */}
            <ProductForm onAdd={onAdd} />
            <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                {productos.map((p) => (
                    <ProductoRow
                        key={p.id} // key estable basada en id
                        product={p} // pasa el objeto product completo
                        onIncrement={onIncrement} // callback para incrementar
                        onDecrement={onDecrement} // callback para decrementar
                        onDelete={onDelete} // callback para eliminar
                    />
                ))}
            </ul>
            <div style={{ marginTop: 12 }}>
                <strong>Total de ítems:</strong> {totalItems}{" "}
                {/* muestra el total calculado */}
            </div>
            {productos.length === 0 && (
                <div style={{ marginTop: 8 }}>No hay productos</div>
            )}{" "}
            {/* mensaje si está vacío */}
        </div>
    );
}
