// Componente OrchestrationExample - Orquestación avanzada de animaciones
import { motion } from 'framer-motion';

function OrchestrationExample() {
    // Variants del contenedor con configuración avanzada
    const containerVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                // delayChildren: retraso antes de animar los hijos
                delayChildren: 0.3,
                // staggerChildren: tiempo entre cada hijo
                staggerChildren: 0.15,
                // Configuración de la transición del contenedor
                duration: 0.5
            }
        }
    };

    // Variants para las tarjetas
    const cardVariants = {
        hidden: {
            y: 50,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",  // Animación tipo resorte
                stiffness: 100,  // Rigidez del resorte
                damping: 12      // Amortiguación
            }
        }
    };

    const cards = [
        { title: '🚀 Tarjeta 1', description: 'Aparezco primero' },
        { title: '⭐ Tarjeta 2', description: 'Aparezco segundo' },
        { title: '🎨 Tarjeta 3', description: 'Aparezco tercero' },
        { title: '💎 Tarjeta 4', description: 'Aparezco cuarto' }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h3>Orquestación de Animaciones</h3>

            {/* Contenedor con orquestación */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    maxWidth: '900px',
                    margin: '20px auto'
                }}
            >
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        // whileHover agrega interactividad
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        }}
                        style={{
                            padding: '20px',
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            textAlign: 'center'
                        }}
                    >
                        <div style={{ fontSize: '40px', marginBottom: '10px' }}>
                            {card.title}
                        </div>
                        <p style={{ margin: 0, color: '#666' }}>
                            {card.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>

            <div style={{
                backgroundColor: '#e3f2fd',
                padding: '15px',
                borderRadius: '8px',
                maxWidth: '600px',
                margin: '20px auto'
            }}>
                <p><strong>Orquestación:</strong></p>
                <p style={{ fontSize: '14px', margin: '10px 0' }}>
                    • <strong>delayChildren:</strong> Espera antes de animar hijos (0.3s)<br />
                    • <strong>staggerChildren:</strong> Delay entre cada hijo (0.15s)<br />
                    • <strong>type spring:</strong> Animación con efecto rebote<br />
                    • <strong>whileHover:</strong> Interacción al pasar el mouse
                </p>
            </div>
        </div>
    );
}

export default OrchestrationExample;
