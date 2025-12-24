// Componente HoverExample - Ejemplos de animaciones al pasar el mouse
import { motion } from 'framer-motion';

function HoverExample() {
    return (
        <div style={{ padding: '20px' }}>
            <h3>Hover - Interacciones con el Mouse</h3>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                maxWidth: '400px',
                margin: '20px auto'
            }}>
                {/* Botón con escala al hover */}
                <motion.button
                    // whileHover define el estado durante el hover
                    whileHover={{
                        scale: 1.1,  // Crece 10%
                        backgroundColor: '#00796B'
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                        padding: '15px 30px',
                        backgroundColor: '#009688',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Pasa el mouse aquí
                </motion.button>

                {/* Tarjeta con múltiples efectos hover */}
                <motion.div
                    whileHover={{
                        scale: 1.05,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                        y: -5  // Se eleva ligeramente
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 300
                    }}
                    style={{
                        padding: '20px',
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        cursor: 'pointer'
                    }}
                >
                    <h4 style={{ margin: '0 0 10px 0' }}>Tarjeta Interactiva</h4>
                    <p style={{ margin: 0, color: '#666' }}>
                        Me elevo y mi sombra crece al hacer hover
                    </p>
                </motion.div>

                {/* Botón con rotación */}
                <motion.button
                    whileHover={{
                        rotate: 5,
                        scale: 1.1
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    style={{
                        padding: '15px 30px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Me roto al hacer hover
                </motion.button>

                {/* Elemento con cambio de color gradual */}
                <motion.div
                    whileHover={{
                        backgroundColor: '#E91E63',
                        color: '#fff'
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        padding: '20px',
                        backgroundColor: '#f0f0f0',
                        color: '#333',
                        borderRadius: '10px',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                >
                    Cambio de color suave
                </motion.div>

                {/* Ícono animado */}
                <div style={{ textAlign: 'center' }}>
                    <motion.div
                        whileHover={{
                            rotate: 360,
                            scale: 1.3
                        }}
                        transition={{ duration: 0.5 }}
                        style={{
                            display: 'inline-block',
                            fontSize: '60px',
                            cursor: 'pointer'
                        }}
                    >
                        ⭐
                    </motion.div>
                    <p style={{ marginTop: '10px', color: '#666' }}>Haz hover en la estrella</p>
                </div>
            </div>

            <div style={{
                backgroundColor: '#fff3e0',
                padding: '15px',
                borderRadius: '8px',
                maxWidth: '400px',
                margin: '20px auto'
            }}>
                <p><strong>whileHover:</strong></p>
                <p style={{ fontSize: '14px', margin: '10px 0' }}>
                    Define el estado de animación mientras el mouse está sobre el elemento.
                    Vuelve automáticamente al estado original cuando el mouse sale.
                </p>
            </div>
        </div>
    );
}

export default HoverExample;
