// Componente ScaleBox - Ejemplo de animación de escala (zoom)
import { motion } from 'framer-motion'; // Importa motion para crear animaciones

function ScaleBox() {
    return (
        <div style={{ padding: '20px' }}> {/* Contenedor con espaciado */}
            <h3>Scale - Escalar/Zoom</h3> {/* Título de la sección */}

            {/* Escala desde 0 (invisible) hasta 1 (tamaño normal) */}
            <motion.div // Primera caja: escala simple con easeOut
                // Comienza con tamaño 0 (punto)
                initial={{ scale: 0 }} // scale: 0 = reducido al mínimo (invisible)
                // Crece hasta tamaño normal
                animate={{ scale: 1 }} // scale: 1 = tamaño original (100%)
                transition={{ // Configuración de la transición
                    duration: 0.5, // Tarda medio segundo
                    // Tipos de easing: "linear", "easeIn", "easeOut", "easeInOut"
                    ease: "easeOut" // Comienza rápido y desacelera al final
                }}
                style={{ // Estilos de la caja
                    width: '150px', // Ancho fijo
                    height: '150px', // Alto fijo (cuadrado)
                    backgroundColor: '#FF5722', // Color rojo-naranja
                    color: 'white', // Texto blanco
                    borderRadius: '10px', // Bordes redondeados
                    display: 'flex', // Usa flexbox para centrar contenido
                    alignItems: 'center', // Centra verticalmente
                    justifyContent: 'center', // Centra horizontalmente
                    margin: '20px auto', // Margen y centrado horizontal
                    textAlign: 'center', // Texto centrado
                    padding: '10px' // Espaciado interno
                }}
            >
                Escalo desde 0
            </motion.div>

            {/* Escala con efecto de rebote (spring) */}
            <motion.div // Segunda caja: efecto spring (resorte)
                initial={{ scale: 0 }} // Inicia desde tamaño 0
                animate={{ scale: 1 }} // Termina en tamaño normal
                transition={{ // Configuración de física de resorte
                    // Type "spring" crea un efecto de rebote
                    type: "spring", // Usa física de resorte en lugar de duración fija
                    stiffness: 200,  // Rigidez del resorte (más alto = más rígido, menos oscilación)
                    damping: 10      // Amortiguación (más bajo = más rebote, más oscilación)
                }}
                style={{ // Estilos de la segunda caja
                    width: '150px', // Ancho fijo
                    height: '150px', // Alto fijo
                    backgroundColor: '#9C27B0', // Color púrpura
                    color: 'white', // Texto blanco
                    borderRadius: '10px', // Bordes redondeados
                    display: 'flex', // Flexbox
                    alignItems: 'center', // Centra verticalmente
                    justifyContent: 'center', // Centra horizontalmente
                    margin: '20px auto', // Margen y centrado
                    textAlign: 'center', // Texto centrado
                    padding: '10px' // Espaciado interno
                }}
            >
                Reboto como un resorte
            </motion.div>

            {/* Escala combinada con rotación */}
            <motion.div // Tercera caja: combina escala y rotación
                initial={{ scale: 0, rotate: -180 }} // Inicia pequeño y rotado 180° en sentido antihorario
                animate={{ scale: 1, rotate: 0 }} // Termina en tamaño normal y sin rotación
                transition={{ duration: 0.8 }} // Duración de 0.8 segundos para ambas animaciones
                style={{ // Estilos de la tercera caja
                    width: '150px', // Ancho fijo
                    height: '150px', // Alto fijo
                    backgroundColor: '#FF9800', // Color naranja
                    color: 'white', // Texto blanco
                    borderRadius: '10px', // Bordes redondeados
                    display: 'flex', // Flexbox
                    alignItems: 'center', // Centra verticalmente
                    justifyContent: 'center', // Centra horizontalmente
                    margin: '20px auto', // Margen y centrado
                    textAlign: 'center', // Texto centrado
                    padding: '10px' // Espaciado interno
                }}
            >
                Escalo y roto
            </motion.div>
        </div>
    );
}

export default ScaleBox; // Exporta el componente
