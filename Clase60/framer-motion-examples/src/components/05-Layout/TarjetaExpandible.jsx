// Componente ExpandCard - Tarjeta que se expande con layout animation
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ExpandCard() {
    const [expandedId, setExpandedId] = useState(null);

    const cards = [
        {
            id: 1,
            title: 'Tarjeta 1',
            emoji: '🚀',
            content: 'Esta tarjeta se expande mostrando contenido adicional. La animación de layout se encarga automáticamente de animar el cambio de tamaño.',
            color: '#FF5722'
        },
        {
            id: 2,
            title: 'Tarjeta 2',
            emoji: '⭐',
            content: 'El prop "layout" detecta cambios en el tamaño, posición o cualquier propiedad CSS y anima automáticamente entre los estados.',
            color: '#2196F3'
        },
        {
            id: 3,
            title: 'Tarjeta 3',
            emoji: '💎',
            content: 'No necesitas definir animaciones explícitas. Framer Motion calcula y anima la transición automáticamente usando FLIP (First, Last, Invert, Play).',
            color: '#4CAF50'
        }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h3>Layout Animations - Tarjetas Expandibles</h3>

            <div style={{
                backgroundColor: '#e3f2fd',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px'
            }}>
                <p><strong>Layout Prop:</strong></p>
                <p style={{ fontSize: '14px' }}>
                    El prop <code>layout</code> anima automáticamente los cambios en tamaño,
                    posición y otras propiedades CSS. Haz clic en las tarjetas.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginTop: '20px'
            }}>
                {cards.map((card) => (
                    <motion.div
                        key={card.id}
                        // layout anima automáticamente cambios de tamaño/posición
                        layout
                        onClick={() => setExpandedId(expandedId === card.id ? null : card.id)}
                        style={{
                            backgroundColor: card.color,
                            borderRadius: '10px',
                            padding: '20px',
                            cursor: 'pointer',
                            color: 'white'
                        }}
                    >
                        <motion.div layout style={{ fontSize: '40px', marginBottom: '10px' }}>
                            {card.emoji}
                        </motion.div>

                        <motion.h4 layout style={{ margin: '0 0 10px 0' }}>
                            {card.title}
                        </motion.h4>

                        {/* AnimatePresence permite animar la aparición/desaparición */}
                        <AnimatePresence>
                            {expandedId === card.id && (
                                <motion.div
                                    // Animación de entrada
                                    initial={{ opacity: 0, height: 0 }}
                                    // Animación visible
                                    animate={{ opacity: 1, height: 'auto' }}
                                    // Animación de salida
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p style={{ margin: '10px 0 0 0', fontSize: '14px' }}>
                                        {card.content}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Ejemplo de toggle simple */}
            <div style={{ marginTop: '40px' }}>
                <h4>Toggle Switch con Layout</h4>
                <ToggleSwitch />
            </div>

            <div style={{
                backgroundColor: '#fff3e0',
                padding: '15px',
                borderRadius: '8px',
                marginTop: '20px'
            }}>
                <p><strong>¿Cómo funciona?</strong></p>
                <ul style={{ fontSize: '14px' }}>
                    <li>Agrega <code>layout</code> al motion element</li>
                    <li>Cambia cualquier propiedad CSS (width, height, position, etc.)</li>
                    <li>Framer Motion anima automáticamente la transición</li>
                    <li>Usa FLIP technique para performance óptima</li>
                </ul>
            </div>
        </div>
    );
}

// Componente Toggle Switch
function ToggleSwitch() {
    const [isOn, setIsOn] = useState(false);

    return (
        <div
            onClick={() => setIsOn(!isOn)}
            style={{
                width: '120px',
                height: '60px',
                backgroundColor: isOn ? '#4CAF50' : '#ccc',
                borderRadius: '30px',
                padding: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isOn ? 'flex-end' : 'flex-start',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
            }}
        >
            {/* El círculo se mueve suavemente gracias a layout */}
            <motion.div
                layout
                transition={{
                    type: 'spring',
                    stiffness: 700,
                    damping: 30
                }}
                style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'white',
                    borderRadius: '50%'
                }}
            />
        </div>
    );
}

export default ExpandCard;
