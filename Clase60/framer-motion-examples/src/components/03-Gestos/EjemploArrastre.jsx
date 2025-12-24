// Componente DragExample - Ejemplos de elementos arrastrables
import { useRef } from 'react';
import { motion } from 'framer-motion';

function DragExample() {
    // Referencia al contenedor para restricciones
    const constraintsRef = useRef(null);

    return (
        <div style={{ padding: '20px' }}>
            <h3>Drag - Arrastrar Elementos</h3>

            {/* Drag libre (sin restricciones) */}
            <div style={{ marginBottom: '30px' }}>
                <h4>Drag Libre</h4>
                <motion.div
                    // drag habilita el arrastre en todas las direcciones
                    drag
                    // whileDrag define el estado mientras se arrastra
                    whileDrag={{
                        scale: 1.1,
                        cursor: 'grabbing',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                    }}
                    style={{
                        width: '120px',
                        height: '120px',
                        backgroundColor: '#FF5722',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'grab',
                        margin: '20px auto'
                    }}
                >
                    Arrástrarne
                </motion.div>
            </div>

            {/* Drag solo horizontal */}
            <div style={{ marginBottom: '30px' }}>
                <h4>Drag Horizontal (drag="x")</h4>
                <div style={{
                    width: '100%',
                    height: '100px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '10px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 10px'
                }}>
                    <motion.div
                        // drag="x" solo permite arrastre horizontal
                        drag="x"
                        dragConstraints={{
                            left: 0,
                            right: 300  // No puede ir más allá de 300px a la derecha
                        }}
                        style={{
                            width: '80px',
                            height: '80px',
                            backgroundColor: '#2196F3',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '30px',
                            cursor: 'grab'
                        }}
                    >
                        ↔️
                    </motion.div>
                </div>
            </div>

            {/* Drag solo vertical */}
            <div style={{ marginBottom: '30px' }}>
                <h4>Drag Vertical (drag="y")</h4>
                <div style={{
                    width: '100px',
                    height: '200px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '10px',
                    margin: '0 auto',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '10px 0'
                }}>
                    <motion.div
                        // drag="y" solo permite arrastre vertical
                        drag="y"
                        dragConstraints={{
                            top: 0,
                            bottom: 120  // No puede ir más allá de 120px hacia abajo
                        }}
                        style={{
                            width: '80px',
                            height: '80px',
                            backgroundColor: '#4CAF50',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '30px',
                            cursor: 'grab'
                        }}
                    >
                        ↕️
                    </motion.div>
                </div>
            </div>

            {/* Drag con restricciones de contenedor */}
            <div style={{ marginBottom: '30px' }}>
                <h4>Drag con Restricciones (dragConstraints)</h4>
                <div
                    ref={constraintsRef}
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        height: '300px',
                        backgroundColor: '#e3f2fd',
                        borderRadius: '10px',
                        margin: '0 auto',
                        position: 'relative',
                        border: '2px dashed #2196F3'
                    }}
                >
                    {/* El elemento no puede salir del contenedor */}
                    <motion.div
                        drag
                        dragConstraints={constraintsRef}  // Referencia al contenedor
                        dragElastic={0.2}  // Elasticidad al tocar los bordes (0-1)
                        whileDrag={{ scale: 1.1 }}
                        style={{
                            width: '80px',
                            height: '80px',
                            backgroundColor: '#9C27B0',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '30px',
                            cursor: 'grab',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        🎯
                    </motion.div>
                </div>
            </div>

            <div style={{
                backgroundColor: '#f3e5f5',
                padding: '15px',
                borderRadius: '8px',
                maxWidth: '500px',
                margin: '20px auto'
            }}>
                <p><strong>Opciones de Drag:</strong></p>
                <ul style={{ fontSize: '14px' }}>
                    <li><strong>drag:</strong> Permite arrastrar en todas direcciones</li>
                    <li><strong>drag="x":</strong> Solo horizontal</li>
                    <li><strong>drag="y":</strong> Solo vertical</li>
                    <li><strong>dragConstraints:</strong> Define límites del arrastre</li>
                    <li><strong>dragElastic:</strong> Elasticidad en los bordes (0-1)</li>
                    <li><strong>whileDrag:</strong> Estado mientras se arrastra</li>
                </ul>
            </div>
        </div>
    );
}

export default DragExample;
