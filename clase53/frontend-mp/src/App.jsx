// ============================================
// COMPONENTE PRINCIPAL - TIENDA ONLINE
// ============================================
// Este archivo contiene el componente React principal de nuestra tienda online
// React es una biblioteca de JavaScript para crear interfaces de usuario (UI)
// Un "componente" es como una pieza reutilizable de la interfaz

// ============================================
// PASO 1: IMPORTAR DEPENDENCIAS
// ============================================

// useState y useEffect son "hooks" de React
// Los hooks son funciones especiales que nos permiten usar características de React
// - useState: Nos permite crear "estado" (variables que cuando cambian, actualizan la interfaz)
// - useEffect: Nos permite ejecutar código cuando el componente se monta o actualiza
import { useState, useEffect } from "react";

// Importar el archivo CSS que contiene los estilos visuales de nuestra tienda
import "./App.css";

// ============================================
// COMPONENTE: App
// ============================================
// export default: Hace que este componente pueda ser importado en otros archivos
// function App(): Define una función que devuelve JSX (HTML dentro de JavaScript)
export default function App() {

    // ============================================
    // PASO 2: DEFINIR ESTADOS DEL COMPONENTE
    // ============================================
    // Los estados son variables especiales en React que:
    // 1. Guardan información
    // 2. Cuando cambian, React re-renderiza (vuelve a dibujar) la interfaz automáticamente

    // ESTADO 1: products
    // useState([]) crea una variable de estado inicializada como array vacío []
    // - products: La variable que contiene el array de productos
    // - setProducts: Función para modificar el valor de "products"
    // ¿Por qué array vacío []? Porque al inicio no tenemos productos, los cargaremos del backend
    const [products, setProducts] = useState([]);

    // ESTADO 2: loading
    // Indica si estamos cargando los productos del backend
    // - true: Estamos cargando (mostramos "Cargando productos...")
    // - false: Ya terminamos de cargar (mostramos los productos)
    // Inicia en "true" porque al cargar la página, inmediatamente comenzamos a obtener productos
    const [loading, setLoading] = useState(true);

    // ESTADO 3: purchasingId
    // Guarda el ID del producto que se está comprando en este momento
    // - null: No se está comprando nada
    // - Un número (ej: 3): Se está comprando el producto con ID 3
    // Usamos esto para:
    //   1. Deshabilitar el botón del producto que se está comprando
    //   2. Mostrar "Procesando..." en lugar de "Comprar"
    const [purchasingId, setPurchasingId] = useState(null);

    // ============================================
    // PASO 3: EFECTO PARA CARGAR PRODUCTOS
    // ============================================
    // useEffect es un hook que ejecuta código en momentos específicos
    // Sintaxis: useEffect(función, dependencias)
    //   - función: El código que queremos ejecutar
    //   - dependencias ([]): Cuándo ejecutar la función

    // En este caso, [] (array vacío) significa:
    // "Ejecuta esta función UNA SOLA VEZ cuando el componente se monte (aparezca en pantalla)"
    // Si no pusieramos [], se ejecutaría en cada re-renderizado (infinitas veces)
    useEffect(() => {
        // Llamar a la función que obtiene los productos
        fetchProducts();
    }, []); // <- Array vacío = solo al montar

    // ============================================
    // FUNCIÓN: fetchProducts
    // ============================================
    // Esta función obtiene los productos desde nuestro backend
    // async: Indica que la función es asíncrona (puede usar "await" para esperar respuestas)
    const fetchProducts = async () => {
        // try-catch: Maneja errores posibles
        // Si algo falla en "try", el código salta a "catch"
        try {
            // PASO 1: Hacer una petición HTTP GET al backend
            // fetch(): Función nativa de JavaScript para hacer peticiones HTTP
            // "http://localhost:3000/products": La URL del endpoint del backend
            // await: Espera a que el backend responda antes de continuar
            // Resultado: Un objeto "Response" con la respuesta del servidor
            const res = await fetch("http://localhost:3000/products");

            // PASO 2: Convertir la respuesta a formato JSON
            // res.json(): Convierte el texto de la respuesta en un objeto JavaScript
            // await: Espera a que la conversión termine
            // Resultado: Un objeto como { success: true, products: [...] }
            const data = await res.json();

            // PASO 3: Verificar si la petición fue exitosa
            // data.success viene del backend (ver server.js)
            // Si es true, significa que todo salió bien
            if (data.success) {
                // Actualizar el estado "products" con los productos recibidos
                // setProducts() le dice a React: "Cambia products a este nuevo valor"
                // React detecta el cambio y re-renderiza el componente mostrando los productos
                setProducts(data.products);
            }

        } catch (error) {
            // Este bloque se ejecuta si hubo ALGÚN error:
            // - El backend no está corriendo
            // - No hay conexión a internet
            // - La URL es incorrecta
            // - etc.

            // Mostrar el error en la consola del navegador (para desarrolladores)
            console.error("Error al obtener productos:", error);

            // Mostrar un mensaje de error al usuario
            alert("Error al cargar productos");

        } finally {
            // finally: Este bloque SIEMPRE se ejecuta, haya error o no
            // Es perfecto para código de "limpieza" o finalización

            // Cambiar loading a false para indicar que terminamos de cargar
            // Esto hace que React deje de mostrar "Cargando productos..." 
            // y muestre la tienda (o un mensaje si no hay productos)
            setLoading(false);
        }
    };

    // ============================================
    // FUNCIÓN: handlePurchase
    // ============================================
    // Esta función se ejecuta cuando el usuario hace clic en "Comprar"
    // Recibe como parámetro el objeto del producto que se quiere comprar
    const handlePurchase = async (product) => {

        // PASO 1: Marcar el producto como "comprando"
        // Guardamos el ID del producto en el estado purchasingId
        // Esto hará que:
        //   1. El botón de este producto se deshabilite
        //   2. El texto cambie de "Comprar" a "Procesando..."
        setPurchasingId(product.id);

        try {
            // PASO 2: Crear una preferencia de pago en el backend
            // fetch() con configuración personalizada:
            const res = await fetch("http://localhost:3000/create_preference", {
                // method: "POST": Indica que enviamos datos (no solo pedimos, como en GET)
                method: "POST",

                // headers: Información adicional sobre la petición
                // "Content-Type": "application/json" le dice al servidor:
                // "Los datos que te estoy enviando están en formato JSON"
                headers: { "Content-Type": "application/json" },

                // body: Los datos que enviamos al servidor
                // JSON.stringify(): Convierte un objeto JavaScript a texto JSON
                // Enviamos un objeto con un array "items" que contiene el producto a comprar
                body: JSON.stringify({
                    items: [
                        {
                            title: product.name,       // Nombre del producto
                            quantity: 1,               // Cantidad: siempre 1 por ahora
                            unit_price: product.price, // Precio del producto
                        },
                    ],
                }),
            });

            // PASO 3: Obtener la respuesta del backend
            // Convertir la respuesta a formato JSON
            const data = await res.json();

            // PASO 4: Verificar si se creó la preferencia correctamente
            // Verificamos DOS cosas:
            // 1. data.success === true: El backend procesó correctamente
            // 2. data.preference?.init_point existe: Hay una URL de pago
            //    El "?" es el operador opcional chaining: si preference es null/undefined, 
            //    no intenta acceder a init_point (evita errores)
            if (data.success && data.preference?.init_point) {

                // Si todo está bien, REDIRIGIR al usuario a MercadoPago
                // window.location.href: Cambia la URL del navegador (navega a otra página)
                // init_point: Es la URL de pago que nos dio MercadoPago
                // Ejemplo: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=123456"
                window.location.href = data.preference.init_point;

                // IMPORTANTE: Después de esta línea, el usuario ya no estará en nuestra página
                // Estará en la página de MercadoPago completando el pago

            } else {
                // Si no se pudo crear la preferencia, mostrar error
                alert("Error al crear la preferencia de pago");
            }

        } catch (error) {
            // Este bloque se ejecuta si hubo algún error:
            // - El backend no responde
            // - Problemas de red
            // - Error en el formato de datos
            // - etc.

            // Mostrar el error en la consola (para desarrolladores)
            console.error("Error al procesar la compra:", error);

            // Mostrar mensaje de error al usuario
            alert("Error al conectar con el servidor");

        } finally {
            // Este bloque SIEMPRE se ejecuta al final

            // Limpiar el estado: ya no estamos "comprando" ningún producto
            // Esto vuelve a habilitar el botón y cambia el texto a "Comprar"
            setPurchasingId(null);
        }
    };

    // ============================================
    // RENDERIZADO CONDICIONAL: PANTALLA DE CARGA
    // ============================================
    // Este "if" verifica si todavía estamos cargando productos
    // Si loading === true, mostramos un mensaje de carga
    // Si loading === false, saltamos este bloque y mostramos la tienda
    if (loading) {
        // return: Termina la función y devuelve este JSX
        // JSX es una sintaxis que parece HTML pero es JavaScript
        return (
            <div className="container">
                <div className="loading">Cargando productos...</div>
            </div>
        );
        // Cuando se ejecuta este return, el código que está más abajo NO se ejecuta
    }

    // ============================================
    // RENDERIZADO PRINCIPAL: LA TIENDA
    // ============================================
    // Si llegamos aquí, significa que loading === false
    // Ya terminamos de cargar los productos, así que mostramos la tienda

    return (
        // className="container": Aplica estilos CSS de la clase "container"
        <div className="container">

            {/* ========================================== */}
            {/* SECCIÓN 1: ENCABEZADO DE LA TIENDA */}
            {/* ========================================== */}
            {/* Los comentarios en JSX se escriben así: {/* ... */}
            <header className="header">
                <h1>🛒 Mi Tienda Online</h1>
                <p>Compra segura con MercadoPago</p>
            </header>

            {/* ========================================== */}
            {/* SECCIÓN 2: GRID DE PRODUCTOS */}
            {/* ========================================== */}
            {/* Este div contendrá todas las tarjetas de productos */}
            {/* El CSS de "products-grid" usa flexbox para disponerlos en filas */}
            <div className="products-grid">

                {/* ========================================== */}
                {/* ITERAR SOBRE LOS PRODUCTOS */}
                {/* ========================================== */}
                {/* .map() es una función que itera (recorre) el array de productos
                    Por cada producto en el array, ejecuta una función que devuelve JSX
                    Ejemplo: si products = [producto1, producto2, producto3]
                    entonces map() creará 3 tarjetas (una por cada producto) */}

                {products.map((product) => (

                    // Cada producto se renderiza como una tarjeta
                    // key={product.id}: React necesita un "key" único para cada elemento de una lista
                    // Esto ayuda a React a identificar qué elementos cambiaron, se agregaron o eliminaron
                    // IMPORTANTE: El key debe ser único y estable (el ID es perfecto)
                    <div key={product.id} className="product-card">

                        {/* ========================================== */}
                        {/* PARTE 1: IMAGEN DEL PRODUCTO */}
                        {/* ========================================== */}
                        <div className="product-image-wrapper">
                            {/* Imagen del producto */}
                            <img
                                src={product.image}       // URL de la imagen
                                alt={product.name}        // Texto alternativo (accesibilidad y SEO)
                                className="product-image"
                            />

                            {/* Badge de categoría (etiqueta flotante sobre la imagen) */}
                            {/* {product.category}: Inserta el valor de product.category en el HTML */}
                            {/* Ejemplo: si category = "Ropa", muestra "Ropa" */}
                            <span className="product-category">{product.category}</span>
                        </div>

                        {/* ========================================== */}
                        {/* PARTE 2: INFORMACIÓN DEL PRODUCTO */}
                        {/* ========================================== */}
                        <div className="product-info">

                            {/* Nombre del producto */}
                            <h3 className="product-name">{product.name}</h3>

                            {/* Descripción del producto */}
                            <p className="product-description">{product.description}</p>

                            {/* ========================================== */}
                            {/* PARTE 3: PRECIO Y BOTÓN */}
                            {/* ========================================== */}
                            <div className="product-footer">

                                {/* PRECIO */}
                                {/* toLocaleString("es-AR"): Formatea el número para Argentina
                                    Ejemplo: 2500 → "2.500" (con punto para miles)
                                    El símbolo $ lo agregamos manualmente */}
                                <span className="product-price">
                                    ${product.price.toLocaleString("es-AR")}
                                </span>

                                {/* BOTÓN DE COMPRA */}
                                <button
                                    className="buy-button"

                                    // onClick: Evento que se dispara cuando se hace clic
                                    // () => handlePurchase(product): Función flecha que llama a handlePurchase
                                    // Pasamos el objeto "product" completo como argumento
                                    onClick={() => handlePurchase(product)}

                                    // disabled: Si es true, el botón se deshabilita (no se puede hacer clic)
                                    // purchasingId === product.id: Compara si el ID del producto que se está comprando
                                    // es igual al ID de ESTE producto
                                    // Si es igual → disabled = true (botón deshabilitado)
                                    // Si es diferente → disabled = false (botón habilitado)
                                    disabled={purchasingId === product.id}
                                >
                                    {/* TEXTO DEL BOTÓN (CONDICIONAL) */}
                                    {/* Operador ternario: condición ? valorSiTrue : valorSiFalse
                                        Si purchasingId === product.id (este producto se está comprando):
                                          Mostrar "Procesando..."
                                        Si no:
                                          Mostrar "Comprar" */}
                                    {purchasingId === product.id ? "Procesando..." : "Comprar"}
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
                {/* Fin del .map() - se repitió este bloque por cada producto */}

            </div>
        </div>
    );
}

// ============================================
// RESUMEN DE CÓMO FUNCIONA TODO:
// ============================================
// 1. El componente se monta (aparece en pantalla)
// 2. useEffect() se ejecuta y llama a fetchProducts()
// 3. fetchProducts() pide los productos al backend
// 4. Mientras espera, loading = true, mostramos "Cargando productos..."
// 5. El backend responde con los productos
// 6. Actualizamos products con setProducts()
// 7. Cambiamos loading a false con setLoading(false)
// 8. React detecta los cambios y re-renderiza el componente
// 9. Ahora mostramos la tienda con todos los productos en tarjetas
// 10. Cuando el usuario hace clic en "Comprar":
//     - Marcamos el producto como "comprando" (purchasingId = product.id)
//     - El botón se deshabilita y muestra "Procesando..."
//     - Enviamos la petición al backend para crear la preferencia
//     - El backend nos devuelve la URL de pago de MercadoPago
//     - Redirigimos al usuario a MercadoPago
//     - El usuario completa el pago en MercadoPago
//     - MercadoPago redirige al usuario a /success, /failure o /pending
