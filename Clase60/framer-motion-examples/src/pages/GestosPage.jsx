// GestosPage - Página de Gestos e Interacciones
import EjemploHover from '../components/03-Gestos/EjemploHover'; // Importa ejemplo de interacción hover
import EjemploArrastre from '../components/03-Gestos/EjemploArrastre'; // Importa ejemplo de arrastre (drag)

function GestosPage() {
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}> {/* Contenedor principal centrado */}
            <div style={{ // Header de la página
                padding: '40px 20px 20px', // Espaciado interno
                textAlign: 'center', // Texto centrado
                backgroundColor: '#f8f9fa' // Fondo gris muy claro
            }}>
                <h1 style={{ margin: 0, color: '#2c3e50' }}> {/* Título principal */}
                    👆 Gestos e Interacciones
                </h1>
                <p style={{ color: '#7f8c8d', marginTop: '10px' }}> {/* Descripción */}
                    Hover, Drag y más interacciones
                </p>
            </div>

            <EjemploHover /> {/* Ejemplo de animaciones al pasar el mouse (hover) */}
            <hr style={{ margin: '40px 0', border: 'none', borderTop: '2px solid #ecf0f1' }} /> {/* Divisor visual */}

            <EjemploArrastre /> {/* Ejemplo de elementos arrastrables */}
        </div>
    );
}

export default GestosPage; // Exporta el componente
