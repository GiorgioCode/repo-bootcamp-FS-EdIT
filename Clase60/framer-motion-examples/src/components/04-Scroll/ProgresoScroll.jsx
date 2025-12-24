// Componente ScrollProgress - Barra de progreso de scroll
import { motion, useScroll } from 'framer-motion';

function ScrollProgress() {
    // useScroll devuelve un objeto con valores de scroll
    // scrollYProgress es un valor entre 0 y 1 (0% a 100%)
    const { scrollYProgress } = useScroll();

    return (
        <div style={{ padding: '20px' }}>
            <h3>Scroll Progress - Barra de Progreso</h3>

            {/* Barra de progreso fija en la parte superior */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '5px',
                    backgroundColor: '#4CAF50',
                    transformOrigin: '0%',  // Crece desde la izquierda
                    // scaleX se conecta directamente al progreso del scroll
                    scaleX: scrollYProgress,
                    zIndex: 1000
                }}
            />

            <div style={{
                backgroundColor: '#e8f5e9',
                padding: '15px',
                borderRadius: '8px',
                marginTop: '20px'
            }}>
                <p><strong>¿Cómo funciona?</strong></p>
                <p style={{ fontSize: '14px' }}>
                    • <strong>useScroll():</strong> Hook que devuelve valores de scroll<br />
                    • <strong>scrollYProgress:</strong> Progreso vertical (0 = top, 1 = bottom)<br />
                    • <strong>scaleX:</strong> Escala horizontal conectada al progreso<br />
                    • La barra crece mientras haces scroll hacia abajo
                </p>
            </div>

            {/* Contenido de ejemplo para hacer scroll */}
            <div style={{ marginTop: '40px' }}>
                <h4>Haz scroll hacia abajo para ver la barra de progreso</h4>

                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <div
                        key={num}
                        style={{
                            padding: '40px',
                            margin: '20px 0',
                            backgroundColor: `hsl(${num * 45}, 70%, 85%)`,
                            borderRadius: '10px',
                            textAlign: 'center',
                            fontSize: '24px',
                            fontWeight: 'bold'
                        }}
                    >
                        Sección {num}
                    </div>
                ))}
            </div>

            <div style={{
                backgroundColor: '#fff3e0',
                padding: '15px',
                borderRadius: '8px',
                marginTop: '20px'
            }}>
                <p><strong>Valores disponibles en useScroll:</strong></p>
                <ul style={{ fontSize: '14px' }}>
                    <li><strong>scrollY:</strong> Pixeles de scroll vertical</li>
                    <li><strong>scrollYProgress:</strong> Progreso vertical (0-1)</li>
                    <li><strong>scrollX:</strong> Pixeles de scroll horizontal</li>
                    <li><strong>scrollXProgress:</strong> Progreso horizontal (0-1)</li>
                </ul>
            </div>
        </div>
    );
}

export default ScrollProgress;
