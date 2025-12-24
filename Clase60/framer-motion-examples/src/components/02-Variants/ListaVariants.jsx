// Componente VariantsList - Uso de variants para código más limpio
import { motion } from 'framer-motion';

function VariantsList() {
    // Definir variants fuera del JSX para reutilización
    // Los variants son objetos que definen diferentes estados de animación
    const containerVariants = {
        // Estado "hidden" - el contenedor está invisible
        hidden: {
            opacity: 0
        },
        // Estado "visible" - el contenedor es visible
        visible: {
            opacity: 1,
            // Configuración especial para animar los hijos
            transition: {
                // staggerChildren: tiempo de delay entre cada hijo
                staggerChildren: 0.2  // Cada hijo espera 0.2s después del anterior
            }
        }
    };

    // Variants para cada item de la lista
    const itemVariants = {
        hidden: {
            x: -50,      // Comienza 50px a la izquierda
            opacity: 0   // Invisible
        },
        visible: {
            x: 0,        // Se mueve a su posición normal
            opacity: 1   // Se vuelve visible
        }
    };

    // Datos de ejemplo
    const items = [
        { id: 1, text: 'Primer elemento', color: '#FF5722' },
        { id: 2, text: 'Segundo elemento', color: '#FF9800' },
        { id: 3, text: 'Tercer elemento', color: '#FFC107' },
        { id: 4, text: 'Cuarto elemento', color: '#FFEB3B' }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h3>Variants - Definición Reutilizable de Estados</h3>

            {/* El contenedor usa containerVariants */}
            <motion.ul
                variants={containerVariants}
                initial="hidden"    // Comienza en el estado "hidden"
                animate="visible"   // Anima hacia el estado "visible"
                style={{
                    listStyle: 'none',
                    padding: 0,
                    maxWidth: '400px',
                    margin: '20px auto'
                }}
            >
                {/* Cada hijo hereda automáticamente los estados del padre */}
                {items.map((item) => (
                    <motion.li
                        key={item.id}
                        variants={itemVariants}  // Usa sus propios variants
                        // No necesita initial/animate, los hereda del padre
                        style={{
                            padding: '15px',
                            margin: '10px 0',
                            backgroundColor: item.color,
                            borderRadius: '5px',
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                    >
                        {item.text}
                    </motion.li>
                ))}
            </motion.ul>

            <div style={{
                backgroundColor: '#f0f0f0',
                padding: '15px',
                borderRadius: '8px',
                marginTop: '20px',
                maxWidth: '400px',
                margin: '20px auto'
            }}>
                <p><strong>¿Qué son los Variants?</strong></p>
                <ul style={{ fontSize: '14px' }}>
                    <li>Objetos que definen estados de animación con nombres</li>
                    <li>Permiten código más limpio y reutilizable</li>
                    <li>Los hijos heredan los estados del padre automáticamente</li>
                    <li>staggerChildren crea efecto de "cascada"</li>
                </ul>
            </div>
        </div>
    );
}

export default VariantsList;
