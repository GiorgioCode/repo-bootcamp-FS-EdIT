// Componente ScrollReveal - Elementos que aparecen al hacer scroll
import { motion } from 'framer-motion';

function ScrollReveal() {
    // Configuración de animación para elementos que aparecen
    const revealVariants = {
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 }
    };

    const items = [
        { id: 1, title: '🚀 Innovación', description: 'Aparezco cuando entras', color: '#FF5722' },
        { id: 2, title: '⚡ Velocidad', description: 'Aparezco cuando entras', color: '#FF9800' },
        { id: 3, title: '💎 Calidad', description: 'Aparezco cuando entras', color: '#FFC107' },
        { id: 4, title: '🎨 Diseño', description: 'Aparezco cuando entras', color: '#4CAF50' },
        { id: 5, title: '🔒 Seguridad', description: 'Aparezco cuando entras', color: '#2196F3' },
        { id: 6, title: '🌟 Experiencia', description: 'Aparezco cuando entras', color: '#9C27B0' }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h3>Scroll Reveal - Aparecer al Hacer Scroll</h3>

            <div style={{
                backgroundColor: '#e3f2fd',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '40px'
            }}>
                <p><strong>whileInView:</strong></p>
                <p style={{ fontSize: '14px' }}>
                    Los elementos se animan automáticamente cuando entran en el viewport
                    (área visible de la pantalla).
                </p>
            </div>

            {/* Grid de elementos que aparecen al scroll */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginTop: '40px'
            }}>
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        // Estado inicial (antes de entrar en vista)
                        initial="hidden"
                        // Anima cuando entra en el viewport
                        whileInView="visible"
                        // Configuración del viewport
                        viewport={{
                            once: true,    // Solo anima una vez
                            amount: 0.3    // 30% del elemento debe ser visible
                        }}
                        variants={revealVariants}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1  // Cada elemento espera un poco más
                        }}
                        style={{
                            padding: '30px',
                            backgroundColor: item.color,
                            color: 'white',
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}
                    >
                        <div style={{ fontSize: '40px', marginBottom: '10px' }}>
                            {item.title}
                        </div>
                        <p style={{ margin: 0 }}>{item.description}</p>
                    </motion.div>
                ))}
            </div>

            {/* Ejemplo con animación desde diferentes direcciones */}
            <div style={{ marginTop: '60px' }}>
                <h4>Desde Diferentes Direcciones</h4>

                {/* Desde la izquierda */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        padding: '20px',
                        backgroundColor: '#3F51B5',
                        color: 'white',
                        borderRadius: '8px',
                        marginBottom: '20px'
                    }}
                >
                    ← Desde la izquierda
                </motion.div>

                {/* Desde la derecha */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        padding: '20px',
                        backgroundColor: '#E91E63',
                        color: 'white',
                        borderRadius: '8px',
                        marginBottom: '20px'
                    }}
                >
                    Desde la derecha →
                </motion.div>

                {/* Desde abajo con escala */}
                <motion.div
                    initial={{ y: 100, opacity: 0, scale: 0.8 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    style={{
                        padding: '20px',
                        backgroundColor: '#009688',
                        color: 'white',
                        borderRadius: '8px'
                    }}
                >
                    ↑ Desde abajo con escala
                </motion.div>
            </div>

            <div style={{
                backgroundColor: '#fff3e0',
                padding: '15px',
                borderRadius: '8px',
                marginTop: '40px'
            }}>
                <p><strong>Opciones de viewport:</strong></p>
                <ul style={{ fontSize: '14px' }}>
                    <li><strong>once: true</strong> - Anima solo la primera vez</li>
                    <li><strong>once: false</strong> - Re-anima cada vez que entra/sale</li>
                    <li><strong>amount: 0.5</strong> - 50% del elemento debe estar visible</li>
                    <li><strong>margin: "-100px"</strong> - Offset desde el viewport</li>
                </ul>
            </div>
        </div>
    );
}

export default ScrollReveal;
