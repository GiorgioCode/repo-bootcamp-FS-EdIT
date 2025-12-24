// VariantsPage - Página de Variants y Orquestación
import ListaVariants from '../components/02-Variants/ListaVariants'; // Importa componente que demuestra uso de variants
import EjemploOrquestacion from '../components/02-Variants/EjemploOrquestacion'; // Importa ejemplo de orquestación de animaciones

function VariantsPage() {
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}> {/* Contenedor principal centrado */}
            <div style={{ // Header de la página
                padding: '40px 20px 20px', // Espaciado interno
                textAlign: 'center', // Texto centrado
                backgroundColor: '#f8f9fa' // Fondo gris muy claro
            }}>
                <h1 style={{ margin: 0, color: '#2c3e50' }}> {/* Título principal */}
                    🎭 Variants y Orquestación
                </h1>
                <p style={{ color: '#7f8c8d', marginTop: '10px' }}> {/* Descripción */}
                    Código más limpio y orquestación de animaciones
                </p>
            </div>

            <ListaVariants /> {/* Ejemplo de uso de variants para código más limpio */}
            <hr style={{ margin: '40px 0', border: 'none', borderTop: '2px solid #ecf0f1' }} /> {/* Divisor visual */}

            <EjemploOrquestacion /> {/* Ejemplo de orquestación con stagger children */}
        </div>
    );
}

export default VariantsPage; // Exporta el componente
