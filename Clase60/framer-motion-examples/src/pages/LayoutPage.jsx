// LayoutPage - Página de Layout Animations y Técnicas Avanzadas
import TarjetaExpandible from '../components/05-Layout/TarjetaExpandible'; // Importa tarjeta expandible con layout animation
import ListaReordenable from '../components/05-Layout/ListaReordenable'; // Importa lista reordenable
import ListaEscalonada from '../components/06-Avanzado/ListaEscalonada'; // Importa lista con efecto stagger (escalonado)
import AnimacionSVG from '../components/06-Avanzado/AnimacionSVG'; // Importa animación de gráficos SVG

function LayoutPage() {
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}> {/* Contenedor principal centrado */}
            <div style={{ // Header de la página
                padding: '40px 20px 20px', // Espaciado interno
                textAlign: 'center', // Texto centrado
                backgroundColor: '#f8f9fa' // Fondo gris muy claro
            }}>
                <h1 style={{ margin: 0, color: '#2c3e50' }}> {/* Título principal */}
                    📐 Layout y Técnicas Avanzadas
                </h1>
                <p style={{ color: '#7f8c8d', marginTop: '10px' }}> {/* Descripción */}
                    Animaciones de layout, Stagger y SVG
                </p>
            </div>

            <TarjetaExpandible /> {/* Tarjeta que se expande/contrae con animación suave */}
            <hr style={{ margin: '40px 0', border: 'none', borderTop: '2px solid #ecf0f1' }} /> {/* Divisor visual */}

            <ListaReordenable /> {/* Lista que anima automáticamente los reordenamientos */}
            <hr style={{ margin: '40px 0', border: 'none', borderTop: '2px solid #ecf0f1' }} /> {/* Divisor visual */}

            <ListaEscalonada /> {/* Lista con animación escalonada (cada item se anima secuencialmente) */}
            <hr style={{ margin: '40px 0', border: 'none', borderTop: '2px solid #ecf0f1' }} /> {/* Divisor visual */}

            <AnimacionSVG /> {/* Animaciones de trazados y formas SVG */}
        </div>
    );
}

export default LayoutPage; // Exporta el componente
