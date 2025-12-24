// Componente SVGAnimation - Animación de SVG paths
import { motion } from 'framer-motion';

function SVGAnimation() {
    // Variantes para el trazo del SVG
    const draw = {
        hidden: {
            pathLength: 0,  // 0 = nada dibujado
            opacity: 0
        },
        visible: {
            pathLength: 1,  // 1 = completamente dibujado
            opacity: 1,
            transition: {
                pathLength: {
                    duration: 2,
                    ease: "easeInOut"
                },
                opacity: {
                    duration: 0.3
                }
            }
        }
    };

    // Variantes para fill (relleno)
    const fill = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                delay: 2  // Espera a que termine el trazo
            }
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>SVG Animation - Animación de Trazos</h3>

            <div style={{
                backgroundColor: '#e3f2fd',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '30px'
            }}>
                <p><strong>pathLength:</strong></p>
                <p style={{ fontSize: '14px' }}>
                    La propiedad <code>pathLength</code> anima el dibujo de un trazo
                    SVG desde 0 (no dibujado) hasta 1 (completamente dibujado).
                </p>
            </div>

            {/* Círculo que se dibuja */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h4>Círculo</h4>
                <svg width="200" height="200" viewBox="0 0 100 100">
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#2196F3"
                        strokeWidth="4"
                        fill="transparent"
                        variants={draw}
                        initial="hidden"
                        animate="visible"
                    />
                </svg>
            </div>

            {/* Estrella que se dibuja */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h4>Estrella</h4>
                <svg width="200" height="200" viewBox="0 0 100 100">
                    <motion.path
                        d="M50,10 L61,40 L95,40 L68,60 L79,90 L50,70 L21,90 L32,60 L5,40 L39,40 Z"
                        stroke="#FF9800"
                        strokeWidth="2"
                        fill="transparent"
                        variants={draw}
                        initial="hidden"
                        animate="visible"
                    />
                </svg>
            </div>

            {/* Corazón con trazo y relleno */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h4>Corazón (Trazo + Relleno)</h4>
                <svg width="200" height="200" viewBox="0 0 100 100">
                    {/* Trazo */}
                    <motion.path
                        d="M50,85 C20,60 5,45 5,30 C5,15 15,5 27.5,5 C35,5 42.5,10 50,20 C57.5,10 65,5 72.5,5 C85,5 95,15 95,30 C95,45 80,60 50,85 Z"
                        stroke="#E91E63"
                        strokeWidth="3"
                        fill="transparent"
                        variants={draw}
                        initial="hidden"
                        animate="visible"
                    />
                    {/* Relleno aparece después */}
                    <motion.path
                        d="M50,85 C20,60 5,45 5,30 C5,15 15,5 27.5,5 C35,5 42.5,10 50,20 C57.5,10 65,5 72.5,5 C85,5 95,15 95,30 C95,45 80,60 50,85 Z"
                        fill="#E91E63"
                        variants={fill}
                        initial="hidden"
                        animate="visible"
                    />
                </svg>
            </div>

            {/* Checkmark animado */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h4>Checkmark</h4>
                <svg width="200" height="200" viewBox="0 0 100 100">
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#4CAF50"
                        strokeWidth="4"
                        fill="transparent"
                        variants={draw}
                        initial="hidden"
                        animate="visible"
                    />
                    <motion.path
                        d="M25,50 L40,65 L75,30"
                        stroke="#4CAF50"
                        strokeWidth="6"
                        fill="transparent"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={{
                            hidden: { pathLength: 0 },
                            visible: {
                                pathLength: 1,
                                transition: { duration: 0.5, delay: 2 }
                            }
                        }}
                        initial="hidden"
                        animate="visible"
                    />
                </svg>
            </div>

            <div style={{
                backgroundColor: '#fff3e0',
                padding: '15px',
                borderRadius: '8px'
            }}>
                <p><strong>Propiedades SVG animables:</strong></p>
                <ul style={{ fontSize: '14px' }}>
                    <li><code>pathLength</code> - Longitud del trazo (0-1)</li>
                    <li><code>pathOffset</code> - Offset del inicio del trazo</li>
                    <li><code>pathSpacing</code> - Espacio entre trazos</li>
                    <li><code>opacity</code> - Opacidad del elemento</li>
                    <li><code>fill</code> - Color de relleno</li>
                    <li><code>stroke</code> - Color del trazo</li>
                </ul>
            </div>
        </div>
    );
}

export default SVGAnimation;
