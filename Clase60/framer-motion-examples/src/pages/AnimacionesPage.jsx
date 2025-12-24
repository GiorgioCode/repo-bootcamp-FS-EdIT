// AnimacionesPage - Página de animaciones básicas
import AparecerGradual from '../components/01-Animaciones/AparecerGradual'; // Importa componente de animación aparecer gradual
import CajaEscala from '../components/01-Animaciones/CajaEscala'; // Importa componente de animación de escala

function AnimacionesPage() {
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}> {/* Contenedor principal centrado */}
            <div style={{ // Header de la página
                padding: '40px 20px 20px', // Espaciado interno
                textAlign: 'center', // Texto centrado
                backgroundColor: '#f8f9fa' // Fondo gris muy claro
            }}>
                <h1 style={{ margin: 0, color: '#2c3e50' }}> {/* Título principal */}
                    🎨 Animaciones Básicas
                </h1>
                <p style={{ color: '#7f8c8d', marginTop: '10px' }}> {/* Descripción */}
                    Aprende los fundamentos de las animaciones con Framer Motion
                </p>
            </div>

            <AparecerGradual /> {/* Ejemplo de animación aparecer gradual */}
            <hr style={{ margin: '40px 0', border: 'none', borderTop: '2px solid #ecf0f1' }} /> {/* Divisor visual */}

            <CajaEscala /> {/* Ejemplo de animación de escala */}
        </div>
    );
}

export default AnimacionesPage; // Exporta el componente
