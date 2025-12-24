// main.jsx - Punto de entrada de la aplicación
import { StrictMode } from 'react' // Importa StrictMode para activar comprobaciones adicionales en desarrollo
import { createRoot } from 'react-dom/client' // Importa la función para crear el root de React 18
import App from './App.jsx' // Importa el componente principal de la aplicación
import './index.css' // Importa los estilos globales

createRoot(document.getElementById('root')).render( // Crea el root de React en el elemento con id 'root'
  <StrictMode> {/* Envuelve la app en StrictMode para detectar problemas potenciales */}
    <App /> {/* Renderiza el componente principal */}
  </StrictMode>,
)
