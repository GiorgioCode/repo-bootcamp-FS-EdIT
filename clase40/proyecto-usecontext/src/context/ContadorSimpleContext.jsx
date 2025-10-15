// src/context/ContadorSimpleContext.jsx

// 1. Importamos las funciones necesarias de React
import { createContext, useState } from "react";

// 2. Creamos el Context - será el "almacén" de nuestro estado global
// Este context podrá ser consumido por cualquier componente descendiente
export const ContadorSimpleContext = createContext();

// 3. Creamos el Provider - componente que "provee" el estado a sus hijos
export function ContadorSimpleProvider({ children }) {
  // 4. Estado local usando useState - esto es lo que compartiremos
  const [contador, setContador] = useState(0);
  
  // 5. Funciones para modificar el estado
  // Estas funciones también se compartirán a través del context
  const incrementar = () => {
    setContador(contador + 1);
  };
  
  const decrementar = () => {
    setContador(contador - 1);
  };
  
  const resetear = () => {
    setContador(0);
  };
  
  // 6. Objeto con todo lo que queremos compartir
  // Este será el "value" que recibirán los componentes que consuman el context
  const valorContext = {
    contador,        // El valor actual del contador
    incrementar,     // Función para incrementar
    decrementar,     // Función para decrementar  
    resetear         // Función para resetear
  };
  
  // 7. Retornamos el Provider con el valor y envolvemos a los children
  // Cualquier componente dentro de este Provider podrá acceder al valorContext
  return (
    <ContadorSimpleContext.Provider value={valorContext}>
      {children}
    </ContadorSimpleContext.Provider>
  );
}

/*
EXPLICACIÓN PASO A PASO:

1. createContext() crea un nuevo contexto de React
2. El Provider es un componente que "envuelve" a otros componentes
3. Todo componente dentro del Provider puede acceder al "value"
4. useState mantiene el estado local del contador
5. Las funciones permiten modificar ese estado
6. El "value" del Provider contiene tanto el estado como las funciones
7. Los "children" son todos los componentes que estén dentro del Provider

FLUJO DE DATOS:
Provider (tiene el estado) → Consumer (usa el estado) → Provider (modifica estado)
*/
