# Guía Completa de Framer Motion para React

## Tabla de Contenidos

1. [Introducción a Framer Motion](#introducción-a-framer-motion)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Conceptos Fundamentales](#conceptos-fundamentales)
4. [Animaciones Básicas](#animaciones-básicas)
5. [Variants y Orquestación](#variants-y-orquestación)
6. [Gestos e Interacciones](#gestos-e-interacciones)
7. [Animaciones de Scroll](#animaciones-de-scroll)
8. [Layout Animations](#layout-animations)
9. [AnimatePresence](#animatepresence)
10. [Técnicas Avanzadas](#técnicas-avanzadas)
11. [Optimización de Performance](#optimización-de-performance)

---

## Introducción a Framer Motion

### ¿Qué es Framer Motion?

Framer Motion es una librería de animaciones para React que facilita la creación de animaciones fluidas y complejas con una API simple y declarativa. Es una de las librerías más populares para animaciones en React debido a:

-   **API Declarativa**: Defines qué animar, no cómo animarlo
-   **Performance Optimizada**: Usa GPU para animaciones suaves
-   **Gestos Integrados**: Soporte nativo para drag, hover, tap, etc.
-   **Layout Animations**: Anima cambios en el layout automáticamente
-   **TypeScript**: Soporte completo de tipos

### Casos de Uso Comunes

-   Transiciones de página
-   Elementos interactivos (botones, tarjetas)
-   Animaciones de scroll (parallax, reveal)
-   Loading states
-   Drag and drop
-   Modales y popups

---

## Instalación y Configuración

### Instalación

```bash
# Con npm
npm install framer-motion

# Con yarn
yarn add framer-motion

# Con pnpm
pnpm add framer-motion
```

### Versiones Compatibles

-   React 16.8+ (requiere hooks)
-   React DOM
-   Funciona con Create React App, Vite, Next.js, etc.

### Importación Básica

```jsx
// Importar el componente motion
import { motion } from "framer-motion";

// En tu componente
function App() {
    return <motion.div>Contenido animado</motion.div>;
}
```

---

## Conceptos Fundamentales

### El Componente `motion`

Framer Motion funciona convirtiendo elementos HTML estándar en elementos animables usando el prefijo `motion.`:

```jsx
// Elementos HTML estándar
<div>Normal</div>
<button>Normal</button>
<img src="..." />

// Elementos motion (animables)
<motion.div>Animable</motion.div>
<motion.button>Animable</motion.button>
<motion.img src="..." />
```

### Propiedades Principales

| Propiedad     | Descripción                       |
| ------------- | --------------------------------- |
| `initial`     | Estado inicial antes de montar    |
| `animate`     | Estado objetivo de la animación   |
| `exit`        | Estado al desmontar el componente |
| `transition`  | Cómo se debe animar               |
| `whileHover`  | Estado durante hover              |
| `whileTap`    | Estado durante tap/click          |
| `whileDrag`   | Estado durante drag               |
| `whileInView` | Estado cuando está visible        |

---

## Animaciones Básicas

### 1. Fade In (Aparecer Gradualmente)

```jsx
import { motion } from "framer-motion";

function FadeIn() {
    return (
        <motion.div
            // Estado inicial: invisible
            initial={{ opacity: 0 }}
            // Estado final: visible
            animate={{ opacity: 1 }}
            // Duración de la transición
            transition={{ duration: 0.5 }}
        >
            ¡Aparezco gradualmente!
        </motion.div>
    );
}
```

**Explicación:**

-   `opacity: 0` = invisible
-   `opacity: 1` = totalmente visible
-   La animación toma 0.5 segundos

### 2. Scale (Escalar)

```jsx
function ScaleBox() {
    return (
        <motion.div
            // Comienza pequeño
            initial={{ scale: 0 }}
            // Crece a tamaño normal
            animate={{ scale: 1 }}
            // Configuración de la transición
            transition={{
                duration: 0.5, // Duración en segundos
                ease: "easeOut", // Tipo de easing
            }}
            style={{
                width: 100,
                height: 100,
                backgroundColor: "blue",
            }}
        >
            Caja escalada
        </motion.div>
    );
}
```

**Tipos de Easing Comunes:**

-   `"linear"` - Velocidad constante
-   `"easeIn"` - Comienza lento
-   `"easeOut"` - Termina lento
-   `"easeInOut"` - Lento al inicio y final
-   `"anticipate"` - Retrocede antes de avanzar

### 3. Slide In (Deslizar)

```jsx
function SlideIn() {
    return (
        <motion.div
            // Comienza fuera de la pantalla (izquierda)
            initial={{ x: -100, opacity: 0 }}
            // Se mueve a su posición normal
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            Me deslizo desde la izquierda
        </motion.div>
    );
}
```

**Propiedades de Posición:**

-   `x` - Movimiento horizontal (px)
-   `y` - Movimiento vertical (px)
-   Valores negativos = izquierda/arriba
-   Valores positivos = derecha/abajo

### 4. Rotate (Rotar)

```jsx
function RotateBox() {
    return (
        <motion.div
            // Rotación inicial
            initial={{ rotate: 0 }}
            // Rotación final (360 grados = círculo completo)
            animate={{ rotate: 360 }}
            // Configurar para que se repita
            transition={{
                duration: 2,
                repeat: Infinity, // Repetir infinitamente
                ease: "linear", // Velocidad constante
            }}
            style={{
                width: 50,
                height: 50,
                backgroundColor: "red",
            }}
        />
    );
}
```

### 5. Combinando Múltiples Propiedades

```jsx
function ComplexAnimation() {
    return (
        <motion.div
            initial={{
                opacity: 0, // Invisible
                scale: 0.5, // Pequeño
                y: 50, // Abajo
                rotate: -180, // Rotado
            }}
            animate={{
                opacity: 1, // Visible
                scale: 1, // Tamaño normal
                y: 0, // Posición normal
                rotate: 0, // Sin rotación
            }}
            transition={{
                duration: 0.8,
                ease: "easeOut",
            }}
        >
            Animación compleja
        </motion.div>
    );
}
```

---

## Variants y Orquestación

### ¿Qué son los Variants?

Los **variants** son objetos que definen diferentes estados de animación con nombres. Permiten:

-   Reutilizar configuraciones de animación
-   Orquestar animaciones de padres e hijos
-   Código más limpio y mantenible

### Variants Básicos

```jsx
function VariantExample() {
    // Definir los variants fuera del JSX
    const boxVariants = {
        // Estado "hidden" (nombre personalizado)
        hidden: {
            opacity: 0,
            scale: 0,
        },
        // Estado "visible" (nombre personalizado)
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <motion.div
            // Usar los nombres de los variants
            variants={boxVariants}
            initial="hidden" // Comienza en estado "hidden"
            animate="visible" // Anima al estado "visible"
        >
            Usando variants
        </motion.div>
    );
}
```

### Propagación de Variants (Padre-Hijo)

```jsx
function ParentChild() {
    // Variants del contenedor padre
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            // Configuración especial para hijos
            transition: {
                staggerChildren: 0.2, // Retraso entre cada hijo (0.2s)
            },
        },
    };

    // Variants de los elementos hijos
    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
        },
    };

    return (
        <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Los hijos heredan automáticamente los estados del padre */}
            <motion.li variants={itemVariants}>Item 1</motion.li>
            <motion.li variants={itemVariants}>Item 2</motion.li>
            <motion.li variants={itemVariants}>Item 3</motion.li>
        </motion.ul>
    );
}
```

**Explicación de `staggerChildren`:**

-   Crea un efecto de "cascada"
-   Cada hijo se anima con un retraso
-   `0.2` = 200ms de diferencia entre cada hijo

### Orquestación Avanzada

```jsx
function AdvancedOrchestration() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                // Cuando comienzan las animaciones de los hijos
                delayChildren: 0.3,
                // Tiempo entre cada hijo
                staggerChildren: 0.2,
                // Dirección del stagger
                staggerDirection: 1, // 1 = adelante, -1 = reversa
            },
        },
    };

    const itemVariants = {
        hidden: {
            y: 20,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring", // Animación tipo resorte
                stiffness: 100, // Rigidez del resorte
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {[1, 2, 3, 4].map((item) => (
                <motion.div key={item} variants={itemVariants}>
                    Item {item}
                </motion.div>
            ))}
        </motion.div>
    );
}
```

---

## Gestos e Interacciones

### 1. Hover (Pasar el Mouse)

```jsx
function HoverButton() {
    return (
        <motion.button
            // Estado normal (implícito)
            style={{
                padding: "10px 20px",
                backgroundColor: "blue",
                color: "white",
                border: "none",
                borderRadius: "5px",
            }}
            // Estado durante hover
            whileHover={{
                scale: 1.1, // Crece 10%
                backgroundColor: "#0066ff", // Cambia color
            }}
            // Configuración de la transición
            transition={{ type: "spring", stiffness: 300 }}
        >
            Pasa el mouse aquí
        </motion.button>
    );
}
```

### 2. Tap/Click

```jsx
function TapButton() {
    return (
        <motion.button
            style={{
                padding: "10px 20px",
                backgroundColor: "green",
            }}
            // Estado durante el tap/click
            whileTap={{
                scale: 0.9, // Se encoge ligeramente
                rotate: 5, // Rota un poco
            }}
        >
            Haz clic aquí
        </motion.button>
    );
}
```

### 3. Drag (Arrastrar)

```jsx
function DraggableBox() {
    return (
        <motion.div
            // Habilitar drag
            drag
            // Restricciones del drag (opcional)
            dragConstraints={{
                top: -50, // No puede ir más arriba de -50px
                left: -50, // No puede ir más a la izquierda de -50px
                right: 50, // No puede ir más a la derecha de 50px
                bottom: 50, // No puede ir más abajo de 50px
            }}
            // Elasticidad al llegar a los límites
            dragElastic={0.2}
            // Estado mientras se arrastra
            whileDrag={{
                scale: 1.1,
                cursor: "grabbing",
            }}
            style={{
                width: 100,
                height: 100,
                backgroundColor: "purple",
                borderRadius: "10px",
                cursor: "grab",
            }}
        >
            Arrástrarne
        </motion.div>
    );
}
```

**Opciones de Drag:**

-   `drag` - Permite arrastrar en todas direcciones
-   `drag="x"` - Solo horizontal
-   `drag="y"` - Solo vertical
-   `dragConstraints` - Límites del arrastre
-   `dragElastic` - Elasticidad (0 = rígido, 1 = muy elástico)

### 4. Drag con Referencia a Contenedor

```jsx
import { useRef } from "react";

function DragInContainer() {
    // Referencia al contenedor
    const constraintsRef = useRef(null);

    return (
        <div
            ref={constraintsRef}
            style={{
                width: 300,
                height: 300,
                backgroundColor: "#f0f0f0",
                position: "relative",
            }}
        >
            <motion.div
                drag
                // El elemento no puede salir del contenedor
                dragConstraints={constraintsRef}
                style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "orange",
                    borderRadius: "50%",
                }}
            >
                Drag
            </motion.div>
        </div>
    );
}
```

### 5. Combinando Gestos

```jsx
function InteractiveCard() {
    return (
        <motion.div
            // Hover
            whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}
            // Tap
            whileTap={{ scale: 0.95 }}
            // Drag
            drag
            dragConstraints={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
            style={{
                width: 200,
                height: 150,
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "20px",
            }}
        >
            <h3>Tarjeta Interactiva</h3>
            <p>Hover, click y arrastra</p>
        </motion.div>
    );
}
```

---

## Animaciones de Scroll

### 1. useScroll - Progreso de Scroll

```jsx
import { motion, useScroll } from "framer-motion";

function ScrollProgress() {
    // Hook que devuelve el progreso del scroll
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            style={{
                // Barra fija en la parte superior
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: "10px",
                backgroundColor: "blue",
                // scaleX se anima con el scroll (0 = 0%, 1 = 100%)
                scaleX: scrollYProgress,
                transformOrigin: "0%", // Crece desde la izquierda
            }}
        />
    );
}
```

**Explicación:**

-   `scrollYProgress` es un valor entre 0 y 1
-   0 = top de la página
-   1 = bottom de la página
-   Se actualiza automáticamente al hacer scroll

### 2. useTransform - Transformar Valores

```jsx
import { motion, useScroll, useTransform } from "framer-motion";

function ParallaxText() {
    const { scrollY } = useScroll();

    // Transformar el scroll en movimiento
    // Cuando scrollY va de 0 a 1000, y va de 0 a -500
    const y = useTransform(scrollY, [0, 1000], [0, -500]);

    return (
        <motion.div
            style={{
                y, // Aplicar la transformación
                fontSize: "48px",
                fontWeight: "bold",
            }}
        >
            Texto con Parallax
        </motion.div>
    );
}
```

### 3. whileInView - Animar al Entrar en Vista

```jsx
function ScrollReveal() {
    return (
        <motion.div
            // Estado inicial
            initial={{ opacity: 0, y: 50 }}
            // Animar cuando entra en el viewport
            whileInView={{ opacity: 1, y: 0 }}
            // Configuración
            viewport={{
                once: true, // Solo anima una vez
                amount: 0.3, // Cuándo activar (0.3 = 30% visible)
            }}
            transition={{ duration: 0.5 }}
        >
            Este elemento aparece al hacer scroll
        </motion.div>
    );
}
```

**Opciones de `viewport`:**

-   `once: true` - Anima solo la primera vez
-   `once: false` - Re-anima cada vez que entra/sale
-   `amount: 0.5` - 50% del elemento debe estar visible
-   `margin: "-100px"` - Offset desde el viewport

### 4. Parallax Completo

```jsx
import { motion, useScroll, useTransform } from "framer-motion";

function ParallaxSection() {
    const { scrollYProgress } = useScroll();

    // Diferentes velocidades de parallax
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]); // Lento
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]); // Medio
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]); // Fade out

    return (
        <div style={{ height: "200vh" }}>
            {/* Capa de fondo - se mueve lento */}
            <motion.div
                style={{
                    position: "fixed",
                    y: y1,
                    opacity,
                    fontSize: "100px",
                }}
            >
                🌄
            </motion.div>

            {/* Capa frontal - se mueve rápido */}
            <motion.div
                style={{
                    position: "fixed",
                    y: y2,
                    fontSize: "60px",
                }}
            >
                🚗
            </motion.div>
        </div>
    );
}
```

---

## Layout Animations

### 1. Layout Prop - Animación Automática

```jsx
import { useState } from "react";
import { motion } from "framer-motion";

function ExpandableCard() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            // Layout anima automáticamente los cambios de tamaño/posición
            layout
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
                width: isExpanded ? 300 : 200,
                height: isExpanded ? 400 : 100,
                backgroundColor: "lightblue",
                borderRadius: "10px",
                padding: "20px",
                cursor: "pointer",
            }}
        >
            <motion.h3 layout>Tarjeta Expandible</motion.h3>
            {isExpanded && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Contenido adicional que aparece al expandir
                </motion.p>
            )}
        </motion.div>
    );
}
```

**La prop `layout`:**

-   Detecta cambios en tamaño, posición
-   Anima automáticamente entre estados
-   Funciona con CSS, inline styles, classes

### 2. Shared Layout Animation

```jsx
import { useState } from "react";
import { motion } from "framer-motion";

function ToggleButton() {
    const [isOn, setIsOn] = useState(false);

    return (
        <div
            onClick={() => setIsOn(!isOn)}
            style={{
                width: 100,
                height: 50,
                backgroundColor: isOn ? "#00ff00" : "#ccc",
                borderRadius: 25,
                padding: 5,
                display: "flex",
                justifyContent: isOn ? "flex-end" : "flex-start",
                alignItems: "center",
                cursor: "pointer",
            }}
        >
            {/* El círculo se mueve suavemente */}
            <motion.div
                layout
                transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 30,
                }}
                style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "white",
                    borderRadius: "50%",
                }}
            />
        </div>
    );
}
```

### 3. Reordenar Lista

```jsx
import { useState } from "react";
import { motion } from "framer-motion";

function ReorderableList() {
    const [items, setItems] = useState([
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
    ]);

    const shuffle = () => {
        const newItems = [...items].sort(() => Math.random() - 0.5);
        setItems(newItems);
    };

    return (
        <div>
            <button onClick={shuffle}>Mezclar</button>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {items.map((item) => (
                    <motion.li
                        key={item}
                        layout // Anima la reordenación automáticamente
                        transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 25,
                        }}
                        style={{
                            padding: "10px",
                            margin: "5px 0",
                            backgroundColor: "#e0e0e0",
                            borderRadius: "5px",
                        }}
                    >
                        {item}
                    </motion.li>
                ))}
            </ul>
        </div>
    );
}
```

---

## AnimatePresence

### ¿Qué es AnimatePresence?

`AnimatePresence` permite animar componentes cuando son removidos del árbol de React. Sin esto, los componentes desaparecen inmediatamente sin animación.

### 1. Modal con AnimatePresence

```jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Modal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)}>Abrir Modal</button>

            {/* AnimatePresence permite animar la salida */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        // Animación de entrada
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        // Animación de salida (¡importante!)
                        exit={{ opacity: 0 }}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, y: -100 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.5, y: 100 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: "white",
                                padding: "40px",
                                borderRadius: "10px",
                                maxWidth: "500px",
                            }}
                        >
                            <h2>Modal</h2>
                            <p>Este es un modal animado</p>
                            <button onClick={() => setIsOpen(false)}>
                                Cerrar
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
```

### 2. Lista con Adición/Eliminación

```jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AnimatedList() {
    const [items, setItems] = useState([1, 2, 3]);

    const addItem = () => {
        setItems([...items, items.length + 1]);
    };

    const removeItem = (id) => {
        setItems(items.filter((item) => item !== id));
    };

    return (
        <div>
            <button onClick={addItem}>Agregar Item</button>

            <ul style={{ listStyle: "none", padding: 0 }}>
                <AnimatePresence>
                    {items.map((item) => (
                        <motion.li
                            key={item}
                            // Entrada desde la izquierda
                            initial={{ x: -100, opacity: 0 }}
                            // Posición normal
                            animate={{ x: 0, opacity: 1 }}
                            // Salida hacia la derecha
                            exit={{ x: 100, opacity: 0 }}
                            layout // Anima cuando otros items se mueven
                            style={{
                                padding: "10px",
                                margin: "5px 0",
                                backgroundColor: "#e0e0e0",
                                borderRadius: "5px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <span>Item {item}</span>
                            <button onClick={() => removeItem(item)}>
                                Eliminar
                            </button>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </div>
    );
}
```

### 3. Modo de Espera (Wait Mode)

```jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function SlideShow() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = ["🌟", "🎨", "🚀", "💎"];

    const next = () => {
        setCurrentSlide((currentSlide + 1) % slides.length);
    };

    return (
        <div>
            <div
                style={{
                    height: 200,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* mode="wait" espera a que salga antes de entrar el siguiente */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: "absolute",
                            fontSize: "100px",
                            width: "100%",
                            textAlign: "center",
                        }}
                    >
                        {slides[currentSlide]}
                    </motion.div>
                </AnimatePresence>
            </div>

            <button onClick={next}>Siguiente</button>
        </div>
    );
}
```

**Modos de AnimatePresence:**

-   `mode="sync"` (default) - Entrada y salida simultáneas
-   `mode="wait"` - Espera a que salga antes de entrar
-   `mode="popLayout"` - Mantiene el layout del elemento saliente

---

## Técnicas Avanzadas

### 1. Stagger Animation

```jsx
import { motion } from "framer-motion";

function StaggerList() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Cada hijo se retrasa 0.1s
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    const items = Array.from({ length: 5 }, (_, i) => `Item ${i + 1}`);

    return (
        <motion.ul
            variants={container}
            initial="hidden"
            animate="show"
            style={{ listStyle: "none", padding: 0 }}
        >
            {items.map((text, index) => (
                <motion.li
                    key={index}
                    variants={item}
                    style={{
                        padding: "10px",
                        margin: "5px 0",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "5px",
                    }}
                >
                    {text}
                </motion.li>
            ))}
        </motion.ul>
    );
}
```

### 2. SVG Path Animation

```jsx
import { motion } from "framer-motion";

function AnimatedSVG() {
    // Variants para el path
    const pathVariants = {
        hidden: {
            opacity: 0,
            pathLength: 0, // Longitud del trazo: 0 = nada dibujado
        },
        visible: {
            opacity: 1,
            pathLength: 1, // 1 = completamente dibujado
            transition: {
                duration: 2,
                ease: "easeInOut",
            },
        },
    };

    return (
        <svg width="200" height="200" viewBox="0 0 100 100">
            <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="#0055ff"
                strokeWidth="4"
                fill="transparent"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </svg>
    );
}
```

### 3. Custom Hook para Animaciones

```jsx
import { useAnimation } from "framer-motion";
import { useEffect } from "react";

// Hook personalizado
function useScrollAnimation() {
    const controls = useAnimation();

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            if (scrollY > 300) {
                controls.start({ opacity: 1, y: 0 });
            } else {
                controls.start({ opacity: 0, y: 50 });
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [controls]);

    return controls;
}

// Usar el hook
function ComponentWithCustomHook() {
    const controls = useScrollAnimation();

    return (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={controls}>
            Aparece al hacer scroll
        </motion.div>
    );
}
```

### 4. Animación con useMotionValue

```jsx
import { motion, useMotionValue, useTransform } from "framer-motion";

function MotionValueExample() {
    // Crear un valor de movimiento
    const x = useMotionValue(0);

    // Transformar el valor
    const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);
    const scale = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5]);

    return (
        <div style={{ padding: 100 }}>
            <motion.div
                drag="x"
                dragConstraints={{ left: -100, right: 100 }}
                style={{
                    x, // Conectar al drag
                    opacity, // Opacidad basada en posición
                    scale, // Escala basada en posición
                    width: 100,
                    height: 100,
                    backgroundColor: "purple",
                    borderRadius: "10px",
                }}
            >
                Arrástrarne
            </motion.div>
        </div>
    );
}
```

### 5. Secuencias de Animación

```jsx
import { motion } from "framer-motion";

function SequenceAnimation() {
    return (
        <motion.div
            style={{
                width: 100,
                height: 100,
                backgroundColor: "red",
                borderRadius: "10px",
            }}
            animate={{
                // Secuencia de transformaciones
                x: [0, 100, 100, 0, 0], // Posiciones X
                y: [0, 0, 100, 100, 0], // Posiciones Y
                rotate: [0, 0, 90, 180, 0], // Rotaciones
                borderRadius: ["10%", "50%", "10%", "50%", "10%"],
            }}
            transition={{
                duration: 3,
                times: [0, 0.25, 0.5, 0.75, 1], // Timing de cada keyframe
                repeat: Infinity, // Repetir infinitamente
                repeatDelay: 1, // Pausa entre repeticiones
            }}
        />
    );
}
```

---

## Optimización de Performance

### 1. Usar `layoutId` para Shared Layout

```jsx
import { useState } from "react";
import { motion } from "framer-motion";

function SharedLayoutExample() {
    const [selected, setSelected] = useState("item1");

    return (
        <div style={{ display: "flex", gap: 10 }}>
            {["item1", "item2", "item3"].map((item) => (
                <div
                    key={item}
                    onClick={() => setSelected(item)}
                    style={{
                        padding: 20,
                        position: "relative",
                        cursor: "pointer",
                    }}
                >
                    {item}
                    {/* layoutId hace que el elemento se mueva suavemente */}
                    {selected === item && (
                        <motion.div
                            layoutId="underline"
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 3,
                                backgroundColor: "blue",
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
```

### 2. Usar `transformTemplate` para Optimización

```jsx
function OptimizedAnimation() {
    return (
        <motion.div
            animate={{ x: 100 }}
            // Forzar uso de transform (más eficiente que left/top)
            transformTemplate={({ x, y }) => `translate(${x}, ${y})`}
        />
    );
}
```

### 3. Reducir Re-renders con useMemo

```jsx
import { useMemo } from "react";
import { motion } from "framer-motion";

function OptimizedList({ items }) {
    // Memoizar variants para evitar recrearlos
    const variants = useMemo(
        () => ({
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
            },
        }),
        []
    );

    return (
        <motion.ul variants={variants} initial="hidden" animate="visible">
            {items.map((item) => (
                <motion.li key={item.id} variants={variants}>
                    {item.text}
                </motion.li>
            ))}
        </motion.ul>
    );
}
```

### 4. Propiedades Optimizadas

```jsx
// ❌ EVITAR - Anima propiedades que causan reflow
<motion.div animate={{ width: 100, height: 100, top: 50 }} />

// ✅ PREFERIR - Usa transform (GPU-acelerado)
<motion.div animate={{ scale: 1.5, x: 50, y: 50 }} />
```

**Propiedades Optimizadas (GPU):**

-   `x`, `y`
-   `scale`, `scaleX`, `scaleY`
-   `rotate`, `rotateX`, `rotateY`
-   `opacity`

**Propiedades No Optimizadas (evitar si es posible):**

-   `width`, `height`
-   `top`, `left`, `right`, `bottom`
-   `margin`, `padding`

### 5. Usar `will-change` CSS

```jsx
function OptimizedComponent() {
    return (
        <motion.div
            animate={{ x: 100 }}
            style={{
                // Avisa al navegador que esta propiedad cambiará
                willChange: "transform",
            }}
        />
    );
}
```

---

## Consejos y Mejores Prácticas

### 1. Usar Variants para Reutilización

```jsx
// ❌ Repetitivo
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />

// ✅ Reutilizable
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

<motion.div variants={fadeIn} initial="hidden" animate="visible" />
<motion.div variants={fadeIn} initial="hidden" animate="visible" />
```

### 2. Mantener Animaciones Cortas

```jsx
// ❌ Muy larga, frustra al usuario
<motion.div transition={{ duration: 3 }} />

// ✅ Rápida y fluida
<motion.div transition={{ duration: 0.3 }} />
```

**Duraciones Recomendadas:**

-   Micro-interacciones: 0.1-0.2s
-   Transiciones simples: 0.3-0.5s
-   Animaciones complejas: 0.5-1s
-   Nunca más de 2s sin razón específica

### 3. Usar Spring para Naturalidad

```jsx
// Type "spring" se siente más natural
<motion.div
    transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
    }}
/>
```

### 4. Seguir Principios de Accesibilidad

```jsx
import { useReducedMotion } from "framer-motion";

function AccessibleAnimation() {
    // Detecta si el usuario prefiere movimiento reducido
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
            }}
        >
            Contenido accesible
        </motion.div>
    );
}
```

---

## Recursos Adicionales

### Documentación Oficial

-   [Framer Motion Docs](https://www.framer.com/motion/)
-   [API Reference](https://www.framer.com/motion/component/)

### Ejemplos Interactivos

-   [Framer Motion Examples](https://www.framer.com/motion/examples/)

### Comunidad

-   [GitHub](https://github.com/framer/motion)
-   [Discord](https://discord.gg/framer)

---

## Resumen de Conceptos Clave

1. **motion.div**: Convierte elementos HTML en animables
2. **initial/animate/exit**: Estados de animación
3. **variants**: Definiciones reutilizables de estados
4. **gestos**: whileHover, whileTap, drag
5. **scroll**: useScroll, useTransform, whileInView
6. **layout**: Anima cambios de tamaño/posición automáticamente
7. **AnimatePresence**: Permite animar la salida de componentes
8. **Performance**: Usa transform y opacity para mejor rendimiento

---

¡Con esta guía tienes todo lo necesario para empezar a crear animaciones increíbles con Framer Motion! 🚀
