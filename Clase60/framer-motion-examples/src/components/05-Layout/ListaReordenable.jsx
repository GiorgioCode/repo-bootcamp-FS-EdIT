// Componente ListReorder - Lista con elementos que se pueden reordenar
import { useState } from 'react';
import { motion } from 'framer-motion';

function ListReorder() {
    const [items, setItems] = useState([
        { id: 1, text: 'React', emoji: '⚛️', color: '#61DAFB' },
        { id: 2, text: 'JavaScript', emoji: '📜', color: '#F7DF1E' },
        { id: 3, text: 'TypeScript', emoji: '💙', color: '#3178C6' },
        { id: 4, text: 'Framer Motion', emoji: '🎭', color: '#FF0080' },
        { id: 5, text: 'CSS', emoji: '🎨', color: '#264DE4' }
    ]);

    // Mezclar la lista aleatoriamente
    const shuffle = () => {
        const newItems = [...items].sort(() => Math.random() - 0.5);
        setItems(newItems);
    };

    // Ordenar alfabéticamente
    const sortAlphabetically = () => {
        const sorted = [...items].sort((a, b) => a.text.localeCompare(b.text));
        setItems(sorted);
    };

    // Invertir orden
    const reverse = () => {
        setItems([...items].reverse());
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>List Reorder - Reordenar Lista</h3>

            <div style={{
                backgroundColor: '#e3f2fd',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px'
            }}>
                <p><strong>Layout en Listas:</strong></p>
                <p style={{ fontSize: '14px' }}>
                    Cuando usas <code>layout</code> en items de una lista, estos se animan
                    automáticamente a sus nuevas posiciones cuando cambia el orden.
                </p>
            </div>

            {/* Botones de control */}
            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '20px',
                flexWrap: 'wrap'
            }}>
                <button
                    onClick={shuffle}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#FF5722',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    🔀 Mezclar
                </button>

                <button
                    onClick={sortAlphabetically}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    🔤 Ordenar A-Z
                </button>

                <button
                    onClick={reverse}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    ↕️ Invertir
                </button>
            </div>

            {/* Lista animada */}
            <ul style={{
                listStyle: 'none',
                padding: 0,
                maxWidth: '500px',
                margin: '0 auto'
            }}>
                {items.map((item) => (
                    <motion.li
                        key={item.id}
                        // layout anima automáticamente la reordenación
                        layout
                        // Configuración de la animación
                        transition={{
                            type: 'spring',
                            stiffness: 350,
                            damping: 25
                        }}
                        // Hover effect
                        whileHover={{
                            scale: 1.02,
                            boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                        }}
                        style={{
                            padding: '20px',
                            margin: '10px 0',
                            backgroundColor: 'white',
                            borderLeft: `5px solid ${item.color}`,
                            borderRadius: '5px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            cursor: 'pointer'
                        }}
                    >
                        <span style={{ fontSize: '30px' }}>{item.emoji}</span>
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            {item.text}
                        </span>
                    </motion.li>
                ))}
            </ul>

            <div style={{
                backgroundColor: '#fff3e0',
                padding: '15px',
                borderRadius: '8px',
                marginTop: '40px'
            }}>
                <p><strong>Key Points:</strong></p>
                <ul style={{ fontSize: '14px' }}>
                    <li>Cada item debe tener un <code>key</code> único y estable</li>
                    <li>Agrega <code>layout</code> a cada motion element</li>
                    <li>Usa <code>type: "spring"</code> para animaciones naturales</li>
                    <li>La animación es automática, solo cambia el orden del array</li>
                </ul>
            </div>
        </div>
    );
}

export default ListReorder;
