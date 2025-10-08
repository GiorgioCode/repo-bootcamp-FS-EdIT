// Componente de presentación de una fila de producto con botones para +/- y eliminar
import React from "react"; // importa React

// Recibe por props: product (obj), onIncrement(id), onDecrement(id), onDelete(id)
export default function ProductoRow({
    product,
    onIncrement,
    onDecrement,
    onDelete,
}) {
    return (
        <li
            style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
            }}
        >
            <div style={{ flex: 1 }}>{product.nombre}</div>{" "}
            {/* muestra el nombre */}
            <button onClick={() => onDecrement(product.id)}>-</button>{" "}
            {/* decrementa llamando al padre con id */}
            <div style={{ minWidth: 28, textAlign: "center" }}>
                {product.cantidad}
            </div>{" "}
            {/* muestra cantidad */}
            <button onClick={() => onIncrement(product.id)}>+</button>{" "}
            {/* incrementa llamando al padre con id */}
            <button
                onClick={() => onDelete(product.id)}
                style={{ marginLeft: 8 }}
            >
                Eliminar
            </button>{" "}
            {/* elimina por id */}
        </li>
    );
}
