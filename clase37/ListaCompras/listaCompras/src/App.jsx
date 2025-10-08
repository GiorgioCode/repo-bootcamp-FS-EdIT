// Componente raíz que solo monta la pieza principal: ListaComprasCantidades
import React from "react"; // importa React
import ListaComprasCantidades from "./components/ListaComprasCantidades"; // importa el componente principal

export default function App() {
    // exporta el componente App por defecto
    return (
        <div style={{ padding: 24 }}>
            {/* Renderiza el componente principal de la demo */}
            <ListaComprasCantidades />
        </div>
    );
}
