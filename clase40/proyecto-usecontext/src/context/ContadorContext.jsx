// src/context/ContadorContext.jsx

// 1. Importamos createContext para crear el contexto y useReducer para estado complejo
import { createContext, useReducer } from "react";

// 2. Creamos el Context que compartirá el estado del contador (versión con useReducer)
export const ContadorContext = createContext();

// 3. Definimos el reducer - función que maneja TODAS las actualizaciones de estado
// Recibe: state actual + action (objeto con type y datos opcionales)
// Retorna: nuevo state
function reducer(state, action) {
  // 4. Switch que decide qué hacer según el tipo de acción
  switch (action.type) {
    // Caso incrementar: suma 1 al contador actual
    case "incrementar":
      return { ...state, contador: state.contador + 1 };
    
    // Caso decrementar: resta 1 al contador actual  
    case "decrementar":
      return { ...state, contador: state.contador - 1 };
    
    // Caso resetear: vuelve el contador a 0
    case "resetear":
      return { ...state, contador: 0 };
    
    // Caso default: devuelve el estado sin cambios (importante para seguridad)
    default:
      return state;
  }
}

// 5. Provider que usa useReducer en lugar de useState
export function ContadorProvider({ children }) {
  // 6. useReducer nos da: [state, dispatch]
  // - state: objeto con el estado actual
  // - dispatch: función para enviar acciones al reducer
  const [state, dispatch] = useReducer(reducer, { contador: 0 });
  
  // 7. Compartimos tanto el estado como la función dispatch
  // Los componentes podrán leer el state y enviar acciones via dispatch
  return (
    <ContadorContext.Provider value={{ state, dispatch }}>
      {children}
    </ContadorContext.Provider>
  );
}

/*
DIFERENCIAS CLAVE: useReducer vs useState

useState (simple):
- Bueno para estado simple (string, number, boolean)
- Actualizaciones directas: setState(newValue)
- Menos código para casos simples

useReducer (complejo):
- Mejor para estado complejo (objetos, arrays, lógica compleja)
- Actualizaciones por acciones: dispatch({type: "action"})
- Más predecible y testeable
- Inspirado en Redux
- Mejor para múltiples campos relacionados

CUÁNDO USAR useReducer:
- Estado con múltiples sub-valores
- Lógica de actualización compleja
- Siguiente estado depende del anterior
- Quieres centralizar la lógica de estado
*/
