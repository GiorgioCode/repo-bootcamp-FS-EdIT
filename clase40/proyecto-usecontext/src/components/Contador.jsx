// src/components/Contador.jsx

// 1. Importamos useContext para consumir contextos
import { useContext } from "react";
// 2. Importamos el contexto que usa useReducer
import { ContadorContext } from "../context/ContadorContext";

function Contador() {
  // 3. Consumimos el contexto usando useContext
  // Obtenemos: state (objeto con el contador) y dispatch (función para enviar acciones)
  const { state, dispatch } = useContext(ContadorContext);
  
  // 4. Este componente se re-renderiza automáticamente cuando el contexto cambia
  // No necesitamos useState local - todo viene del contexto global
  
  return (
    <div style={{ 
      padding: "1rem",
      border: "1px solid blue"
    }}>
      {/* Título descriptivo */}
      <h3>🔵 Contador Avanzado con useContext + useReducer</h3>
      <p>Ejemplo avanzado: useReducer con acciones y dispatch</p>
      
      {/* 5. Mostramos el contador desde state.contador (no directamente contador) */}
      <div 
        className="contador-numero"
        style={{ 
          fontSize: "2rem", 
          margin: "1rem 0", 
          fontWeight: "bold"
        }}
      >
        {state.contador}
      </div>
      
      {/* 6. Los botones envían acciones via dispatch en lugar de llamar funciones directas */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {/* 7. dispatch envía un objeto "action" con un type */}
        <button 
          onClick={() => dispatch({ type: "incrementar" })} // Envía acción al reducer
          style={{
            backgroundColor: "blue",
            color: "white",
            border: "none",
            padding: "0.5rem",
            cursor: "pointer"
          }}
        >
          + Incrementar
        </button>
        
        <button 
          onClick={() => dispatch({ type: "decrementar" })} // Otra acción al reducer
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "0.5rem",
            cursor: "pointer"
          }}
        >
          - Decrementar
        </button>
        
        <button 
          onClick={() => dispatch({ type: "resetear" })} // Tercera acción al reducer
          style={{
            backgroundColor: "gray",
            color: "white",
            border: "none",
            padding: "0.5rem",
            cursor: "pointer"
          }}
        >
          🔄 Reset
        </button>
      </div>
      
      {/* Información educativa sobre el patrón */}
      <div style={{
        marginTop: "1rem",
        padding: "0.5rem",
        border: "1px solid lightblue"
      }}>
        <p>
          💡 useContext + useReducer: Ideal para estado complejo
        </p>
      </div>
      
      {/* Debug info para aprendizaje */}
      <div style={{
        marginTop: "0.5rem",
        padding: "0.5rem",
        border: "1px solid #ddd",
        fontSize: "0.8rem"
      }}>
        🔍 Debug: {JSON.stringify(state)}
      </div>
    </div>
  );
}

/*
DIFERENCIAS CLAVE CON EL EJEMPLO SIMPLE:

Contador Simple (useState):
- const { contador, incrementar } = useContext(Context)
- onClick={incrementar} // Llamada directa

Contador Avanzado (useReducer):  
- const { state, dispatch } = useContext(Context)
- onClick={() => dispatch({type: "incrementar"})} // Envía acción

VENTAJAS del patrón useReducer:
1. Acciones explícitas y trazables
2. Lógica centralizada en el reducer
3. Fácil agregar nuevas acciones sin tocar componentes
4. Mejor para debugging (cada acción es rastreable)
5. Escalable para estado complejo

CUÁNDO USAR useReducer + useContext:
- Estado con múltiples campos relacionados
- Lógica de actualización compleja
- Necesitas historial de acciones
- Múltiples componentes modifican el mismo estado
- Quieres un patrón similar a Redux pero más simple
*/

export default Contador;
