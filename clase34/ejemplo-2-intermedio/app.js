/**
 * ========================================================================
 * SPA INTERMEDIA CON HISTORY API
 * ========================================================================
 * 
 * Este ejemplo demuestra una implementación más avanzada de SPA utilizando
 * la History API del navegador. Esta técnica permite crear URLs más limpias
 * y profesionales sin el símbolo '#'.
 * 
 * CONCEPTOS CLAVE:
 * - History API: Interfaz moderna para manipular el historial del navegador
 * - pushState(): Método para cambiar la URL sin recargar la página
 * - popstate Event: Evento que se dispara al navegar con back/forward
 * - Clean URLs: URLs sin hash que parecen rutas tradicionales del servidor
 * 
 * VENTAJAS DE HISTORY API:
 * ✅ URLs limpias y profesionales (/home, /products, /profile)
 * ✅ Mejor para SEO (con configuración del servidor)
 * ✅ Experiencia de usuario más natural
 * ✅ Compatible con aplicaciones server-side rendering
 * ✅ Permite pasar estado personalizado entre navegaciones
 * 
 * DESVENTAJAS:
 * ❌ Requiere configuración del servidor (fallback a index.html)
 * ❌ No funciona con file:// protocol
 * ❌ Más complejo de implementar que hash routing
 * ❌ Requiere manejo de errores 404 del servidor
 * 
 * REQUISITOS DEL SERVIDOR:
 * Para que funcione correctamente, el servidor debe estar configurado para
 * servir index.html para todas las rutas que no correspondan a archivos físicos.
 */

class HistoryRouter {
    constructor() {
        /**
         * ESTRUCTURA DE DATOS: ROUTES
         * ============================
         * Similar al hash routing, pero usando paths completos como claves:
         * {
         *   '/home': function() { console.log('En inicio'); },
         *   '/products': function() { console.log('En productos'); },
         *   '/profile': function() { console.log('En perfil'); }
         * }
         * 
         * DIFERENCIA CON HASH ROUTING:
         * - Hash: usa 'home', 'about', 'contact' como claves
         * - History: usa '/home', '/about', '/contact' como claves
         */
        this.routes = {};
        
        /**
         * INICIALIZACIÓN AUTOMÁTICA
         * =========================
         * Al igual que en hash routing, inicializamos automáticamente
         * para configurar event listeners y procesar la ruta inicial.
         */
        this.init();
    }

    /**
     * REGISTRO DE RUTAS
     * =================
     * Registra una nueva ruta con su callback correspondiente.
     * 
     * @param {string} path - La ruta completa (ej: '/home', '/products', '/profile')
     * @param {function} callback - Función que se ejecuta al navegar a esta ruta
     * 
     * IMPORTANTE: Los paths deben empezar con '/' para mantener consistencia
     * con la estructura de URLs del navegador.
     */
    addRoute(path, callback) {
        // Almacenamos la relación path -> callback
        this.routes[path] = callback;
    }

    /**
     * INICIALIZACIÓN DEL ROUTER
     * =========================
     * Configura los event listeners específicos para History API
     * y procesa la ruta inicial.
     */
    init() {
        /**
         * EVENT LISTENER: popstate
         * ========================
         * El evento 'popstate' es el equivalente de 'hashchange' para History API.
         * Se dispara cuando:
         * - El usuario hace clic en los botones back/forward del navegador
         * - Se llama a history.back(), history.forward(), o history.go()
         * 
         * IMPORTANTE: NO se dispara cuando se llama a history.pushState()
         * o history.replaceState(). Esto es diferente al comportamiento de hashchange.
         * 
         * PARÁMETRO event.state:
         * Contiene el objeto de estado que se pasó a pushState(). Puede ser null
         * si no se pasó estado o si la entrada del historial se creó por navegación normal.
         */
        window.addEventListener('popstate', (event) => {
            // Logging para debugging - muy útil para entender el flujo
            console.log('🔄 PopState event:', event.state);
            
            /**
             * MANEJO DE LA NUEVA RUTA
             * =======================
             * Cuando el usuario navega con back/forward, procesamos la nueva ruta
             * basándonos en location.pathname (no en hash como en el ejemplo anterior).
             */
            this.handleRoute(location.pathname);
        });

        /**
         * PROCESAMIENTO DE RUTA INICIAL
         * =============================
         * Al cargar la página, no se dispara popstate, por lo que debemos
         * procesar manualmente la ruta inicial basada en location.pathname.
         */
        this.handleRoute(location.pathname);
    }

    /**
     * NAVEGACIÓN PROGRAMÁTICA
     * =======================
     * Este método permite navegar a una nueva ruta desde JavaScript,
     * similar a hacer clic en un enlace pero de forma programática.
     * 
     * @param {string} path - La ruta de destino (ej: '/home', '/products')
     * @param {object} data - Objeto de estado opcional para pasar información
     * 
     * DIFERENCIAS CON HASH ROUTING:
     * - Hash: location.hash = 'nueva-ruta'
     * - History: history.pushState() + handleRoute()
     */
    navigate(path, data = {}) {
        /**
         * HISTORY.PUSHSTATE()
         * ===================
         * Este es el método clave de la History API. Permite cambiar la URL
         * sin recargar la página y agregar una nueva entrada al historial.
         * 
         * PARÁMETROS:
         * 1. state (object): Datos que se pueden recuperar con event.state en popstate
         * 2. title (string): Título de la página (actualmente ignorado por navegadores)
         * 3. url (string): Nueva URL que se mostrará en la barra de direcciones
         * 
         * IMPORTANTE: pushState NO dispara el evento popstate, por eso debemos
         * llamar manualmente a handleRoute() después.
         */
        history.pushState(data, '', path);
        
        /**
         * PROCESAMIENTO MANUAL DE LA RUTA
         * ===============================
         * Como pushState no dispara popstate, debemos procesar manualmente
         * la nueva ruta para actualizar la interfaz.
         */
        this.handleRoute(path);
    }

    /**
     * MANEJADOR PRINCIPAL DE RUTAS
     * ============================
     * Procesa una ruta específica y actualiza la interfaz de usuario.
     * Es más complejo que el hash routing porque maneja paths completos.
     * 
     * @param {string} path - La ruta a procesar (ej: '/home', '/products', '/')
     */
    handleRoute(path) {
        /**
         * ACTUALIZACIÓN DE INFORMACIÓN DE URL
         * ===================================
         * Actualizamos elementos de la interfaz que muestran información
         * sobre la URL actual. Esto es útil para debugging y educación.
         */
        this.updateUrlInfo();

        /**
         * NORMALIZACIÓN DE RUTAS
         * ======================
         * Convertimos rutas especiales a rutas estándar:
         * - '/' (raíz) se convierte en '/home'
         * - Otras rutas se mantienen igual
         * 
         * RAZÓN: Queremos que la página raíz muestre el contenido de home
         * pero manteniendo la flexibilidad de tener una ruta específica '/home'.
         */
        const cleanPath = path === '/' ? '/home' : path;
        
        /**
         * EXTRACCIÓN DE CLAVE DE RUTA
         * ===========================
         * Convertimos el path a una clave para buscar elementos del DOM:
         * '/home' → 'home'
         * '/products' → 'products'
         * '/profile' → 'profile'
         * 
         * Esto nos permite usar IDs de elementos HTML que coincidan con las rutas.
         */
        const routeKey = cleanPath.replace('/', '');

        /**
         * OCULTACIÓN DE TODAS LAS PÁGINAS
         * ===============================
         * Antes de mostrar la página actual, ocultamos todas las demás.
         * Mismo patrón que en hash routing.
         */
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        /**
         * ACTUALIZACIÓN DE NAVEGACIÓN VISUAL
         * ==================================
         * Removemos la clase 'active' de todos los botones de navegación
         * para luego marcar solo el botón correspondiente a la ruta actual.
         * 
         * NOTA: En este ejemplo usamos botones en lugar de enlaces <a>
         * para demostrar navegación programática.
         */
        document.querySelectorAll('nav button').forEach(btn => {
            btn.classList.remove('active');
        });

        /**
         * MOSTRAR PÁGINA ACTUAL
         * =====================
         * Buscamos y mostramos la página correspondiente a la ruta actual.
         */
        const currentPage = document.getElementById(routeKey);
        if (currentPage) {
            // Mostrar la página agregando la clase 'active'
            currentPage.classList.add('active');
            
            /**
             * MARCAR BOTÓN ACTIVO
             * ===================
             * Buscamos el botón que corresponde a esta ruta y lo marcamos como activo.
             * Usamos un selector específico que busca botones con onclick que llama
             * a navigateTo() con el path correspondiente.
             */
            const activeButton = document.querySelector(`button[onclick="navigateTo('${cleanPath}')"]`);
            if (activeButton) {
                activeButton.classList.add('active');
            }
        }

        /**
         * EJECUCIÓN DE CALLBACKS
         * ======================
         * Si existe un callback registrado para esta ruta, lo ejecutamos.
         * Esto permite lógica específica por ruta.
         */
        if (this.routes[cleanPath]) {
            this.routes[cleanPath]();
        }
    }

    /**
     * ACTUALIZACIÓN DE INFORMACIÓN DE URL
     * ===================================
     * Actualiza elementos de la interfaz que muestran información sobre la URL actual.
     * Esto es educativo y útil para debugging.
     */
    updateUrlInfo() {
        /**
         * ACTUALIZACIÓN DE URL COMPLETA
         * =============================
         * Mostramos la URL completa incluyendo protocolo, dominio y path.
         * Útil para ver cómo cambia la URL con cada navegación.
         */
        const urlElement = document.getElementById('current-url');
        if (urlElement) {
            urlElement.textContent = location.href;
        }
        
        /**
         * ACTUALIZACIÓN DE PATH
         * =====================
         * Mostramos solo el pathname, que es la parte que realmente cambia
         * en una SPA con History API.
         */
        const pathElement = document.getElementById('current-path');
        if (pathElement) {
            pathElement.textContent = location.pathname;
        }
    }
}

/**
 * ========================================================================
 * INSTANCIACIÓN Y CONFIGURACIÓN DEL ROUTER
 * ========================================================================
 */

/**
 * CREACIÓN DE LA INSTANCIA DEL ROUTER
 * ===================================
 * Creamos una instancia global del HistoryRouter. A diferencia del hash routing,
 * este router maneja URLs completas y requiere configuración del servidor.
 */
const router = new HistoryRouter();

/**
 * ========================================================================
 * REGISTRO DE RUTAS DE LA APLICACIÓN
 * ========================================================================
 * 
 * Definimos las rutas disponibles usando paths completos que empiezan con '/'.
 * Cada ruta puede tener lógica específica en su callback.
 */

/**
 * RUTA: /home (INICIO)
 * ====================
 * Ruta principal de la aplicación. Se activa cuando:
 * - La URL es: dominio.com/home
 * - La URL es: dominio.com/ (se normaliza a /home)
 * - El usuario navega programáticamente a '/home'
 */
router.addRoute('/home', () => {
    // Logging para seguimiento de navegación
    console.log('📍 Cargando: Inicio');
    
    /**
     * LÓGICA ESPECÍFICA PARA HOME:
     * - Cargar datos del dashboard
     * - Mostrar estadísticas recientes
     * - Inicializar widgets de la página principal
     * - Enviar analytics de página vista
     * 
     * Ejemplo de implementación:
     * loadDashboardStats();
     * initializeHomeWidgets();
     * trackPageView('home');
     */
});

/**
 * RUTA: /products (PRODUCTOS)
 * ===========================
 * Ruta para mostrar el catálogo de productos.
 * Demuestra cómo manejar rutas de contenido dinámico.
 */
router.addRoute('/products', () => {
    // Logging para debugging
    console.log('📍 Cargando: Productos');
    
    /**
     * LÓGICA ESPECÍFICA PARA PRODUCTOS:
     * - Cargar lista de productos desde API
     * - Inicializar filtros y búsqueda
     * - Configurar paginación
     * - Manejar favoritos del usuario
     * 
     * Ejemplo de implementación:
     * async function loadProducts() {
     *   const products = await fetch('/api/products').then(r => r.json());
     *   renderProductList(products);
     *   initializeFilters();
     *   setupPagination();
     * }
     * loadProducts();
     */
});

/**
 * RUTA: /profile (PERFIL)
 * =======================
 * Ruta para el perfil del usuario. Demuestra cómo actualizar
 * contenido específico cuando se navega a una ruta.
 */
router.addRoute('/profile', () => {
    // Logging para debugging
    console.log('📍 Cargando: Perfil');
    
    /**
     * ACTUALIZACIÓN DE ÚLTIMA VISITA
     * ==============================
     * Ejemplo práctico de cómo ejecutar lógica específica al navegar.
     * Actualizamos un elemento que muestra cuándo fue la última visita.
     */
    const lastVisitElement = document.getElementById('last-visit');
    if (lastVisitElement) {
        // Mostrar la fecha y hora actual formateada según la configuración local
        lastVisitElement.textContent = new Date().toLocaleString();
    }
    
    /**
     * OTRAS ACCIONES TÍPICAS EN PERFIL:
     * - Cargar datos del usuario desde API
     * - Verificar autenticación
     * - Cargar preferencias del usuario
     * - Inicializar formularios de edición
     * 
     * Ejemplo de implementación:
     * async function loadUserProfile() {
     *   if (!isAuthenticated()) {
     *     router.navigate('/login');
     *     return;
     *   }
     *   const user = await fetchUserData();
     *   renderUserProfile(user);
     *   initializeProfileForms();
     * }
     * loadUserProfile();
     */
});

/**
 * ========================================================================
 * FUNCIÓN GLOBAL DE NAVEGACIÓN
 * ========================================================================
 * 
 * Esta función puede ser llamada desde el HTML o desde JavaScript
 * para navegar programáticamente entre rutas.
 */

/**
 * NAVEGACIÓN PROGRAMÁTICA GLOBAL
 * ==============================
 * Función que puede ser llamada desde onclick en HTML o desde JavaScript.
 * 
 * @param {string} path - La ruta de destino (ej: '/home', '/products')
 * 
 * EJEMPLO DE USO EN HTML:
 * <button onclick="navigateTo('/products')">Ver Productos</button>
 * 
 * EJEMPLO DE USO EN JS:
 * navigateTo('/profile');
 */
function navigateTo(path) {
    /**
     * NAVEGACIÓN CON ESTADO
     * =====================
     * Pasamos un timestamp como estado para demostrar cómo se puede
     * incluir información adicional en la navegación.
     * 
     * Este estado estará disponible en event.state cuando el usuario
     * use los botones back/forward del navegador.
     */
    router.navigate(path, { 
        timestamp: Date.now(),
        // Podríamos agregar más información útil:
        // userAgent: navigator.userAgent,
        // referrer: document.referrer,
        // scrollPosition: window.scrollY
    });
}

/**
 * ========================================================================
 * DEMOSTRACIÓN DE LA HISTORY API
 * ========================================================================
 * 
 * La History API proporciona métodos y propiedades para manipular
 * el historial del navegador de forma programática.
 */

console.log('🌐 History API Info:');
console.log('=====================================');

/**
 * history.length
 * ==============
 * Devuelve el número de entradas en el historial de la sesión actual.
 * 
 * IMPORTANTE: Este número incluye:
 * - La página actual
 * - Todas las páginas visitadas en esta pestaña/ventana
 * - Páginas agregadas con pushState()
 * 
 * LIMITACIONES:
 * - No incluye el historial completo del navegador
 * - Se reinicia cuando se abre una nueva pestaña
 * - Puede variar entre navegadores
 */
console.log('- history.length:', history.length);

/**
 * location.pathname
 * =================
 * En History API, el pathname es la parte más importante de la URL
 * porque es lo que cambia cuando navegamos entre rutas.
 * 
 * EJEMPLOS:
 * - "/home" para https://example.com/home
 * - "/products" para https://example.com/products
 * - "/" para https://example.com/
 * 
 * DIFERENCIA CON HASH ROUTING:
 * - Hash: location.pathname siempre es igual (ej: "/index.html")
 * - History: location.pathname cambia con cada ruta (ej: "/home", "/products")
 */
console.log('- location.pathname:', location.pathname);

/**
 * OTROS MÉTODOS ÚTILES DE HISTORY API:
 * ====================================
 * 
 * history.pushState(state, title, url)
 * - Agrega nueva entrada al historial
 * - Cambia la URL sin recargar
 * - NO dispara popstate
 * 
 * history.replaceState(state, title, url)
 * - Reemplaza la entrada actual del historial
 * - Útil para corregir URLs o actualizar estado
 * 
 * history.back()
 * - Equivale a hacer clic en el botón "Atrás"
 * - Dispara popstate
 * 
 * history.forward()
 * - Equivale a hacer clic en el botón "Adelante"
 * - Dispara popstate
 * 
 * history.go(n)
 * - Navega n páginas hacia atrás (n negativo) o adelante (n positivo)
 * - history.go(-1) === history.back()
 * - history.go(1) === history.forward()
 */

console.log('=====================================');
console.log('🚀 History Router inicializado correctamente');
console.log('📝 Rutas registradas: /home, /products, /profile');
console.log('🔗 Navega usando los botones o llamando navigateTo()');
console.log('⚠️  IMPORTANTE: Requiere servidor local para funcionar correctamente');
