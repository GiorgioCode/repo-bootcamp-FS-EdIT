// src/components/ContadorSimple.jsx

// 1. Importamos useContext para consumir el contexto
import { useContext } from "react";
// 2. Importamos el contexto que creamos
import { ContadorSimpleContext } from "../context/ContadorSimpleContext";

function ContadorSimple() {
  // 3. Usamos useContext para "conectarnos" al contexto
  // Esto nos da acceso a todo lo que está en el "value" del Provider
  const { contador, incrementar, decrementar, resetear } = useContext(ContadorSimpleContext);
  
  // 4. ¡Ya tenemos acceso al estado y las funciones! Sin props drilling
  // El componente se re-renderiza automáticamente cuando el contexto cambia
  
  return (
    <div style={{ 
      padding: "1rem", 
      border: "1px solid green"
    }}>
      {/* Título descriptivo del ejemplo */}
      <h3>🟢 Contador Simple con useContext + useState</h3>
      <p>Ejemplo básico: useState dentro de Context</p>
      
      {/* 5. Mostramos el valor directamente desde el contexto */}
      <div 
        className="contador-numero"
        style={{ 
          fontSize: "2rem", 
          margin: "1rem 0", 
          fontWeight: "bold"
        }}
      >
        {contador}
      </div>
      
      {/* 6. Los botones llaman directamente a las funciones del contexto */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {/* Llamada directa a la función incrementar del contexto */}
        <button 
          onClick={incrementar}
          style={{
            backgroundColor: "green",
            color: "white",
            border: "none",
            padding: "0.5rem",
            cursor: "pointer"
          }}
        >
          + Incrementar
        </button>
        
        <button 
          onClick={decrementar}
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
          onClick={resetear}
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
      
      {/* Información educativa */}
      <div style={{
        marginTop: "1rem",
        padding: "0.5rem",
        border: "1px solid lightgreen"
      }}>
        <p>
          💡 useContext + useState: Perfecto para estado simple
        </p>
      </div>
    </div>
  );
}

/*
VENTAJAS DE ESTE ENFOQUE:
1. Sin props drilling: No necesitas pasar props por múltiples niveles
2. Estado compartido: Múltiples componentes pueden usar el mismo estado
3. Actualización automática: Los componentes se re-renderizan cuando cambia el contexto
4. API simple: Solo useContext() para acceder a todo

CUÁNDO USAR ESTE PATRÓN:
- Estado simple (strings, numbers, booleans, arrays simples)
- Pocos componentes consumiendo el contexto
- Lógica de actualización sencilla
- No necesitas acciones complejas

LIMITACIONES:
- Menos estructura que useReducer
- Puede ser más difícil testear
- No tiene el patrón de "acciones" para debugging
*/

export default ContadorSimple;
