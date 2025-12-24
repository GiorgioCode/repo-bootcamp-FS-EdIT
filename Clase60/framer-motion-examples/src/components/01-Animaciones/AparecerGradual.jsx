// Componente FadeIn - Ejemplo de animación de aparición gradual
import { motion } from 'framer-motion'; // Importa motion para crear componentes animados

function FadeIn() {
    return (
        <div style={{ padding: '20px' }}> {/* Contenedor con espaciado */}
            <h3>Fade In - Aparecer Gradualmente</h3> {/* Título de la sección */}

            <motion.div // Primer ejemplo: fade in básico
                // Estado inicial: completamente invisible
                initial={{ opacity: 0 }} // opacity: 0 significa transparente/invisible
                // Estado final: completamente visible
                animate={{ opacity: 1 }} // opacity: 1 significa opaco/visible
                // Cuánto tarda la transición (en segundos)
                transition={{ duration: 1 }} // Tarda 1 segundo en completar la animación
                style={{ // Estilos del contenedor
                    padding: '30px', // Espaciado interno
                    backgroundColor: '#4CAF50', // Color verde
                    color: 'white', // Texto blanco
                    borderRadius: '8px', // Bordes redondeados
                    marginTop: '20px' // Margen superior
                }}
            >
                <p>¡Aparezco gradualmente cuando el componente se monta!</p> {/* Texto descriptivo */}
                <p>Duración: 1 segundo</p> {/* Información de la duración */}
            </motion.div>

            {/* Ejemplo con delay (retraso) */}
            <motion.div // Segundo ejemplo: fade in con delay
                initial={{ opacity: 0 }} // Inicia invisible
                animate={{ opacity: 1 }} // Termina visible
                transition={{ // Configuración de transición más compleja
                    duration: 0.8, // Duración de 0.8 segundos
                    delay: 0.5  // Espera 0.5 segundos antes de comenzar la animación
                }}
                style={{ // Estilos del segundo contenedor
                    padding: '30px', // Espaciado interno
                    backgroundColor: '#2196F3', // Color azul
                    color: 'white', // Texto blanco
                    borderRadius: '8px', // Bordes redondeados
                    marginTop: '10px' // Margen superior más pequeño
                }}
            >
                <p>¡Aparezco con un retraso de 0.5 segundos!</p> {/* Texto descriptivo del delay */}
            </motion.div>
        </div>
    );
}

export default FadeIn; // Exporta el componente
