// ScrollPage - Página de Animaciones de Scroll
import ProgresoScroll from '../components/04-Scroll/ProgresoScroll'; // Importa indicador de progreso de scroll
import RevelacionScroll from '../components/04-Scroll/RevelacionScroll'; // Importa ejemplo de revelación al hacer scroll

function ScrollPage() {
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}> {/* Contenedor principal centrado */}
            <div style={{ // Header de la página
                padding: '40px 20px 20px', // Espaciado interno
                textAlign: 'center', // Texto centrado
                backgroundColor: '#f8f9fa' // Fondo gris muy claro
            }}>
                <h1 style={{ margin: 0, color: '#2c3e50' }}> {/* Título principal */}
                    📜 Animaciones de Scroll
                </h1>
                <p style={{ color: '#7f8c8d', marginTop: '10px' }}> {/* Descripción */}
                    useScroll, useTransform, whileInView y más
                </p>
            </div>

            <ProgresoScroll /> {/* Barra de progreso que se mueve con el scroll */}
            <hr style={{ margin: '40px 0', border: 'none', borderTop: '2px solid #ecf0f1' }} /> {/* Divisor visual */}

            <RevelacionScroll /> {/* Elementos que se revelan al entrar en viewport */}
        </div>
    );
}

export default ScrollPage; // Exporta el componente
