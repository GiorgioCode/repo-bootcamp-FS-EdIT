// App.jsx - Componente principal con routing (reorganizado en 6 páginas)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa componentes para manejar rutas
import Navegacion from './components/Navegacion'; // Importa el componente de navegación (renombrado)
import HomePage from './pages/HomePage'; // Importa la página de inicio
import AnimacionesPage from './pages/AnimacionesPage'; // Importa la página de animaciones básicas
import VariantsPage from './pages/VariantsPage'; // Importa la página de variants
import GestosPage from './pages/GestosPage'; // Importa la página de gestos
import ScrollPage from './pages/ScrollPage'; // Importa la página de scroll
import LayoutPage from './pages/LayoutPage'; // Importa la página de layout y avanzado
import './App.css'; // Importa los estilos del componente

function App() {
  return (
    <Router> {/* Envuelve la app en Router para habilitar navegación */}
      {/* Navegación fija */}
      <Navegacion /> {/* Barra de navegación sticky */}

      {/* Contenido de las páginas */}
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}> {/* Contenedor principal con altura mínima de viewport */}
        <Routes> {/* Define todas las rutas de la aplicación (6 páginas) */}
          <Route path="/" element={<HomePage />} /> {/* Ruta raíz - página de inicio */}
          <Route path="/animaciones" element={<AnimacionesPage />} /> {/* Ruta para animaciones básicas */}
          <Route path="/variants" element={<VariantsPage />} /> {/* Ruta para variants */}
          <Route path="/gestos" element={<GestosPage />} /> {/* Ruta para gestos */}
          <Route path="/scroll" element={<ScrollPage />} /> {/* Ruta para scroll */}
          <Route path="/layout" element={<LayoutPage />} /> {/* Ruta para layout y avanzado */}
        </Routes>
      </div>

      {/* Footer */}
      <footer style={{ // Pie de página con información del proyecto
        backgroundColor: '#2c3e50', // Color de fondo oscuro
        color: 'white', // Texto blanco
        textAlign: 'center', // Centra el texto
        padding: '30px 20px', // Espaciado interno
        marginTop: '60px' // Separación del contenido superior
      }}>
        <p style={{ margin: 0, fontSize: '16px' }}> {/* Título del footer sin margen */}
          Ejemplos de Framer Motion - Proyecto Educativo
        </p>
        <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#95a5a6' }}> {/* Subtítulo con color más claro */}
          Cada ejemplo incluye código con comentarios explicativos
        </p>
      </footer>
    </Router>
  );
}

export default App; // Exporta el componente para ser usado en main.jsx
