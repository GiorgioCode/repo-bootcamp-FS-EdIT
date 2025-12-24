// Componente StaggerList - Lista con efecto de cascada (stagger)
import { motion } from 'framer-motion';

function StaggerList() {
    // Variants del contenedor con stagger
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                // staggerChildren crea el efecto de cascada
                staggerChildren: 0.1,  // 0.1 segundos entre cada hijo
                delayChildren: 0.2     // Espera antes de empezar
            }
        }
    };

    // Variants de cada item
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    const features = [
        { icon: '⚡', title: 'Rápido', description: 'Performance optimizada' },
        { icon: '🎨', title: 'Hermoso', description: 'Diseño moderno' },
        { icon: '📱', title: 'Responsive', description: 'Funciona en todos los dispositivos' },
        { icon: '🔒', title: 'Seguro', description: 'Protección de datos' },
        { icon: '🌍', title: 'Global', description: 'Disponible en todo el mundo' },
        { icon: '💎', title: 'Premium', description: 'Calidad superior' }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h3>Stagger Animation - Efecto Cascada</h3>

            <div style={{
                backgroundColor: '#e3f2fd',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '30px'
            }}>
                <p><strong>¿Qué es Stagger?</strong></p>
                <p style={{ fontSize: '14px' }}>
                    Stagger crea un efecto de "cascada" donde cada elemento se anima
                    con un pequeño retraso después del anterior. Esto crea una sensación
                    de fluidez y profesionalismo.
                </p>
            </div>

            {/* Grid con efecto stagger */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    marginBottom: '40px'
                }}
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        }}
                        style={{
                            padding: '25px',
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            textAlign: 'center'
                        }}
                    >
                        <div style={{ fontSize: '50px', marginBottom: '10px' }}>
                            {feature.icon}
                        </div>
                        <h4 style={{ margin: '10px 0', color: '#333' }}>
                            {feature.title}
                        </h4>
                        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Ejemplo de stagger en lista vertical */}
            <h4>Stagger Vertical</h4>
            <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    listStyle: 'none',
                    padding: 0,
                    maxWidth: '500px',
                    margin: '0 auto'
                }}
            >
                {['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto'].map((text, index) => (
                    <motion.li
                        key={index}
                        variants={itemVariants}
                        style={{
                            padding: '15px',
                            margin: '10px 0',
                            backgroundColor: `hsl(${index * 40}, 70%, 60%)`,
                            color: 'white',
                            borderRadius: '5px',
                            fontWeight: 'bold'
                        }}
                    >
                        {text} - Aparece con delay de {(index + 1) * 0.1}s
                    </motion.li>
                ))}
            </motion.ul>

            <div style={{
                backgroundColor: '#fff3e0',
                padding: '15px',
                borderRadius: '8px',
                marginTop: '40px'
            }}>
                <p><strong>Configuración Stagger:</strong></p>
                <ul style={{ fontSize: '14px' }}>
                    <li><code>staggerChildren: 0.1</code> - Tiempo entre cada hijo</li>
                    <li><code>delayChildren: 0.2</code> - Delay inicial antes de empezar</li>
                    <li><code>staggerDirection: 1</code> - Dirección (1 = adelante, -1 = atrás)</li>
                </ul>
            </div>
        </div>
    );
}

export default StaggerList;
