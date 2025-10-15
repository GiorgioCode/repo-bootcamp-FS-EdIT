// src/App.jsx

// 1. Importamos los providers de contexto que hemos creado
import { ContadorProvider } from "./context/ContadorContext"; // useReducer
import { ContadorSimpleProvider } from "./context/ContadorSimpleContext"; // useState

// 2. Importamos los componentes que consumen los contextos
import Contador from "./components/Contador"; // Consume ContadorContext (useReducer)
import ContadorSimple from "./components/ContadorSimple"; // Consume ContadorSimpleContext (useState)

import "./App.css";

function App() {
    return (
        // 3. Estructura de providers anidados - cada provider envuelve a sus consumidores
        <ContadorSimpleProvider>
            {/* El ContadorSimpleProvider hace disponible el contexto simple */}

            <ContadorProvider>
                {/* El ContadorProvider hace disponible el contexto con useReducer */}

                <div style={{ padding: "1rem" }}>
                    {/* Header principal */}
                    <header
                        style={{ textAlign: "center", marginBottom: "2rem" }}
                    >
                        <h1>⚛️ Ejemplos de useContext en React</h1>
                        <p>
                            Comparación entre useState vs useReducer dentro de
                            Context
                        </p>
                    </header>

                    {/* Contenedor principal para los ejemplos */}
                    <main>
                        {/* Grid responsivo para mostrar ambos ejemplos lado a lado */}
                        <div
                            style={{
                                display: "flex",
                                gap: "1rem",
                                flexWrap: "wrap",
                            }}
                        >
                            {/* 4. Ejemplo 1: Context + useState (más simple) */}
                            <ContadorSimple />

                            {/* 5. Ejemplo 2: Context + useReducer (más estructurado) */}
                            <Contador />
                        </div>
                    </main>
                </div>
            </ContadorProvider>
        </ContadorSimpleProvider>
    );
}

/*
EXPLICACIÓN DE LA ESTRUCTURA DE PROVIDERS:

1. ContadorSimpleProvider (exterior):
   - Envuelve toda la app
   - Hace disponible el contexto simple (useState)
   - ContadorSimple puede acceder a este contexto

2. ContadorProvider (interior):  
   - Envuelve el contenido interno
   - Hace disponible el contexto complejo (useReducer)
   - Contador puede acceder a este contexto

3. Ambos componentes pueden renderizarse juntos porque:
   - Cada uno consume SU propio contexto
   - No hay conflictos entre contextos
   - Los contextos son independientes

VENTAJAS DE MÚLTIPLES CONTEXTOS:
- Separación de responsabilidades
- Cada componente usa solo lo que necesita  
- Fácil de testear por separado
- No hay re-renders innecesarios
- Escalable: puedes agregar más contextos

ALTERNATIVA: Un solo contexto grande
- Más simple inicialmente
- Pero menos flexible a largo plazo
- Más difícil de mantener
- Más re-renders innecesarios
*/

export default App;
