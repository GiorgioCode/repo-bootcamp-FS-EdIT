// Componente de Navegación
import { Link, useLocation } from 'react-router-dom'; // useLocation detecta la ruta actual, Link navega sin recargar
import { motion } from 'framer-motion'; // Importa motion para agregar animaciones a los elementos

function Navegacion() {
    const location = useLocation(); // Hook para obtener la ubicación/ruta actual

    const links = [ // Array con la configuración de cada enlace del menú (reorganizado)
        { path: '/', label: 'Inicio', icon: '🏠' }, // Página principal
        { path: '/animaciones', label: 'Animaciones', icon: '🎨' }, // Animaciones básicas
        { path: '/variants', label: 'Variants', icon: '🎭' }, // Sistema de variants
        { path: '/gestos', label: 'Gestos', icon: '👆' }, // Interacciones con gestos
        { path: '/scroll', label: 'Scroll', icon: '📜' }, // Animaciones de scroll
        { path: '/layout', label: 'Layout', icon: '🚀' } // Layout y avanzado
    ];

    return (
        <nav style={{ // Contenedor principal de navegación
            backgroundColor: '#2c3e50', // Color de fondo oscuro
            padding: '15px 0', // Espaciado vertical
            position: 'sticky', // Permanece fijo al hacer scroll
            top: 0, // Se pega en la parte superior
            zIndex: 100, // Asegura que esté por encima de otros elementos
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)' // Sombra sutil para profundidad
        }}>
            <div style={{ // Contenedor con ancho máximo para centrar contenido
                maxWidth: '1200px', // Ancho máximo responsivo
                margin: '0 auto', // Centra horizontalmente
                padding: '0 20px' // Padding lateral
            }}>
                <div style={{ // Contenedor flex para los enlaces
                    display: 'flex', // Usa flexbox
                    gap: '5px', // Espacio entre elementos
                    flexWrap: 'wrap', // Permite que los items bajen de línea en pantallas pequeñas
                    justifyContent: 'center', // Centra los elementos
                    alignItems: 'center' // Alinea verticalmente al centro
                }}>
                    {links.map((link) => { // Itera sobre cada enlace del array
                        const isActive = location.pathname === link.path; // Verifica si es la ruta actual

                        return (
                            <Link // Componente Link de react-router-dom
                                key={link.path} // Key única para el elemento
                                to={link.path} // Ruta de destino
                                style={{ textDecoration: 'none' }} // Elimina el subrayado del enlace
                            >
                                <motion.div // Div animado con Framer Motion
                                    whileHover={{ scale: 1.05 }} // Aumenta tamaño 5% al pasar el mouse
                                    whileTap={{ scale: 0.95 }} // Reduce tamaño 5% al hacer click
                                    style={{
                                        padding: '10px 15px', // Espaciado interno
                                        borderRadius: '5px', // Bordes redondeados
                                        backgroundColor: isActive ? '#3498db' : 'transparent', // Azul si está activo, transparente si no
                                        color: 'white', // Texto blanco
                                        fontWeight: isActive ? 'bold' : 'normal', // Negrita si está activo
                                        cursor: 'pointer', // Cursor de mano al pasar sobre el elemento
                                        display: 'flex', // Flexbox para icono y texto
                                        alignItems: 'center', // Centra verticalmente icono y texto
                                        gap: '5px', // Espacio entre icono y texto
                                        transition: 'background-color 0.3s' // Transición suave del color de fondo
                                    }}
                                >
                                    <span>{link.icon}</span> {/* Icono emoji */}
                                    <span style={{ fontSize: '14px' }}>{link.label}</span> {/* Texto del enlace */}
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}

export default Navegacion; // Exporta el componente
