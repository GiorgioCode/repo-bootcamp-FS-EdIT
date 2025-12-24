// HomePage - Página principal
import { motion } from 'framer-motion'; // Importa motion para componentes animados
import { Link } from 'react-router-dom'; // Importa Link para navegación sin recargar

function HomePage() {
    const features = [ // Array de características/secciones de la aplicación (reorganizado)
        { path: '/animaciones', title: 'Animaciones Básicas', icon: '🎨', color: '#3498db' }, // Azul - Aparecer, Escala
        { path: '/variants', title: 'Variants', icon: '🎭', color: '#9b59b6' }, // Púrpura - Variants, Orquestación
        { path: '/gestos', title: 'Gestos', icon: '👆', color: '#e74c3c' }, // Rojo - Hover, Arrastre
        { path: '/scroll', title: 'Scroll', icon: '📜', color: '#f39c12' }, // Naranja - Progreso, Revelación
        { path: '/layout', title: 'Layout y Avanzado', icon: '🚀', color: '#16a085' } // Verde azulado - Layout, Stagger, SVG
    ];

    const containerVariants = { // Variant para el contenedor que orquesta las animaciones hijas
        hidden: { opacity: 0 }, // Estado inicial: invisible
        visible: { // Estado final: visible
            opacity: 1,
            transition: {
                staggerChildren: 0.1 // Retrasa cada hijo 0.1s respecto al anterior
            }
        }
    };

    const itemVariants = { // Variant para cada tarjeta individual
        hidden: { y: 20, opacity: 0 }, // Estado inicial: desplazada hacia abajo e invisible
        visible: { // Estado final: en posición original y visible
            y: 0,
            opacity: 1
        }
    };

    return (
        <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}> {/* Contenedor principal centrado */}
            {/* Hero Section */}
            <motion.div // Sección hero con animación de entrada
                initial={{ opacity: 0, y: -50 }} // Inicia invisible y desplazado hacia arriba
                animate={{ opacity: 1, y: 0 }} // Termina visible y en posición original
                transition={{ duration: 0.8 }} // Duración de 0.8 segundos
                style={{ textAlign: 'center', marginBottom: '60px' }} // Centrado con margen inferior
            >
                <h1 style={{ // Título principal
                    fontSize: '48px', // Tamaño grande
                    margin: '0 0 20px 0', // Margen solo inferior
                    color: '#2c3e50', // Color oscuro
                    fontWeight: 'bold' // Negrita
                }}>
                    Framer Motion Examples
                </h1>
                <p style={{ // Subtítulo descriptivo
                    fontSize: '20px', // Tamaño mediano
                    color: '#7f8c8d', // Color gris
                    maxWidth: '600px', // Ancho máximo para legibilidad
                    margin: '0 auto 30px' // Centrado con margen inferior
                }}>
                    Ejemplos prácticos y educativos de Framer Motion para React
                </p>

                <motion.div // Emoji animado que se mueve verticalmente
                    animate={{ // Animación continua
                        y: [0, -10, 0] // Se mueve arriba y abajo (keyframes)
                    }}
                    transition={{ // Configuración de la transición
                        duration: 2, // Cada ciclo dura 2 segundos
                        repeat: Infinity, // Se repite infinitamente
                        ease: "easeInOut" // Suaviza el inicio y fin del movimiento
                    }}
                    style={{ fontSize: '40px', marginTop: '20px' }} // Tamaño grande con margen superior
                >
                    👇
                </motion.div>
            </motion.div>

            {/* Features Grid */}
            <motion.div // Grid de tarjetas con animación escalonada
                variants={containerVariants} // Usa el variant del contenedor
                initial="hidden" // Comienza en estado hidden
                animate="visible" // Anima hacia estado visible
                style={{ // Estilos del grid
                    display: 'grid', // Usa CSS Grid
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Columnas responsivas
                    gap: '30px' // Espacio entre tarjetas
                }}
            >
                {features.map((feature) => ( // Itera sobre cada feature
                    <Link // Link a cada sección
                        key={feature.path} // Key única
                        to={feature.path} // Ruta de destino
                        style={{ textDecoration: 'none' }} // Sin subrayado
                    >
                        <motion.div // Tarjeta animada
                            variants={itemVariants} // Usa el variant de items
                            whileHover={{ // Animación al pasar el mouse
                                scale: 1.05, // Aumenta 5% el tamaño
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)' // Sombra más pronunciada
                            }}
                            whileTap={{ scale: 0.95 }} // Reduce 5% al hacer click
                            style={{ // Estilos de la tarjeta
                                padding: '40px', // Espaciado interno generoso
                                backgroundColor: 'white', // Fondo blanco
                                borderRadius: '15px', // Bordes muy redondeados
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)', // Sombra sutil
                                textAlign: 'center', // Contenido centrado
                                cursor: 'pointer', // Cursor de mano
                                borderTop: `5px solid ${feature.color}` // Borde superior con color característico
                            }}
                        >
                            <div style={{ // Contenedor del icono
                                fontSize: '60px', // Tamaño muy grande
                                marginBottom: '15px' // Margen inferior
                            }}>
                                {feature.icon} {/* Emoji del feature */}
                            </div>
                            <h3 style={{ // Título de la tarjeta
                                margin: 0, // Sin margen
                                color: '#2c3e50', // Color oscuro
                                fontSize: '22px' // Tamaño mediano-grande
                            }}>
                                {feature.title} {/* Título del feature */}
                            </h3>
                        </motion.div>
                    </Link>
                ))}
            </motion.div>

            {/* Info Section */}
            <motion.div // Sección informativa al final
                initial={{ opacity: 0 }} // Inicia invisible
                animate={{ opacity: 1 }} // Termina visible
                transition={{ delay: 0.8 }} // Espera 0.8s antes de aparecer
                style={{ // Estilos de la sección
                    marginTop: '80px', // Separación superior
                    padding: '30px', // Espaciado interno
                    backgroundColor: '#ecf0f1', // Fondo gris claro
                    borderRadius: '10px', // Bordes redondeados
                    textAlign: 'center' // Contenido centrado
                }}
            >
                <h3 style={{ marginTop: 0, color: '#2c3e50' }}> {/* Título de la sección */}
                    ¿Qué aprenderás?
                </h3>
                <div style={{ // Grid de temas a aprender
                    display: 'grid', // Usa CSS Grid
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Columnas responsivas
                    gap: '20px', // Espacio entre items
                    marginTop: '20px' // Margen superior
                }}>
                    {[ // Array de temas (actualizado)
                        'Animaciones básicas',
                        'Variants y orquestación',
                        'Gestos interactivos',
                        'Animaciones de scroll',
                        'Layout y SVG'
                    ].map((item, index) => ( // Itera sobre cada tema
                        <div // Tarjeta de tema
                            key={index} // Key única
                            style={{ // Estilos de la tarjeta
                                padding: '15px', // Espaciado interno
                                backgroundColor: 'white', // Fondo blanco
                                borderRadius: '8px' // Bordes redondeados
                            }}
                        >
                            ✓ {item} {/* Checkmark + nombre del tema */}
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default HomePage; // Exporta el componente
